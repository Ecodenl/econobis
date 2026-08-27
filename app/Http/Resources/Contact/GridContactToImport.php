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
            'initials' => $this->initials,
            'title' => $this->title,
            'firstName' => $this->first_name,
            'lastNamePrefix' => $this->last_name_prefix,
            'lastName' => $this->last_name,
            'dateOfBirth' => $this->date_of_birth,
            'street' => $this->street,
            'housenumber' => $this->housenumber,
            'addition' => $this->addition,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'emailContact' => $this->email_contact,
            'emailContactFinancial' => $this->email_contact_financial,
            'phoneNumber' => $this->phone_number,
            'iban' => $this->iban,
            'chamberOfCommerceNumber' => $this->chamber_of_commerce_number,
            'ean' => $this->ean,
            'eanGas' => $this->ean_gas,
            'eanType' => $this->ean_type,
            'esNumber' => $this->es_number,
            'supplierCodeRef' => $this->supplier_code_ref,
            'memberSince' => $this->member_since,
            'endDate' => $this->end_date,
            'memberSinceGas' => $this->member_since_gas,
            'endDateGas' => $this->end_date_gas,
            'contactNumber' => $this->contact ? $this->contact->number : '',
            'contactForImports' => GridContactForImport::collection($this->whenLoaded('contactForImports')),
        ];
    }
}
