<?php

namespace App\Http\Resources\Measure;

use Illuminate\Http\Resources\Json\Resource;

/**
 * Deze Resource verwerkt taken Measures van Addresses met pivot data.
 * Het model waarop deze resource is dus een Measure (en geen MeasureTakenAddress)
 *
 * Class MeasureRequested
 * @package App\Http\Resources\Measure
 */
class MeasureTaken extends Resource
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
            'name' => $this->name,
            'measureDate' => $this->whenPivotLoaded('measure_taken_address', function () {
                return $this->pivot->measure_date;
            }),
        ];
    }
}
