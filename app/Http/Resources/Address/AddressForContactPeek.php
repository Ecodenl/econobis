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
        return [
            'id' => $this->id,
            'streetPostalCodeCity' => $this->streetPostalCodeCity . ' (' . $this->typeAndPrimary . ')',
        ];
    }
}
