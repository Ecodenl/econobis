<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class FullContactGroup extends JsonResource
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
            'composedGroups' => $this->contactGroups()->whereTeamContactGroupIds(Auth::user())->get(),
            'composedExceptGroups' => $this->contactGroupsExcepted()->get(),
            'isUsedInComposedGroup' => $this->is_used_in_composed_group,
            'isUsedInExceptedGroup' => $this->is_used_in_excepted_group,
            'contactGroupComposedType' => $this->composed_group_type,
            'dynamicFilterType' => $this->dynamic_filter_type,
            'composedOf' => $this->composed_of,
            'sendEmailNewContactLink' => $this->send_email_new_contact_link,
            'emailTemplateIdNewContactLink' => $this->email_template_id_new_contact_link,
            'emailTemplateNewContactLink' => FullEmailTemplate::make($this->whenLoaded('emailTemplateNewContactLink')),
            'isUsedInLaposta' => $this->is_used_in_laposta,
            'groupUpToDateWithLaposta' => $this->group_up_to_date_with_laposta,
            'numberOfLapostaMembers' => $this->number_of_laposta_members,
            'lapostaListId' => $this->simulatedGroup ? $this->simulatedGroup->laposta_list_id : $this->laposta_list_id,
            'lapostaListCreatedAt' => $this->simulatedGroup ? $this->simulatedGroup->laposta_list_created_at : $this->laposta_list_created_at,
            'includeIntoExportGroupReport' => $this->include_into_export_group_report,
            'portalSortOrder' => $this->portal_sort_order,
            'inspectionPersonTypeId' => $this->inspection_person_type_id,
            'inspectionPersonType' => FullEnumWithIdAndName::make($this->getInspectionPersonType()),
        ];
    }
}
