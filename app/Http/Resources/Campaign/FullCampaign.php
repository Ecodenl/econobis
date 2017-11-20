<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\Resource;

class FullCampaign extends Resource
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
