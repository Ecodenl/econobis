<?php

namespace App\Http\Resources\Measure;

use Illuminate\Http\Resources\Json\Resource;

class MeasureRequested extends Resource
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
            'id' => $this->measure->id,
            'name' => $this->measure->name,
            'desiredDate' => $this->desired_date,
            'degreeInterest' => $this->degree_interest,
        ];
    }
}
