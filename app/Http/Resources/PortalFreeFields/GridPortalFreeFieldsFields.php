<?php

namespace App\Http\Resources\PortalFreeFields;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridPortalFreeFieldsFields extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'pageId' => $this->page_id,
            'fieldId' => $this->field_id,
            'freeFieldsField' => GenericResource::make($this->whenLoaded('freeFieldsField')),
            'changePortal' => $this->change_portal,
            'sortOrder' => $this->sort_order,
//            'createdAt' => $this->created_at,
//            'updatedAt' => $this->updated_at,
        ];
    }
}
