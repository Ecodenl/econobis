<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\HousingFile;


use App\Eco\Measure\Measure;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridHousingFileSpecification extends JsonResource
{
    public function toArray($request)
    {
        $defaultEconobisMeasure = Measure::where('external_hoom_id', 'overig-uit-hoomdossier')->first();

        return [
               'id' => $this->id,
               'fullAddress' => $this->housingFile && $this->housingFile->address ? $this->housingFile->address->present()->streetAndNumber() : '',
               'postalCode' => $this->housingFile && $this->housingFile->address ? $this->housingFile->address->postal_code : '',
               'city' => $this->housingFile && $this->housingFile->address ? $this->housingFile->address->city : '',
               'fullName' => $this->housingFile && $this->housingFile->address ? $this->housingFile->address->contact()->value('full_name') : '',
//               'measure' => FullMeasure::make($this->whenLoaded('measure')),
//               'measureId' => $this->measure_id,
               'measureCategoryName' => $this->measure && $this->measure->measureCategory? $this->measure->measureCategory->name  : '',
               'measureName' => $this->measure ? $this->measure->name : '',
               'status' => GenericResource::make($this->whenLoaded('status')),
               'measureDate' => $this->measure_date,
                'createdAt' => $this->created_at,
               'answer' => $this->answer,
               'floor' => GenericResource::make($this->whenLoaded('floor')),
               'side' => GenericResource::make($this->whenLoaded('side')),
               'typeBrand' => $this->type_brand,
               'isDefaultEconobisMeasure' => ($defaultEconobisMeasure->id == $this->measure_id),
               'externalHoomName' => $this->external_hoom_name,
               'typeOfExecution' => $this->type_of_execution,
               'savingsGas' => $this->savings_gas,
               'savingsElectricity' => $this->savings_electricity,
               'co2Savings' => $this->co2_savings,
//               'createdAt' => $this->created_at,
//               'updatedAt' => $this->updated_at,
            ];
    }
}
