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
            'importMatchDescription' => $this->importMatchDescription,
            'status' => $this->status,
            'firstName' => $this->first_name,
            'lastNamePrefix' => $this->last_name_prefix,
            'lastName' => $this->last_name,
            'address' => $this->address,
            'street' => $this->street,
            'housenumber' => $this->housenumber,
            'addition' => $this->addition,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'emailContact' => $this->email_contact,
            'phoneNumber' => $this->phone_number,
            'ean' => $this->ean,
            'eanType' => $this->ean_type,
            'esNumber' => $this->es_number,
            'supplierCodeRef' => $this->supplier_code_ref,
            'memberSince' => $this->member_since,
            'endDate' => $this->end_date,
            'contactNumber' => $this->contact ? $this->contact->number : '',
            'contactForImports' => GridContactForImport::collection($this->whenLoaded('contactForImports')),
        ];
    }
}
