<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Email;


use App\Http\Resources\Contact\ContactPeek;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class GridEmail extends JsonResource
{
    public function toArray($request)
    {

        $responsible = '';
        if($this->responsibleUser){
            $responsible = $this->responsibleUser->present()->fullName();
        }
        if($this->responsibleTeam){
            $responsible = $this->responsibleTeam->name;
        }

        $to = $this->to;

        if($this->contactGroup){
            array_unshift($to, $this->contactGroup->name);
        }


        return [
            'createdAt' => $this->created_at,
            'id' => $this->id,
            'date' => $this->date_sent,
            'mailboxName' => $this->mailbox->name,
            'from' => $this->from,
            'to' => $to,
            'subject' => $this->subject,
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'folder' => $this->folder,
            'contacts' => ContactPeek::collection($this->whenLoaded('contacts')),
            'responsibleName' => $responsible,
            'sentByUser' => $this->sent_by_user_id,
            'hasAttachmentsWithoutCids' => $this->attachmentsWithoutCids->isNotEmpty(),
        ];
    }
}