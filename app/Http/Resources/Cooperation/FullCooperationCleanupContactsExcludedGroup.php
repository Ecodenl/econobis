<?php

namespace App\Http\Resources\Cooperation;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCooperationCleanupContactsExcludedGroup extends JsonResource
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
            'id' => $this->id,
            'cooperationId' => $this->cooperation_id ?: '',
            'contactGroupId' => $this->contact_group_id ?: '',
            'contactGroupName' => $this->contactGroup ? $this->contactGroup->name : '',
        ];
    }
}
