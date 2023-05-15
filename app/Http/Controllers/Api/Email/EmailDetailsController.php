<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EmailDetailsController extends Controller
{
    public function show(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        /**
         * 20230509; Jos Todo; nog opschonen
         */
        return response()->json([
            'id' => $email->id,
            'mailboxId' => $email->mailbox_id,
            //    'mailbox' => FullMailbox::make($email->whenLoaded('mailbox')),
            //    'emailAddressesToSelected' => $emailAddressesToSelected,
            //    'emailAddressesCcSelected' => $emailAddressesCcSelected,
            //    'emailAddressesBccSelected' => $emailAddressesBccSelected,
            'from' => $email->from,
            'toAddresses' => $email->getToAddresses(),
            'contactGroup' => $email->contactGroup ? [
                'name' => $email->contactGroup->name,
            ] : null,
            //    'toWithGroup' => $to,
            'ccAddresses' => $email->getCcAddresses(),
            'bccAddresses' => $email->getBccAddresses(),
                'subject' => $email->subject,
            //    'htmlBody' => $email->html_body,
                'htmlBodyWithEmbeddedImages' => $email->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
            'sentByUser' => $email->sentByUser ? [
                'fullName' => $email->sentByUser->present()->fullName(),
            ] : null,
            'dateSent' => $email->date_sent,
            'folder' => $email->folder,
            //    'imapId' => $email->imap_id,
            //    'gmailMessageId' => $email->gmail_message_id,
            //    'messageId' => $email->message_id,
            'createdAt' => $email->created_at,
            //    'updatedAt' => $email->updated_at,
            'contacts' => $email->contacts->map(function (Contact $contact) {
                return [
                    'id' => $contact->id,
                    'fullName' => $contact->full_name,
                ];
            }),
                'intakeId' => $email->intake_id,
                'intake' => $email->intake ? [
                    'id' => $email->intake->id,
                    'name' => $email->intake->getName(),
                ] : null,
                'taskId' => $email->task_id,
                'task' => $email->task ? [
                    'id' => $email->task->id,
                    'noteSummary' => $email->task->present()->noteSummary(),
                ] : null,
                'quotationRequestId' => $email->quotation_request_id,
                'quotationRequest' => $email->quotationRequest ? [
                    'id' => $email->quotationRequest->id,
                    'name' => $email->quotationRequest->name,
                ] : null,
                'orderId' => $email->order_id,
                'order' => $email->order ? [
                    'id' => $email->order->id,
                    'subject' => $email->order->subject,
                ] : null,
                'invoiceId' => $email->invoice_id,
                'invoice' => $email->invoice ? [
                    'id' => $email->invoice->id,
                    'number' => $email->invoice->number,
                ] : null,
                'measureId' => $email->measure_id,
                'measure' => $email->measure ? [
                    'id' => $email->measure->id,
                    'name' => $email->measure->name,
                ] : null,
                'opportunityId' => $email->opportunity_id,
                'opportunity' => $email->opportunity ? [
                    'id' => $email->opportunity->id,
                    'name' => $email->opportunity->getName(),
                ] : null,
            //    'attachments' => GenericResource::collection($email->whenLoaded('attachments')),
            //    'replyTypeId' => $email->reply_type_id,
            //    'oldEmailId' => $email->old_email_id,
                'status' => $email->status,
//                'status' => $email->getStatus() ? [
//                    'id' => $email->getStatus()->id,
//                    'name' => $email->getStatus()->name,
//                ] : null,
                'dateClosed' => $email->date_closed,
                'dateRemoved' => $email->date_removed,
                'responsibleUserId' => $email->responsible_user_id,
//                'responsibleUser' => $email->responsibleUser ? [
//                    'id' => $email->responsibleUser->id,
//                    'fullName' => $email->responsibleUser->present()->fullName(),
//                ] : null,
                'responsibleTeamId' => $email->responsible_team_id,
//                'responsibleTeam' => $email->responsibleTeam ? [
//                    'id' => $email->responsibleTeam->id,
//                    'name' => $email->responsibleTeam->name,
//                ]: null,
            //    'closedById' => $email->closed_by_id,
                'closedBy' => $email->closedBy ? [
                    'id' => $email->closedBy->id,
                    'fullName' => $email->closedBy->present()->fullName(),
                ] : null,
            //    'removedById' => $email->closed_by_id,
                'removedBy' => $email->removedBy ? [
                    'id' => $email->removedBy->id,
                    'fullName' => $email->removedBy->present()->fullName(),
                ] : null,
            //    'contactGroupId' => $email->contact_group_id,
            'attachmentsWithoutCids' => $email->attachmentsWithoutCids,
        ]);
    }

    protected function checkMailboxAutorized($mailboxId): void
    {
        if (!Auth::user()->mailboxes()->where('mailboxes.id', $mailboxId)->exists()) {
            abort(403, 'Niet geautoriseerd.');
        }
    }
}