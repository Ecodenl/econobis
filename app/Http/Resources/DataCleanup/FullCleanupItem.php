<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\DataCleanup;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FullCleanupItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'cooperationId' => $this->cooperation_id,
            'name' => $this->name,
            'codeRef' => $this->code_ref,
            'yearsForDelete' => $this->years_for_delete,
            'dateRef' => $this->date_ref,
            'numberOfItemsToDelete' => $this->number_of_items_to_delete,
            'dateCleanedUp'   => $this->date_cleaned_up ? Carbon::parse($this->date_cleaned_up)->format('d-m-Y H:i:s') : null,
            'dateDetermined'  => $this->date_determined ? Carbon::parse($this->date_determined)->format('d-m-Y H:i:s') : null,
            'createdAt'       => $this->created_at ? Carbon::parse($this->created_at)->format('d-m-Y H:i:s') : null,
            'updatedAt'       => $this->updated_at ? Carbon::parse($this->updated_at)->format('d-m-Y H:i:s') : null,

        ];
    }
}