<?php

namespace App\Http\Resources\HousingFile;

use Illuminate\Http\Resources\Json\JsonResource;

class FullHousingFileHoomHousingStatus extends JsonResource
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
                'hoomStatusValue' => $this->hoom_status_value,
                'hoomStatusName' =>$this->hoom_status_name,
            ];
    }
}
