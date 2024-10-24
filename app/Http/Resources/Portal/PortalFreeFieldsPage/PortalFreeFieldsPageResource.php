<?php

namespace App\Http\Resources\Portal\PortalFreeFieldsPage;

use Illuminate\Http\Resources\Json\JsonResource;

class PortalFreeFieldsPageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isActive' => $this->is_active,
            'description' => $this->description,
            'urlPageRef' => $this->url_page_ref,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
