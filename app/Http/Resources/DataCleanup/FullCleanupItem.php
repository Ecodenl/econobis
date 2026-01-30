<?php

namespace App\Http\Resources\DataCleanup;

use App\Eco\DataCleanup\CleanupItemSelection;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FullCleanupItem extends JsonResource
{
    public function toArray($request)
    {
        $batchId = $this->current_batch_id;

        $stats = [
            'determined' => 0,
            'cleaned' => 0,
            'failed' => 0,
        ];

        if ($batchId) {
            $rows = CleanupItemSelection::query()
                ->selectRaw('status, COUNT(*) as cnt')
                ->where('cleanup_item_id', $this->id)
                ->where('batch_id', $batchId)
                ->groupBy('status')
                ->pluck('cnt', 'status')
                ->all();

            $stats['determined'] = (int)($rows['determined'] ?? 0);
            $stats['cleaned'] = (int)($rows['cleaned'] ?? 0);
            $stats['failed'] = (int)($rows['failed'] ?? 0);
        }

        return [
            'id' => $this->id,
            'cooperationId' => $this->cooperation_id,
            'name' => $this->name,
            'codeRef' => $this->code_ref,
            'yearsForDelete' => $this->years_for_delete,
            'dateRef' => $this->date_ref,

            // openstaand (determined)
            'numberOfItemsToDelete' => $this->number_of_items_to_delete,

            // extra UI velden (current batch)
            'numberOfItemsDetermined' => $stats['determined'],
            'numberOfItemsCleaned' => $stats['cleaned'],
            'numberOfItemsFailed' => $stats['failed'],

            'dateCleanedUp' => $this->date_cleaned_up ? Carbon::parse($this->date_cleaned_up)->format('d-m-Y H:i:s') : null,
            'dateDetermined' => $this->date_determined ? Carbon::parse($this->date_determined)->format('d-m-Y H:i:s') : null,
            'createdAt' => $this->created_at ? Carbon::parse($this->created_at)->format('d-m-Y H:i:s') : null,
            'updatedAt' => $this->updated_at ? Carbon::parse($this->updated_at)->format('d-m-Y H:i:s') : null,
        ];
    }
}
