<?php

namespace App\Http\Resources\Intake;

use Illuminate\Http\Resources\Json\Resource;

class FullIntakeSource extends Resource
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
            $this->name,
        ];
    }
}
