<?php

namespace App\Http\Resources\Portal\Contact;

use Illuminate\Http\Resources\Json\Resource;

class CollectionContact extends Resource
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
            'fullName' => $this->full_name,
        ];
    }
}
