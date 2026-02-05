<?php

namespace App\Http\Controllers\Api\DataCleanup;

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationCleanupItem;
use App\Eco\DataCleanup\CleanupItemSelection;
use App\Eco\DataCleanup\CleanupRegistry;
use App\Exceptions\CleanupItemFailed;
use App\Helpers\DataCleanup\CleanupItemHelper;
use App\Helpers\Delete\Models\ForceDeleteContact;
use App\Http\Controllers\Controller;
use App\Http\Resources\DataCleanup\FullCleanupContact;
use App\Http\Resources\DataCleanup\FullCleanupItem;
use App\Services\DataCleanup\CleanupItemStateService;
use Illuminate\Http\JsonResponse;
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

        return $this->respondCleanupCollection(FullCleanupItem::collection($cleanupItems));
    }

    public function getCleanupContacts(){
        $cooperation = Cooperation::firstOrFail();

        $cleanupContactsExcludedGroups = $cooperation->cleanupContactsExcludedGroups;
        $contactsToDelete = $cooperation->cleanupItems()->where('code_ref', 'contacts')->first();
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
        $cooperation = Cooperation::firstOrFail();

        (new CleanupItemHelper())->updateItemsAll();

        $cleanupItems = $cooperation
            ->cleanupItems()
            ->whereIn('code_ref', CleanupRegistry::types())
            ->get();

        return response()->json([
            'data' => FullCleanupItem::collection($cleanupItems),
        ]);
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

        $updated = (new CleanupItemHelper($cleanupItem))->updateItem();

        return $this->respondCleanupItem($updated, 200);
    }

    public function cleanupItemsAll()
    {
        $cooperation = Cooperation::firstOrFail();

        // Alleen registry types
        $items = $cooperation->cleanupItems()
            ->whereIn('code_ref', CleanupRegistry::types())
            ->get();

        $results = [];
        $has412 = false;
        $has500 = false;

        foreach ($items as $item) {
            // Alleen zinvol als er iets open staat
            if (! $item->current_batch_id || (int) $item->determined_count <= 0) {
                $results[] = [
                    'codeRef' => $item->code_ref,
                    'statusCode' => 200,
                    'errors' => [],
                    'item' => FullCleanupItem::make($item->fresh()),
                ];
                continue;
            }

            $r = $this->runCleanupForItem($cooperation, $item, $item->code_ref);

            if ($r['statusCode'] === 412) $has412 = true;
            if ($r['statusCode'] >= 500) $has500 = true;

            $results[] = [
                'codeRef' => $item->code_ref,
                'statusCode' => $r['statusCode'],
                'errors' => array_values(array_unique($r['errors'])),
                'item' => FullCleanupItem::make($r['item']->fresh()),
            ];
        }

        $statusCode = $has500 ? 500 : ($has412 ? 412 : 200);

        return response()->json([
            'data' => [
                'results' => $results,
            ],
            'message' => $has500
                ? 'Een of meer opschoon-items zijn gestopt door een interne fout.'
                : ($has412 ? 'Een of meer opschoon-items bevatten fouten.' : null),
        ], $statusCode);
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

        $result = $this->runCleanupForItem($cooperation, $cleanupItem, $cleanupType);

        if ($result['statusCode'] >= 400) {
            return $this->respondCleanupItem($result['item'], $result['statusCode'], $result['errors'], $result['message'] ?? null);
        }

        return $this->respondCleanupItem($result['item'], 200, [], $result['message'] ?? null);
    }

    public function getForceDeleteContactsStats(): JsonResponse
    {
        $count = Contact::onlyTrashed()->count();

        return response()->json([
            'data' => [
                'softDeletedContactsCount' => $count,
            ],
        ]);
    }

    public function forceDeleteSoftDeletedContacts(): JsonResponse
    {
        $cooperation = Cooperation::firstOrFail();

        $results = [];
        $has412 = false;
        $has500 = false;

        // bepaal scope (jullie kunnen later filteren op cooperation_id als contact dat heeft)
        Contact::onlyTrashed()
            ->orderBy('id')
            ->chunkById(200, function ($contacts) use (&$results, &$has412, &$has500) {
                foreach ($contacts as $contact) {
                    try {
                        $errors = (new ForceDeleteContact($contact))->cleanup();
                        $errors = is_array($errors) ? array_values(array_unique($errors)) : [];

                        if (!empty($errors)) {
                            // “normale” errors zijn 412; echte exceptions worden in ForceDeleteContact al als support error toegevoegd
                            $statusCode = $this->containsSupportError($errors) ? 500 : 412;
                        } else {
                            $statusCode = 200;
                        }

                        if ($statusCode === 412) $has412 = true;
                        if ($statusCode >= 500) $has500 = true;

                        $results[] = [
                            'contactId' => $contact->id,
                            'fullName' => $contact->full_name ?? null,
                            'statusCode' => $statusCode,
                            'errors' => $errors,
                        ];
                    } catch (\Throwable $e) {
                        Log::error('Force delete contacts failed', [
                            'contact_id' => $contact->id,
                            'exception' => $e,
                        ]);

                        $has500 = true;

                        $results[] = [
                            'contactId' => $contact->id,
                            'fullName' => $contact->full_name ?? null,
                            'statusCode' => 500,
                            'errors' => ['Er is helaas een fout opgetreden.'],
                        ];
                    }
                }
            });

        $statusCode = $has500 ? 500 : ($has412 ? 412 : 200);

        return response()->json([
            'data' => [
                'results' => $results,
            ],
            'message' => $has500
                ? 'Een of meer contacten zijn niet hard verwijderd door een interne fout.'
                : ($has412 ? 'Een of meer contacten konden niet hard verwijderd worden.' : 'Hard verwijderen is uitgevoerd.'),
        ], $statusCode);
    }

    /**
     * Kleine helper: onderscheid 412 vs 500 op basis van support-message.
     * (optioneel, maar handig om statusCode zinnig te houden
     * Als je liever simpel houdt: laat deze containsSupportError weg en maak alles met errors gewoon 412.
     * Dan is HTTP 500 alleen voor echte exceptions.)
     */
    private function containsSupportError(array $errors): bool
    {
        foreach ($errors as $e) {
            if (is_string($e) && str_contains($e, '(meld dit bij Econobis support)')) {
                return true;
            }
        }
        return false;
    }

    /**
     * Voert cleanup uit voor 1 item (bestaande batch), zonder HTTP aborts voor cleanup-errors.
     *
     * @return array{item: CooperationCleanupItem, errors: string[], statusCode: int, message?: string}
     */
    private function runCleanupForItem(Cooperation $cooperation, CooperationCleanupItem $cleanupItem, string $cleanupType): array
    {
        $batchId = $cleanupItem->current_batch_id;

        if (! $batchId) {
            return [
                'item' => $cleanupItem,
                'errors' => ["Opschonen kan niet: er is nog geen selectie bepaald voor '{$cleanupType}'."],
                'statusCode' => 412,
            ];
        }

        $state = app(CleanupItemStateService::class);

        // Als er niets meer "determined" is in deze batch, dan doen we geen cleanup-run.
        // Belangrijk: we herhalen dan ook niet telkens oude failed-meldingen als 412.
        // Errors blijven inzichtelijk via failed_count + (frontend) ⚠️-icoon.
        $statsBefore = $state->batchStats($cleanupItem->id, $batchId, $cleanupItem->cooperation_id);

        if ($statsBefore['determined'] === 0) {
            $cleanupItem->refresh();
            $state->syncCountsAndStatusAfterCleanup($cleanupItem, false);

            if ($cleanupItem->status === CooperationCleanupItem::STATUS_DONE && ! $cleanupItem->date_cleaned_up) {
                $cleanupItem->date_cleaned_up = now();
            }

            $cleanupItem->save();

            return [
                'item' => $cleanupItem,
                'errors' => [],       // geen errors, want we herhalen oude failed niet
                'statusCode' => 200,
                'message' => 'Geen items om op te schonen voor onderdeel ' . $cleanupItem->name . '. Herbereken eerst om een nieuwe selectie te maken.',
            ];
        }


        $originalBatchId = $batchId;
        $beforeSelectionCount = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->count();

        $state->setBeforeCleanup($cleanupItem);
        $cleanupItem->save();

        $def = CleanupRegistry::get($cleanupType);
        $modelClass = CleanupRegistry::modelFor($cleanupType);

        $errorMessageArray = [];

        CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->where('status', 'determined')
            ->orderBy('id')
            ->chunkById(500, function ($selections) use ($modelClass, $def, &$errorMessageArray) {
                $now = now();

                $ids = $selections->pluck('model_id')->all();
                $models = $modelClass::whereIn('id', $ids)->get()->keyBy('id');

                $cleanedSelectionIds = [];
                $failed = []; // selection_id => error

                foreach ($selections as $sel) {
                    $model = $models->get($sel->model_id);

                    if (! $model) {
                        $failed[$sel->id] = 'Model niet gevonden (mogelijk al verwijderd).';
                        $errorMessageArray[] = 'Model niet gevonden (mogelijk al verwijderd).';
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

                if (! empty($cleanedSelectionIds)) {
                    CleanupItemSelection::whereIn('id', $cleanedSelectionIds)->update([
                        'status' => 'cleaned',
                        'cleaned_at' => $now,
                        'error' => null,
                        'updated_at' => $now,
                    ]);
                }

                if (! empty($failed)) {
                    $this->bulkUpdateSelectionErrors($failed, $now);
                }
            });

        // Voeg ook reeds bestaande failed errors toe (van eerdere run)
        $failedErrors = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->where('status', 'failed')
            ->pluck('error')
            ->filter()
            ->values()
            ->all();

        $errorMessageArray = array_values(array_unique(array_merge($errorMessageArray, $failedErrors)));

        // Sync counts/status + date_cleaned_up bij succes
        $cleanupItem->refresh();
        $state->syncCountsAndStatusAfterCleanup($cleanupItem, false);

        if (empty($errorMessageArray) && $cleanupItem->status === CooperationCleanupItem::STATUS_DONE) {
            $cleanupItem->date_cleaned_up = now();
        }

        $cleanupItem->save();

        // Guards (PR4)
        $cleanupItem->refresh();
        if ($cleanupItem->current_batch_id !== $originalBatchId) {
            Log::error('current_batch_id changed during cleanup (bulk)', [
                'cleanup_item_id' => $cleanupItem->id,
                'original' => $originalBatchId,
                'current' => $cleanupItem->current_batch_id,
            ]);

            $state->syncCountsAndStatusAfterCleanup($cleanupItem, true);
            $cleanupItem->save();

            return [
                'item' => $cleanupItem,
                'errors' => ['Interne fout: batch_id gewijzigd tijdens opschonen.'],
                'statusCode' => 500,
            ];
        }

        $afterSelectionCount = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->count();

        if ($afterSelectionCount !== $beforeSelectionCount) {
            Log::error('Selection count changed during cleanup (bulk)', [
                'cleanup_item_id' => $cleanupItem->id,
                'batch_id' => $batchId,
                'before' => $beforeSelectionCount,
                'after' => $afterSelectionCount,
            ]);

            $state->syncCountsAndStatusAfterCleanup($cleanupItem, true);
            $cleanupItem->save();

            return [
                'item' => $cleanupItem,
                'errors' => ['Interne fout: selectie gewijzigd tijdens opschonen.'],
                'statusCode' => 500,
            ];
        }

        // Result status
        $statusCode = empty($errorMessageArray) ? 200 : 412;

        return [
            'item' => $cleanupItem,
            'errors' => $errorMessageArray,
            'statusCode' => $statusCode,
        ];
    }

    public function hardDeleteContacts(): JsonResponse
    {
        $cooperation = Cooperation::firstOrFail();

        $helper = new CleanupItemHelper(); // die heeft cooperation + cleanupDate
        $query = $helper->getSoftDeletedContactsToHardDelete(); // die maak je nieuw

        $deleted = 0;
        $failed = 0;
        $errors = [];

        $query->orderBy('id')->chunkById(500, function ($contacts) use (&$deleted, &$failed, &$errors) {
            foreach ($contacts as $contact) {
                try {
                    DB::transaction(function () use ($contact) {
                        // Als jullie DeleteContact cleanup/hard-delete method hebben: gebruik die
                        // Anders:
//                        $contact->forceDelete();
                    });
                    $deleted++;
                } catch (\Throwable $e) {
                    $failed++;
                    $errors[] = 'Contact id ' . $contact->id . ': ' . $e->getMessage();
                    Log::error('Hard delete contact failed', ['contact_id' => $contact->id, 'exception' => $e]);
                }
            }
        });

        return response()->json([
            'data' => [
                'deleted' => $deleted,
                'failed' => $failed,
                'errors' => array_values(array_unique($errors)),
            ],
            'message' => $failed > 0
                ? "Hard delete uitgevoerd, maar {$failed} contact(en) faalden."
                : "Hard delete uitgevoerd ({$deleted} contacten).",
        ], $failed > 0 ? 412 : 200);
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

    private function respondCleanupCollection($resource, int $statusCode = 200)
    {
        return response()->json(['data' => $resource], $statusCode);
    }
    private function respondCleanupItem(
        CooperationCleanupItem $item,
        int $statusCode = 200,
        array $errors = [],
        ?string $message = null
    ): JsonResponse {
        $resource = FullCleanupItem::make($item->fresh());

        $errors = array_values(array_filter(array_unique(array_map('strval', $errors))));
        $message = $message ?? implode(';', $errors);

        // ✅ Succes: stuur data, en stuur message alleen als die er is.
        if ($statusCode < 400 && empty($errors)) {
            $payload = ['data' => $resource];

            if (!empty($message)) {
                $payload['message'] = $message;
            }

            return response()->json($payload, $statusCode);
        }

        // Error: altijd message + errors + data
        return response()->json([
            'message' => $message,
            'errors' => $errors,
            'data' => $resource,
        ], $statusCode);
    }

}
