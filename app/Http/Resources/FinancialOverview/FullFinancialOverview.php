<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FinancialOverview;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class FullFinancialOverview extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'administrationId' => $this->administration_id,
            'administration' => GenericResource::make($this->whenLoaded('administration')),
            'year' => $this->year,
            'definitive' => $this->definitive,
            'statusId' => $this->status_id,
            'date' => $this->date_processed,
        ];
    }
}