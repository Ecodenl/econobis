<?php

namespace App\Http\Resources\PortalFreeFields;

use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalFreeFieldsPage extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isActive' => $this->is_active,
            'description' => $this->description,
            'urlPageRef' => $this->url_page_ref,
            'portalFreeFieldsFields' => GridPortalFreeFieldsFields::collection($this->portalFreeFieldsFields->sortBy('sort_order')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
