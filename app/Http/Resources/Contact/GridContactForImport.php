<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class GridContactForImport extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'matchCode' => $this->matchCode,
            'matchDescription' => $this->matchDescription,
            'matchColor' => $this->matchColor,
            'number' => $this->number,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'street' => $this->primaryAddress?->street ?? '',
            'housenumber' => $this->primaryAddress?->housenumber ?? '',
            'addition' => $this->primaryAddress?->addition ?? '',
            'postalCode' => $this->primaryAddress?->postal_code ?? '',
            'city' => $this->primaryAddress?->city ?? '',
            'emailContact' => $this->primaryEmailAddress?->email ?? '',
            'phoneNumber' => $this->phone_number,
            'ean' => $this->ean,
            'esNumber' => $this->es_number,
            'memberSince' => $this->member_since,
            'endDate' => $this->end_date,
            'personId' => $this->person?->id ?? '' ,
        ];
    }
}
