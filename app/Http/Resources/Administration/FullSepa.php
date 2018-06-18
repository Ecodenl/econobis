<?php

namespace App\Http\Resources\Administration;

use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullSepa extends Resource
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

                'type' => FullEnumWithIdAndName::make($this->getType()),

                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

            ];
    }
}
