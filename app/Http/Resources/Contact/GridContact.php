<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class GridContact extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $address = $this->primaryAddress;
        $emailAddress = $this->primaryEmailAddress;
        $phoneNumber = $this->primaryPhoneNumber;

        return [
            'id' => $this->id,
            'number' => $this->number,
            'typeId' => $this->type_id,
            'typeName' => $this->present()->type,
            'fullName' => $this->full_name,
            'streetAndNumber' => optional(optional($address)->present())->streetAndNumber,
            'postalCode' => optional($address)->postal_code,
            'city' => optional($address)->city,
            'areaName' => optional($address)->shared_area_name,
            'emailAddress' => optional($emailAddress)->email,
            'phoneNumber' => optional($phoneNumber)->number,
            'statusName' => $this->present()->status,
            'createdAt' => $this->created_at,
        ];
    }
}
