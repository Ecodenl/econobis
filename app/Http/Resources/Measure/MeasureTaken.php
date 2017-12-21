<?php

namespace App\Http\Resources\Measure;

use Illuminate\Http\Resources\Json\Resource;

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
            'name' => $this->measure->name,
            'measureDate' => $this->measure_date,
            'energyLabelId' => $this->energy_label_id,
            'energyLabel' => optional($this->energy_label)->name,
        ];
    }
}
