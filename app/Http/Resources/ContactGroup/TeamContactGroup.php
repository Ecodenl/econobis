<?php

namespace App\Http\Resources\ContactGroup;

use Illuminate\Http\Resources\Json\JsonResource;

class TeamContactGroup extends JsonResource
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
            'closed' => $this->closed,
        ];
    }
}
