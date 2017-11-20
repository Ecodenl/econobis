<?php

namespace App\Http\Resources\Registration;

use Illuminate\Http\Resources\Json\Resource;
use App\Eco\Contact\Contact;
use App\Eco\Address\Address;
use App\Eco\Measure\Measure;

class FullRegistration extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return
            [
            'fullName' => Contact::find(Address::find($this->address_id)->contact_id)->full_name,
            'sourceNames' => FullRegistrationSource::collection($this->whenLoaded('sources')),
            'createdAt' => $this->created_at,
            'status' => $this->status_id,
            'measureNames' => Measure::getAllMeasures($this->address)
        ];
    }
}
