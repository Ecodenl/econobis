<?php

namespace App\Http\Resources\Occupation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullOccupation extends JsonResource
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
            'name' => $this->primary_occupation === $this->secondary_occupation ? $this->primary_occupation : $this->primary_occupation . ' of ' . $this->secondary_occupation ,
            'primaryOccupation' => $this->primary_occupation,
            'secondaryOccupation' => $this->secondary_occupation,
        ];
    }
}
