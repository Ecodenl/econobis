<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\Contact\FullContact;
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
            'numberOfContacts' => $this->contacts()->count(),
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
            'contacts' => FullContact::collection($this->whenLoaded('contacts')),
        ];
    }
}
