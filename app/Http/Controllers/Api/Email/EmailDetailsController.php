<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Http\Controllers\Controller;

class EmailDetailsController extends Controller
{
    public function show(Email $email)
    {
        $this->authorize('manage', $email);

        return response()->json([
            'id' => $email->id,
            'mailboxId' => $email->mailbox_id,
            'from' => $email->from,
            'toAddresses' => $email->getToRecipients()->toReactArray(),
            'contactGroup' => $email->contactGroup ? [
                'name' => $email->contactGroup->name,
            ] : null,
            'ccAddresses' => $email->getCcRecipients()->toReactArray(),
            'bccAddresses' => $email->getBccRecipients()->toReactArray(),
            'subject' => $email->subject,
            'htmlBodyWithEmbeddedImages' => $email->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
            'sentByUser' => $email->sentByUser ? [
                'fullName' => $email->sentByUser->present()->fullName(),
            ] : null,
            'dateSent' => $email->date_sent,
            'folder' => $email->folder,
            'createdAt' => $email->created_at,
            'contacts' => $email->contacts->map(function (Contact $contact) {
                return [
                    'id' => $contact->id,
                    'fullName' => $contact->full_name,
                ];
            }),
            'manualContacts' => $email->manualContacts->map(function (Contact $contact) {
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
            'status' => $email->status,
            'dateClosed' => $email->date_closed,
            'dateRemoved' => $email->date_removed,
            'responsibleUserId' => $email->responsible_user_id,
            'responsibleTeamId' => $email->responsible_team_id,
            'closedBy' => $email->closedBy ? [
                'id' => $email->closedBy->id,
                'fullName' => $email->closedBy->present()->fullName(),
            ] : null,
            'removedBy' => $email->removedBy ? [
                'id' => $email->removedBy->id,
                'fullName' => $email->removedBy->present()->fullName(),
            ] : null,
            'attachments' => $email->attachmentsWithoutCids->map(function ($attachment) {
                return [
                    'id' => $attachment->id,
                    'name' => $attachment->name,
                ];
            }),
            'note' => $email->note,
        ]);
    }
}