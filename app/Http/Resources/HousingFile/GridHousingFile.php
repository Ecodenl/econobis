<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\HousingFile;


use Illuminate\Http\Resources\Json\Resource;

class GridHousingFile extends Resource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'createdAt' => $this->created_at,
                'fullAddress' => $this->address->present()->streetAndNumber(),
                'contact' => $this->address->contact()->pluck('full_name'),
                'buildingType' => optional($this->buildingType)->name,
                'energyLabel' => optional($this->energyLabel)->name,
            ];
    }
}