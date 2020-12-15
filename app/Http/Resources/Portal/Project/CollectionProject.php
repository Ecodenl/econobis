<?php

namespace App\Http\Resources\Portal\Project;

use App\Http\Resources\Portal\Administration\CollectionAdministration;
use Illuminate\Http\Resources\Json\Resource;

class CollectionProject extends Resource
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
                'name' => $this->name,
                'projectTypeName' => $this->projectType ? $this->projectType->name : '',
                'administration' => CollectionAdministration::make($this->whenLoaded('administration')),
            ];
    }
}
