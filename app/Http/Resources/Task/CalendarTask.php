<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Resources\Json\JsonResource;

class CalendarTask extends JsonResource
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
                'noteSummary' => $this->present()->noteSummary(),
                'start' => $this->datePlannedWithStartTime(),
                'end' => $this->datePlannedWithEndTime(),
            ];
    }
}
