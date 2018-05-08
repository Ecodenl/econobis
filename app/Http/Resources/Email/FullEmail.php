<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Email;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Mailbox\FullMailbox;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Order\OrderPeek;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
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
            'contacts' => FullContact::collection($this->whenLoaded('contacts')),
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'task' => FullTask::make($this->whenLoaded('task')),
            'quotationRequest' => FullQuotationRequest::make($this->whenLoaded('quotationRequest')),
            'order' => OrderPeek::make($this->whenLoaded('order')),
            'measure' => FullMeasure::make($this->whenLoaded('measure')),
            'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
            'attachments' => GenericResource::collection($this->whenLoaded('attachments')),
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'dateClosed' => $this->date_closed,
            'closedById' => $this->closed_by_id,
            'closedBy' => FullUser::make($this->whenLoaded('closedBy')),
        ];
    }
}