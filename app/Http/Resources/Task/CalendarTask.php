<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Resources\Json\Resource;

class CalendarTask extends Resource
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
                'name' => $this->name,
                'start' => $this->datePlannedWithStartTime(),
                'end' => $this->datePlannedWithEndTime(),
            ];
    }
}
