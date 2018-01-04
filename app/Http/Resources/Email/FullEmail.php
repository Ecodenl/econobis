<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Email;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Mailbox\FullMailbox;
use Illuminate\Http\Resources\Json\Resource;

class FullEmail extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'mailbox_id' => $this->mailbox_id,
            'mailbox' => FullMailbox::make($this->whenLoaded('mailbox')),
            'from' => $this->from,
            'to' => $this->to,
            'cc' => $this->cc,
            'bcc' => $this->bcc,
            'subject' => $this->subject,
            'html_body' => $this->html_body,
            'date' => $this->date,
            'folder' => $this->folder,
            'imap_id' => $this->imap_id,
            'message_id' => $this->message_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'contact_id' => $this->contact_id,
            'contact' => FullContact::make($this->whenLoaded('contact')),
        ];
    }
}