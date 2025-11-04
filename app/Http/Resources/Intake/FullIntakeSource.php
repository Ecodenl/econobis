<?php

namespace App\Http\Resources\Intake;

use Illuminate\Http\Resources\Json\JsonResource;

class FullIntakeSource extends JsonResource
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
                'name' => $this->name_source,
            ];
    }
}
