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
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'fullName' => Contact::find($this->address->contact_id)->full_name,
                'createdAt' => $this->created_at,
                'sourceNames' => FullRegistrationSource::collection($this->whenLoaded('sources')),
                'status' => $this->status->name,
                'measuresRequested' => Measure::getRequestedMeasures($this->address)
            ];
    }
}
