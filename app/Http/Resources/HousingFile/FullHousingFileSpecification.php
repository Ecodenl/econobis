<?php

namespace App\Http\Resources\HousingFile;

use App\Http\Resources\GenericResource;
use App\Http\Resources\Measure\FullMeasure;
use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileSpecification extends JsonResource
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
//                'housingFile' => FullHousingFile::make($this->whenLoaded('housingFile')),
                'measure' => FullMeasure::make($this->whenLoaded('measure')),
                'measureId' => $this->measure_id,
                'measureDate' => $this->measure_date,
                'answer' => $this->answer,
                'status' => GenericResource::make($this->whenLoaded('status')),
                'floor' => GenericResource::make($this->whenLoaded('floor')),
                'side' => GenericResource::make($this->whenLoaded('side')),
                'typeBrand' => $this->type_brand,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
