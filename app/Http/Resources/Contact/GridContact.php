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
        $organisation = $this->organisation;

        return [
            'id' => $this->id,
            'number' => $this->number,
            'iban' => $this->iban,
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
            'vatNumber' => optional($organisation)->vat_number,
            'chamberOfCommerceNumber' => optional($organisation)->chamber_of_commerce_number,
        ];
    }
}
