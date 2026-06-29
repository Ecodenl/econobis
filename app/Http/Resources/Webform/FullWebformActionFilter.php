<?php

namespace App\Http\Resources\Webform;

use Illuminate\Http\Resources\Json\JsonResource;

class FullWebformActionFilter extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'webformActionId' => $this->webform_action_id,
            'field' => $this->field,
            'operator' => $this->operator,
            'value' => $this->value,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}