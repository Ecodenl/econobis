<?php

namespace App\Http\Resources\Registration;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\GenericResource;
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
                'id' => $this->id,
                'address' => FullAddress::make($this->whenLoaded('address')),
                'status' => GenericResource::make($this->whenLoaded('status')),
                'campaign' => GenericResource::make($this->whenLoaded('campaign')),
                'sources' => GenericResource::collection($this->whenLoaded('sources')),
                'notes' => GenericResource::collection($this->whenLoaded('notes')),
                'reasons' => GenericResource::collection($this->whenLoaded('reasons')),
                'taskCount' => $this->tasks()->count(),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
