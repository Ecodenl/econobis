<?php

namespace App\Http\Resources\EnumWithIdAndName;

use Illuminate\Http\Resources\Json\JsonResource;

class FullEnumWithIdAndName extends JsonResource
{
    public function toArray($request)
    {
        $resource = $this->resource;

        $id = null;
        $name = null;

        if (is_object($resource)) {
            if (method_exists($resource, 'getId')) {
                $id = $resource->getId();
            } elseif (property_exists($resource, 'id')) {
                $id = $resource->id;
            } elseif (property_exists($resource, 'value')) {
                $id = $resource->value;
            }

            if (method_exists($resource, 'getName')) {
                $name = $resource->getName();
            } elseif (property_exists($resource, 'name')) {
                $name = $resource->name;
            }
        }

        return [
            'id' => $id,
            'name' => $name,
        ];
    }
}