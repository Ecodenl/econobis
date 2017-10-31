<?php

namespace App\Http\Resources\Account;

use App\Http\Resources\AccountType\FullAccountType;
use Illuminate\Http\Resources\Json\Resource;

class FullAccount extends Resource
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
            'contactId' => $this->contact_id,
            'name' => $this->name,
            'type' => FullAccountType::make($this->whenLoaded('type')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
