<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\AccountType\FullAccountType;
use App\Http\Resources\Industry\FullIndustry;
use Illuminate\Http\Resources\Json\Resource;

class FullAccount extends Resource
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
            'name' => $this->name,
            'typeId' => $this->type_id,
            'type' => FullAccountType::make($this->whenLoaded('type')),
            'industryId' => $this->industry_id,
            'industry' => FullIndustry::make($this->whenLoaded('industry')),
            'website' => $this->website,
            'chamberOfCommerceNumber' => $this->chamber_of_commerce_number,
            'vatNumber' => $this->vat_number,
            'squareMeters' => $this->square_meters,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}