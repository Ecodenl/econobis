<?php

namespace App\Http\Resources\Portal\Administration;

use Illuminate\Http\Resources\Json\Resource;

class CollectionAdministration extends Resource
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
            ];
    }
}
