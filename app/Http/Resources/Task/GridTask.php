<?php

namespace App\Http\Resources\Task;

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
        $responsible = '';
        $this->responsibleUser && $responsible = $this->responsibleUser->present()->fullName();
        $this->responsibleTeam && $responsible = $this->responsibleTeam->name;
        return
            [
                'id' => $this->id,
                'contactFullName' => optional($this->contact)->full_name,
                'datePlannedStart' => $this->date_planned_start,
                'typeName' => optional($this->type)->name,
                'noteSummary' => $this->present()->noteSummary(),
                'createdAt' => $this->created_at,
                'responsibleName' => $responsible,
            ];
    }
}
