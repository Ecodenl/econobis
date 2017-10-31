<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\ResourceCollection;

class GridContactCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => GridContact::collection($this->collection),
        ];
    }
}
