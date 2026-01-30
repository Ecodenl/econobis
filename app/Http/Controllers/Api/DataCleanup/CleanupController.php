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
use Illuminate\Database\Eloquent\Builder;
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

        // 1) Is dit type bekend in code (registry)?
        if (! CleanupRegistry::has($cleanupType)) {
            // specials (contacts...) zitten bewust nog niet in registry
            abort(404, "Onbekend opschoon item: {$cleanupType}");
        }

        // 2) Is dit type geconfigureerd in DB?
        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->first();
        if (! $cleanupItem) {
            // configuratiefout: code kent het type maar cleanup_items record ontbreekt
            abort(500, "Opschoon type '{$cleanupType}' is niet geconfigureerd (cleanup_items ontbreekt).");
        }

//        $helper = new CleanupItemHelper($cleanupItem);

        $errorMessageArray = [];

        /** @var Builder $query */
//        $query = CleanupRegistry::queryFor($cleanupType, $helper);
        $batchId = $cleanupItem->current_batch_id;
        if (! $batchId) {
            abort(412, "Opschonen kan niet: er is nog geen selectie bepaald voor '{$cleanupType}'.");
        }

        $modelClass = CleanupRegistry::modelFor($cleanupType);
        $def = CleanupRegistry::get($cleanupType);

        // Alleen bepaald (determined) van de actieve batch
        CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->where('status', 'determined')
            ->chunkById(500, function ($selections) use ($modelClass, $def, &$errorMessageArray) {

                $ids = $selections->pluck('model_id')->all();

                // haal models in bulk op (eventueel withTrashed als relevant)
                $modelQuery = $modelClass::query();
                $models = $modelQuery->whereIn('id', $ids)->get()->keyBy('id');

                foreach ($selections as $sel) {
                    $model = $models->get($sel->model_id);

                    // model kan intussen al weg zijn -> markeer cleaned
//                    if (! $model) {
//                        $sel->update([
//                            'status' => 'cleaned',
//                            'cleaned_at' => now(),
//                            'error' => null,
//                        ]);
//                        continue;
//                    }
                    // model kan intussen al weg zijn -> markeer failed (wel cleaned_at vullen voor zekerheid om aan te geven
                    // dat hij al weg is, dit is verder geen showstopper nu nl.
                    if (! $model) {
                        $sel->update([
                            'status' => 'failed',
                            'cleaned_at' => now(),
                            'error' => 'Model niet gevonden (mogelijk al verwijderd).',
                        ]);
//                        $errorMessageArray[] = 'Model niet gevonden (mogelijk al verwijderd).';
                        continue;
                    }

                    try {
                        DB::transaction(function () use ($model, $def) {
                            $deleter = ($def['deleter'])($model);
                            $errors = $deleter->cleanup();

                            $errors = is_array($errors) ? $errors : (empty($errors) ? [] : [(string)$errors]);

                            if (!empty($errors)) {
                                throw new CleanupItemFailed(implode(' | ', $errors));
                            }
                        });

                        $sel->update([
                            'status' => 'cleaned',
                            'cleaned_at' => now(),
                            'error' => null,
                        ]);
                    } catch (CleanupItemFailed $e) {
                        $sel->update([
                            'status' => 'failed',
                            'error' => $e->getMessage(),
                        ]);
                        $errorMessageArray[] = $e->getMessage();
                        continue;
                    } catch (Throwable $e) {
                        Log::error($e->getMessage(), ['exception' => $e]);
                        $sel->update([
                            'status' => 'failed',
                            'error' => $e->getMessage(),
                        ]);
                        $errorMessageArray[] = 'Er is helaas een fout opgetreden.';
                        continue;
                    }
                }
            });

        $errorMessageArray = array_values(array_unique($errorMessageArray));
        if (! empty($errorMessageArray)) {
            abort(412, implode(';', $errorMessageArray));
        }

        // succes -> markeer cleaned up
        $cleanupItem->date_cleaned_up = Carbon::now();
        $cleanupItem->save();

        // update count + determined date opnieuw na cleanup
        return FullCleanupItem::make((new CleanupItemHelper($cleanupItem))->updateItem());
    }
//    private function runCleanupQuery(Builder $query, callable $makeDeleter, array &$errorMessageArray = []): void
//    {
//        $query->chunkById(200, function ($items) use ($makeDeleter, &$errorMessageArray) {
//            $this->runCleanup($items, $makeDeleter, $errorMessageArray);
//        });
//    }
//    private function runCleanup(iterable $items, callable $makeDeleter, array &$errorMessageArray = []): void
//    {
//        foreach ($items as $item) {
//            try {
//                DB::transaction(function () use ($item, $makeDeleter, &$errorMessageArray) {
//                    $deleter = $makeDeleter($item);
//                    $errorMessage = $deleter->cleanup();
//
//                    $errors = is_array($errorMessage)
//                        ? $errorMessage
//                        : (empty($errorMessage) ? [] : [(string) $errorMessage]);
//
//                    if (!empty($errors)) {
//                        $errorMessageArray = array_merge($errorMessageArray, $errors);
//
//                        // rollback voor dit item
//                        throw new CleanupItemFailed();
//                    }
//                });
//            } catch (\PDOException $e) {
//                Log::error($e->getMessage());
//                abort(501, 'Er is helaas een fout opgetreden.');
//            } catch (CleanupItemFailed $e) {
//                // expected: rollback gedaan, ga door met volgende item
//                continue;
//            } catch (Throwable $e) {
//                // onverwacht -> loggen + stoppen (mijn advies)
//                Log::error($e->getMessage(), ['exception' => $e]);
//                abort(501, 'Er is helaas een fout opgetreden.');
//            }
//        }
//    }
}
