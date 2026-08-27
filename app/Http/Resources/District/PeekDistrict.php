<?php

namespace App\Http\Resources\District;

use Illuminate\Http\Resources\Json\JsonResource;

class PeekDistrict extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
