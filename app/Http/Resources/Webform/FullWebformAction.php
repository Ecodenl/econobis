<?php

namespace App\Http\Resources\Webform;

use Illuminate\Http\Resources\Json\JsonResource;

class FullWebformAction extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'webformId' => $this->webform_id,
            'actionCode' => $this->action_code,
            'enabled' => $this->enabled,
            'filters' => FullWebformActionFilter::collection($this->whenLoaded('filters')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }


}