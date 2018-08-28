<?php

namespace App\Http\Resources\Address;

use App\Eco\Measure\Measure;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Measure\FullMeasure;
use Illuminate\Http\Resources\Json\Resource;

class FullAddress extends Resource
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
            'contactId' => $this->contact_id,
            'typeId' => $this->type_id,
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'countryId' => $this->country_id,
            'country' => GenericResource::make($this->whenLoaded('country')),
            'street' => $this->street,
            'number' => $this->number,
            'addition' => $this->addition,
            'city' => $this->city,
            'postalCode' => $this->postal_code,
            'primary' => $this->primary,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'measuresTaken' => FullMeasure::collection($this->whenLoaded('measuresTaken')),
            'housingFile' => FullHousingFile::make($this->whenLoaded('housingFile')),
            'buildingType' => GenericResource::make($this->whenLoaded('building_type')),
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'contact' => FullContact::make($this->whenLoaded('contact')),
        ];
    }
}
