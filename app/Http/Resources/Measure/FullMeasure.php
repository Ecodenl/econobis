<?php

namespace App\Http\Resources\Measure;

use App\Eco\Address\Address;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullMeasure extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => $this->created_at,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'faqs' => $this->faqs()->get(),
            'suppliers' => FullOrganisation::collection($this->whenLoaded('deliveredByOrganisations')),
            'opportunities' => FullOpportunity::collection($this->whenLoaded('opportunities')),
            'measuresTaken' => FullAddress::collection($this->whenLoaded('addresses')),
            'measureTakenDate' => $this->whenPivotLoaded('measure_taken_address', function () {
                return $this->pivot->measure_date;}),
            'measuresRequested' => FullIntake::collection($this->whenLoaded('intakes')),
            'campaignCount' => $this->campaigns()->count(),
            'relatedCampaigns' => $this->campaigns()->get(),
        ];
    }
}
