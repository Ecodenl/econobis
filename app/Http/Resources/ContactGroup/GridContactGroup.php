<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class GridContactGroup extends JsonResource
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
            'isUsedInExceptedGroup' => $this->is_used_in_excepted_group,
            'isUsedInLaposta' => $this->is_used_in_laposta,
            'groupUpToDateWithLaposta' => $this->group_up_to_date_with_laposta,
            'numberOfLapostaMembers' => $this->number_of_laposta_members,
            'parentGroupsArray' => $this->parent_groups_array,
            'createdByName' => $this->createdBy->present()->fullName(),
        ];
    }
}
