<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Email;


use App\Eco\EmailAddress\EmailAddress;
use App\Eco\User\User;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Invoice\InvoicePeek;
use App\Http\Resources\Mailbox\FullMailbox;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Order\OrderPeek;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullEmail extends JsonResource
{
    public function toArray($request)
    {

        $to = $this->to;

        if($this->contactGroup){
            array_unshift($to, $this->contactGroup->name);
        }


        $emailAddressesToSelected = [];
        foreach ($this->to as $toSelected) {
            if(is_numeric($toSelected)){
                $emailAddress = EmailAddress::find($toSelected);
                if($emailAddress){
                    $emailAddressesToSelected[] = [
                        'id' => $emailAddress->id,
                        'name' => $emailAddress->contact->full_name . ' (' . $emailAddress->email . ')',
                        'email' => $emailAddress->email
                    ];
                }
            }else{
                $emailAddressesToSelected[] = [
                    'id' => $toSelected,
                    'name' => $toSelected,
                    'email' => $toSelected
                ];
            }
        }
        $emailAddressesCcSelected = [];
        foreach ($this->cc as $ccSelected) {
            if(is_numeric($ccSelected)){
                $emailAddress = EmailAddress::find($ccSelected);
                if($emailAddress){
                    $emailAddressesCcSelected[] = [
                        'id' => $emailAddress->id,
                        'name' => $emailAddress->contact->full_name . ' (' . $emailAddress->email . ')',
                        'email' => $emailAddress->email
                    ];
                }
            }else{
                $emailAddressesCcSelected[] = [
                    'id' => $ccSelected,
                    'name' => $ccSelected,
                    'email' => $ccSelected
                ];
            }
        }
        $emailAddressesBccSelected = [];
        foreach ($this->bcc as $bccSelected) {
            if(is_numeric($bccSelected)){
                $emailAddress = EmailAddress::find($bccSelected);
                if($emailAddress){
                    $emailAddressesBccSelected[] = [
                        'id' => $emailAddress->id,
                        'name' => $emailAddress->contact->full_name . ' (' . $emailAddress->email . ')',
                        'email' => $emailAddress->email
                    ];
                }
            }else{
                $emailAddressesBccSelected[] = [
                    'id' => $bccSelected,
                    'name' => $bccSelected,
                    'email' => $bccSelected
                ];
            }
        }
        return [
            'id' => $this->id,
            'mailboxId' => $this->mailbox_id,
            'mailbox' => FullMailbox::make($this->whenLoaded('mailbox')),
            'emailAddressesToSelected' => $emailAddressesToSelected,
            'emailAddressesCcSelected' => $emailAddressesCcSelected,
            'emailAddressesBccSelected' => $emailAddressesBccSelected,
            'from' => $this->from,
            'to' => $this->to,
            'toWithGroup' => $to,
            'cc' => $this->cc,
            'bcc' => $this->bcc,
            'subject' => $this->subject,
            'htmlBody' => $this->html_body,
            'htmlBodyWithEmbeddedImages' => $this->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
            'sentByUser' => FullUser::make(User::find($this->sent_by_user_id)),
            'dateSent' => $this->date_sent,
            'folder' => $this->folder,
            'imapId' => $this->imap_id,
            'msoauthMessageId' => $this->msoauth_message_id,
            'messageId' => $this->message_id,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'contacts' => FullContact::collection($this->whenLoaded('contacts')),
            'intakeId' => $this->intake_id,
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'taskId' => $this->task_id,
            'task' => FullTask::make($this->whenLoaded('task')),
            'quotationRequestId' => $this->quotation_request_id,
            'quotationRequest' => FullQuotationRequest::make($this->whenLoaded('quotationRequest')),
            'order' => OrderPeek::make($this->whenLoaded('order')),
            'invoice' => InvoicePeek::make($this->whenLoaded('invoice')),
            'measure' => FullMeasure::make($this->whenLoaded('measure')),
            'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
            'attachments' => GenericResource::collection($this->whenLoaded('attachments')),
            'replyTypeId' => $this->reply_type_id,
            'oldEmailId' => $this->old_email_id,
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'dateClosed' => $this->date_closed,
            'dateRemoved' => $this->date_removed,
            'responsibleUserId' => $this->responsible_user_id,
            'responsibleUser' => FullUser::make($this->whenLoaded('responsibleUser')),
            'responsibleTeamId' => $this->responsible_team_id,
            'responsibleTeam' => FullTeam::make($this->whenLoaded('responsibleTeam')),
            'closedById' => $this->closed_by_id,
            'closedBy' => FullUser::make($this->whenLoaded('closedBy')),
            'removedById' => $this->closed_by_id,
            'removedBy' => FullUser::make($this->whenLoaded('removedBy')),
            'contactGroupId' => $this->contact_group_id,
        ];
    }
}