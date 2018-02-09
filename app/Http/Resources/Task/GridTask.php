<?php

namespace App\Http\Resources\Intake;

use Illuminate\Http\Resources\Json\Resource;

class GridTask extends Resource
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
                'contactFullName' => optional($this->contact)->full_name,
                'datePlanned' => $this->date_planned,
                'dateStarted' => $this->date_started,
                'statusCode' => $this->getStatus()->code,
                'statusName' => $this->getStatus()->name,
                'createdAt' => $this->created_at,
                'responsibleUserName' => $this->responsibleUser->present()->fullName(),
            ];
    }
}
