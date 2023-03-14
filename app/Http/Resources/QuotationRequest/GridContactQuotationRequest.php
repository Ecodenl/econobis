<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\QuotationRequest;


use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\OpportunityByContactQuotationRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class GridContactQuotationRequest extends JsonResource
{
    public function toArray($request)
    {
           return [
               'id' => $this->id,
               'dateRecorded' => $this->date_recorded,
               'dateReleased' => $this->date_released,
               'opportunity' => OpportunityByContactQuotationRequest::make($this->whenLoaded('opportunity')),
               'status' => GenericResource::make($this->whenLoaded('status')),
            ];
    }
}