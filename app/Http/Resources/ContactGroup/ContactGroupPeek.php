<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactGroupPeek extends JsonResource
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
            'name' => $this->name,
            'closed' => $this->closed,        ];
    }
}
