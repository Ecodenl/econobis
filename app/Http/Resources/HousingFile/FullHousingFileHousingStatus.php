<?php

namespace App\Http\Resources\HousingFile;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileHousingStatus extends JsonResource
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
                'housingFileHoomLink' => GenericResource::make($this->whenLoaded('housingFileHoomLink')),
                'status' => $this->status,
//                'numberOrM2' => $this->number_or_m2,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
