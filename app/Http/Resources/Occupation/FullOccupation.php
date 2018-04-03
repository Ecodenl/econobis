<?php

namespace App\Http\Resources\Occupation;

use Illuminate\Http\Resources\Json\Resource;

class FullOccupation extends Resource
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
            'primaryOccupation' => $this->primary_occupation,
            'secondaryOccupation' => $this->secondary_occupation,
        ];
    }
}
