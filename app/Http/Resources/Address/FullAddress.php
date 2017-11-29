<?php

namespace App\Http\Resources\Address;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
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
            'street' => $this->street,
            'number' => $this->number,
            'city' => $this->city,
            'postalCode' => $this->postal_code,
            'primary' => $this->primary,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'buidingTypeId' => $this->building_type_id,
            'buidingType' => GenericResource::make($this->whenLoaded('building_type')),
            'measuresTaken' => GenericResource::collection($this->whenLoaded('measures_taken')),
            'measuresRequested' => GenericResource::collection($this->whenLoaded('measures_requested')),
        ];
    }
}
