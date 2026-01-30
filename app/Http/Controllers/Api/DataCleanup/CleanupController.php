<?php

namespace App\Http\Controllers\Api\DataCleanup;

use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupItemSelection;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Exceptions\CleanupItemFailed;
use App\Helpers\CleanupItem\CleanupItemHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\DataCleanup\FullCleanupContact;
use App\Http\Resources\DataCleanup\FullCleanupItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class CleanupController extends Controller
{
    public function getCleanupItems()
    {
        $cooperation = Cooperation::firstOrFail();

        $cleanupItems = $cooperation
            ->cleanupItems()
            ->whereIn('code_ref', CleanupRegistry::types())
            ->get();

        return FullCleanupItem::collection($cleanupItems);
    }
    public function getCleanupContacts(){
        $cooperation = Cooperation::firstOrFail();

        $cleanupContactsExcludedGroups = $cooperation->cleanupContactsExcludedGroups;
        $contactsToDelete = $cooperation->cleanupItems()->where('code_ref', 'contactsToDelete')->first();
        $contactsSoftDeleted = $cooperation->cleanupItems()->where('code_ref', 'contactsSoftDeleted')->first();
        $cleanupContact = [
            'contactsToDelete' => $contactsToDelete,
            'contactsSoftDeleted' => $contactsSoftDeleted,
            'cleanupContactsExcludedGroups' => $cleanupContactsExcludedGroups,
        ];

        return FullCleanupContact::make($cleanupContact);
    }

    public function updateItemsAll()
    {
        (new CleanupItemHelper())->updateItemsAll();
        return response()->noContent();
    }

    public function updateItem(string $cleanupType)
    {
        $cooperation = Cooperation::firstOrFail();

        if (! CleanupRegistry::has($cleanupType)) {
            abort(404, "Onbekend opschoon type: {$cleanupType}");
        }

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->first();
        if (! $cleanupItem) {
            abort(500, "Opschoon type '{$cleanupType}' is niet geconfigureerd (cleanup_items ontbreekt).");
        }

        return FullCleanupItem::make((new CleanupItemHelper($cleanupItem))->updateItem());
    }

    public function cleanupItem(string $cleanupType)
    {
        $cooperation = Cooperation::firstOrFail();

        if (! CleanupRegistry::has($cleanupType)) {
            abort(404, "Onbekend opschoon item: {$cleanupType}");
        }

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->first();
        if (! $cleanupItem) {
            abort(500, "Opschoon type '{$cleanupType}' is niet geconfigureerd (cleanup_items ontbreekt).");
        }

        $batchId = $cleanupItem->current_batch_id;
        if (! $batchId) {
            abort(412, "Opschonen kan niet: er is nog geen selectie bepaald voor '{$cleanupType}'.");
        }

        $def = CleanupRegistry::get($cleanupType);
        $modelClass = CleanupRegistry::modelFor($cleanupType);

        $helper = new CleanupItemHelper($cleanupItem);

        $errorMessageArray = [];

        CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->where('status', 'determined')
            ->orderBy('id')
            ->chunkById(500, function ($selections) use ($modelClass, $def, &$errorMessageArray) {

                $now = now();

                // 1) models in bulk ophalen
                $ids = $selections->pluck('model_id')->all();
                $models = $modelClass::whereIn('id', $ids)->get()->keyBy('id');

                // 2) resultaten verzamelen (bulk updates)
                $cleanedSelectionIds = [];
                $failed = []; // selection_id => error

                foreach ($selections as $sel) {
                    $model = $models->get($sel->model_id);

                    if (! $model) {
                        $failed[$sel->id] = 'Model niet gevonden (mogelijk al verwijderd).';
                        continue;
                    }

                    try {
                        DB::transaction(function () use ($model, $def) {
                            $deleter = ($def['deleter'])($model);
                            $errors = $deleter->cleanup();

                            $errors = is_array($errors) ? $errors : (empty($errors) ? [] : [(string) $errors]);

                            if (! empty($errors)) {
                                throw new CleanupItemFailed(implode(' | ', $errors));
                            }
                        });

                        $cleanedSelectionIds[] = $sel->id;
                    } catch (CleanupItemFailed $e) {
                        $failed[$sel->id] = $e->getMessage();
                        $errorMessageArray[] = $e->getMessage();
                        continue;
                    } catch (\Throwable $e) {
                        Log::error($e->getMessage(), ['exception' => $e]);
                        $failed[$sel->id] = $e->getMessage();
                        $errorMessageArray[] = 'Er is helaas een fout opgetreden.';
                        continue;
                    }
                }

                // 3) bulk update: cleaned
                if (! empty($cleanedSelectionIds)) {
                    CleanupItemSelection::whereIn('id', $cleanedSelectionIds)->update([
                        'status' => 'cleaned',
                        'cleaned_at' => $now,
                        'error' => null,
                        'updated_at' => $now,
                    ]);
                }

                // 4) bulk update: failed
                // We willen ook error opslaan. Dat kan niet in 1 simpele update (verschillende errors),
                // dus doen we 1 CASE WHEN update (MySQL) of fallback per stuk.
                if (! empty($failed)) {
                    $this->bulkUpdateSelectionErrors($failed, $now);
                }
            });

//        $errorMessageArray = array_values(array_unique($errorMessageArray));
//        if (! empty($errorMessageArray)) {
//            abort(412, implode(';', $errorMessageArray));
//        }
        $failedErrors = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->where('status', 'failed')
            ->pluck('error')
            ->filter()
            ->values()
            ->all();

        $errorMessageArray = array_values(array_unique(array_merge($errorMessageArray, $failedErrors)));

        $stats = $this->batchStats($cleanupItem->id, $batchId);

        // altijd bijwerken, ook als je daarna 412 returned
        $cleanupItem->number_of_items_to_delete = $stats['determined'];
        $cleanupItem->save();

        if (!empty($errorMessageArray)) {
            abort(412, implode(';', $errorMessageArray));
        }

        // alleen bij succes:
        $cleanupItem->date_cleaned_up = now();
        $cleanupItem->save();

        return FullCleanupItem::make($cleanupItem->fresh());
    }

    /**
     * Bulk update failed selections incl. error message.
     * - MySQL: CASE WHEN is prima.
     * - Als je DB anders is, kunnen we fallbacken naar per-id update.
     */
    private function bulkUpdateSelectionErrors(array $failedBySelectionId, $now): void
    {
        $ids = array_keys($failedBySelectionId);
        if (empty($ids)) {
            return;
        }

        $caseSql = "CASE id ";
        $bindings = [];

        foreach ($failedBySelectionId as $id => $msg) {
            $caseSql .= "WHEN ? THEN ? ";
            $bindings[] = (int) $id;
            $bindings[] = (string) $msg;
        }
        $caseSql .= "END";

        $inPlaceholders = implode(',', array_fill(0, count($ids), '?'));

        // placeholders volgorde: (case: 2N) + (updated_at:1) + (IN: N)
        $sql = "
        UPDATE cleanup_item_selections
        SET
            status = 'failed',
            error = {$caseSql},
            updated_at = ?
        WHERE id IN ({$inPlaceholders})
    ";

        $bindings[] = $now; // updated_at
        foreach ($ids as $id) {
            $bindings[] = (int) $id; // IN (...)
        }

        DB::update($sql, $bindings);
    }

    private function batchStats(int $cleanupItemId, string $batchId): array
    {
        $rows = CleanupItemSelection::query()
            ->selectRaw('status, COUNT(*) as cnt')
            ->where('cleanup_item_id', $cleanupItemId)
            ->where('batch_id', $batchId)
            ->groupBy('status')
            ->pluck('cnt', 'status')
            ->all();

        return [
            'determined' => (int)($rows['determined'] ?? 0),
            'cleaned'    => (int)($rows['cleaned'] ?? 0),
            'failed'     => (int)($rows['failed'] ?? 0),
        ];
    }

}
