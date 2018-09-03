<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullContactGroup extends Resource
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
            'description' => $this->description,
            'dateStarted' => $this->date_started,
            'dateFinished' => $this->date_finished,
            'createdById' => $this->created_by_id,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'responsibleUserId' => $this->responsible_user_id,
            'responsibleUser' => FullUser::make($this->whenLoaded('responsibleUser')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'contacts' => FullContact::collection($this->all_contacts),
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => $this->documents()->get(),
            'type' => FullEnumWithIdAndName::make($this->getType()),
            'showPortal' => $this->show_portal,
            'editPortal' => $this->edit_portal,
            'showContactForm' => $this->show_contact_form,
            'filters' => $this->filters,
            'extraFilters' => $this->extraFilters,
            'composedGroups' => $this->contactGroups()->get(),
            'isUsedInComposedGroup' => $this->is_used_in_composed_group,
            'contactGroupComposedType' => $this->composed_group_type,
        ];
    }
}
