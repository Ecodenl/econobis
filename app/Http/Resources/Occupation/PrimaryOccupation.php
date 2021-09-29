<?php


namespace App\Http\Resources\Occupation;


use Illuminate\Http\Resources\Json\JsonResource;

class PrimaryOccupation extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->primary_occupation
        ];
    }
}