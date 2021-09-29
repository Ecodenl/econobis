<?php

namespace App\Http\Resources\EmailAddress;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullEmailAddress extends JsonResource
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
            'typeId' => $this->type_id,
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'email' => $this->email,
            'primary' => $this->primary,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
