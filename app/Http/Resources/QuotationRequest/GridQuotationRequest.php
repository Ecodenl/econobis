<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\QuotationRequest;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\OpportunityByQuotationRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class GridQuotationRequest extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'datePlanned' => $this->date_planned,
            'dateRecorded' => $this->date_recorded,
            'dateReleased' => $this->date_released,
            'quotationText' => $this->quotation_text,
            'organisationOrCoach' => FullContact::make($this->whenLoaded('organisationOrCoach')),
            'opportunity' => OpportunityByQuotationRequest::make($this->whenLoaded('opportunity')),
            'status' => GenericResource::make($this->whenLoaded('status')),
            'opportunityAction' => GenericResource::make($this->whenLoaded('opportunityAction')),
            'createdAt' => $this->created_at,
        ];
    }
}