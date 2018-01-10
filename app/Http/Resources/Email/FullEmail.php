<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Email;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Mailbox\FullMailbox;
use Illuminate\Http\Resources\Json\Resource;

class FullEmail extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'mailboxId' => $this->mailbox_id,
            'mailbox' => FullMailbox::make($this->whenLoaded('mailbox')),
            'from' => $this->from,
            'to' => $this->to,
            'cc' => $this->cc,
            'bcc' => $this->bcc,
            'subject' => $this->subject,
            'htmlBody' => $this->html_body,
            'dateSent' => $this->date_sent,
            'folder' => $this->folder,
            'imapId' => $this->imap_id,
            'messageId' => $this->message_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'contactId' => $this->contact_id,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'attachments' => GenericResource::collection($this->whenLoaded('attachments'))
        ];
    }
}