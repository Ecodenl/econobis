<?php


namespace App\Http\Resources\Occupation;


use Illuminate\Http\Resources\Json\Resource;

class PartialOccupation extends Resource
{
    public function toArray($request)
    {
        return [
            [
                'id' => 'primary' . $this->id,
                'name' => $this->primary_occupation
            ],
            [
                'id' => 'secondary' . $this->id,
                'name' => $this->secondary_occupation
            ]
        ];
    }
}