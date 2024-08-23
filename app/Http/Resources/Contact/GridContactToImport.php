<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\JsonResource;

class GridContactToImport extends JsonResource
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
            'importMatchCode' => $this->importMatchCode,
            'status' => $this->status,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'street' => $this->street,
            'housenumber' => $this->housenumber,
            'addition' => $this->addition,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'emailContact' => $this->email_contact,
            'phoneNumber' => $this->phone_number,
            'ean' => $this->ean,
            'esNumber' => $this->es_number,
            'memberSince' => $this->member_since,
            'endDate' => $this->end_date,
            'contactForImports' => $this->contactForImports,
        ];
    }
}
