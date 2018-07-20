<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridContactGroup extends Resource
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
            'name' => $this->name,
            'numberOfContacts' => $this->all_contacts->count(),
            'closed' => $this->closed,
            'closedStatus' => $this->present()->closedStatus(),
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'isUsedInComposedGroup' => $this->is_used_in_composed_group,
        ];
    }
}
