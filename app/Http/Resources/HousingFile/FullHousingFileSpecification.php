<?php

namespace App\Http\Resources\HousingFile;

use App\Eco\Measure\Measure;
use App\Http\Resources\Campaign\GridCampaign;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Measure\FullMeasure;
use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileSpecification extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        $defaultEconobisMeasure = Measure::where('external_hoom_id', 'overig-uit-hoomdossier')->first();

        return
            [
                'id' => $this->id,
                'measure' => FullMeasure::make($this->whenLoaded('measure')),
                'measureId' => $this->measure_id,
                'measureDate' => $this->measure_date,
                'isDefaultEconobisMeasure' => ($defaultEconobisMeasure->id == $this->measure_id),
                'answer' => $this->answer,
                'status' => GenericResource::make($this->whenLoaded('status')),
                'floor' => GenericResource::make($this->whenLoaded('floor')),
                'side' => GenericResource::make($this->whenLoaded('side')),
                'typeBrand' => $this->type_brand,
                'externalHoomName' => $this->external_hoom_name,
                'typeOfExecution' => $this->type_of_execution,
                'savingsGas' => $this->savings_gas,
                'savingsElectricity' => $this->savings_electricity,
                'co2Savings' => $this->co2_savings,
                'hasOpportunities' => $this->has_opportunities,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'campaign' => GridCampaign::make($this->campaign),
            ];
    }
}
