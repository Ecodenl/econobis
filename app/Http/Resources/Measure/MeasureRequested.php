<?php

namespace App\Http\Resources\Measure;

use Illuminate\Http\Resources\Json\Resource;

/**
 * Deze Resource verwerkt requested Measures van Addresses met pivot data.
 * Het model waarop deze resource is dus een Measure (en geen MeasureRequestedAddress)
 *
 * Class MeasureRequested
 * @package App\Http\Resources\Measure
 */
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
            'id' => $this->id,
            'name' => $this->name,
            'desiredDate' => $this->whenPivotLoaded('measure_requested_address', function () {
                return $this->pivot->desired_date;
            }),
            'degreeInterest' => $this->whenPivotLoaded('measure_requested_address', function () {
                return $this->pivot->degree_interest;
            }),
        ];
    }
}
