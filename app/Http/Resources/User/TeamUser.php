<?php

namespace App\Http\Resources\User;


use Illuminate\Http\Resources\Json\JsonResource;

class TeamUser extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullName' => $this->present()->fullName(),
            'active' => $this->active,
        ];
    }

}