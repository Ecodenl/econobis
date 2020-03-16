<?php


namespace App\Http\Resources\Occupation;


use Illuminate\Http\Resources\Json\Resource;

class PrimaryOccupation extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->primary_occupation
        ];
    }
}