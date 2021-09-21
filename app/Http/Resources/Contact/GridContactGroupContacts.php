<?php

namespace App\Http\Resources\Contact;

use Illuminate\Http\Resources\Json\Resource;

class GridContactGroupContacts extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $emailAddress = $this->primaryEmailAddress;
        return [
            'id' => $this->id,
            'number' => $this->number,
            'typeName' => $this->present()->type,
            'fullName' => $this->full_name,
            'emailAddress' => optional($emailAddress)->email,
            'statusName' => $this->present()->status,
            'lapostaMemberId' => $this->laposta_member_id,
            'lapostaMemberState' => $this->laposta_member_state,
            'memberCreatedAt' => $this->member_created_at,
            'memberToGroupSince' => $this->member_to_group_since,
        ];
    }
}
