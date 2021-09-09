<?php

namespace App\Http\Resources\Portal\Administration;

use Illuminate\Http\Resources\Json\JsonResource;

class AdministrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'postalCode' => $this->postal_code,
            'city' => $this->city,
            'country' => $this->country ? $this->country->name : '',
            'kvkNumber' => $this->kvk_number,
            'website' => $this->website,
            'iban' => $this->IBAN,
            'ibanAttn' => $this->iban_attn,
            'btwNumber' => $this->btw_number,
        ];
    }
}
