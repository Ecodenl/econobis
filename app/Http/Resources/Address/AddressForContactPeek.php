<?php

namespace App\Http\Resources\Address;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressForContactPeek extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $streetPostalCodeCity = $this->street . ' ' . $this->number;
        $streetPostalCodeCity .= $this->addition ? '-' . $this->addition : '';
        $streetPostalCodeCity .= $this->postal_code ? ', ' . $this->postal_code : '';
        $streetPostalCodeCity .= $this->city ? ', ' . $this->city : '';
        $streetPostalCodeCity .= ' (';
        $streetPostalCodeCity .= $this->getType() ? $this->getType()->name : '';
        $streetPostalCodeCity .= $this->primary ? ($this->getType() ? ' - ' : '') . 'primair' : '';
        $streetPostalCodeCity .= ')';


        return [
            'id' => $this->id,
            'streetPostalCodeCity' => $streetPostalCodeCity,
        ];
    }
}
