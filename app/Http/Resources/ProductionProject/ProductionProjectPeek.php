<?php

namespace App\Http\Resources\ProductionProject;

use Illuminate\Http\Resources\Json\Resource;

class ProductionProjectPeek extends Resource
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
                'participationWorth' => $this->participation_worth,
                'typeId' => $this->production_project_type_id,
            ];
    }
}
