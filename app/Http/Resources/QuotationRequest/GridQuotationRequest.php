<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\QuotationRequest;


use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use Illuminate\Http\Resources\Json\Resource;

class GridQuotationRequest extends Resource
{
    public function toArray($request)
    {
           return [
               'id' => $this->id,
               'dateRecorded' => $this->date_recorded,
               'dateReleased' => $this->date_released,
               'quotationText' => $this->quotation_text,
               'organisation' => FullOrganisation::make($this->whenLoaded('organisation')),
               'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
               'status' => GenericResource::make($this->whenLoaded('status')),
               'createdAt' => $this->created_at,
            ];
    }
}