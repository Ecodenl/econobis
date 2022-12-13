<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\HousingFile;


use Illuminate\Http\Resources\Json\JsonResource;

class GridHousingFile extends JsonResource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'createdAt' => $this->created_at,
                'fullAddress' => $this->address->present()->streetAndNumber(),
                'postalCode' => $this->address->present()->postalCode(),
                'city' => $this->address->present()->city(),
                'fullName' => $this->address->contact()->value('full_name'),
                'buildingType' => optional($this->buildingType)->name,
                'energyLabel' => optional($this->energyLabel)->name,
            ];
    }
}