<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class EmailSendController extends Controller
{
    public function show(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        return response()->json([
            'id' => $email->id,
            'mailboxId' => $email->mailbox_id,
            'contactGroup' => $email->contactGroup ? [
                'id' => $email->contactGroup->id,
                'name' => $email->contactGroup->name,
            ] : null,
            'toAddresses' => $email->getToAddresses(),
            'ccAddresses' => $email->getCcAddresses(),
            'bccAddresses' => $email->getBccAddresses(),
            'subject' => $email->subject,
            'htmlBody' => $email->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
            'attachments' => $email->attachmentsWithoutCids->map(function (EmailAttachment $attachment) {
                return [
                    'id' => $attachment->id,
                    'name' => $attachment->name,
                ];
            }),
        ]);
    }

    public function saveConcept(Email $email, Request $request)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $data = $request->validate([
            'mailboxId' => ['exists:mailboxes,id'],
            'to' => ['array'],
            'cc' => ['array'],
            'bcc' => ['array'],
            'subject' => ['string'],
            'htmlBody' => ['string'],
        ]);

        $email->fill(Arr::keysToSnakeCase($data));
        $email->from = $email->mailbox->email;

        $email->inlineImagesService()->convertInlineImagesToCid();

        $email->save();

        return response()->json([]);
    }

    protected function checkMailboxAutorized($mailboxId): void
    {
        if (!Auth::user()->mailboxes()->where('mailboxes.id', $mailboxId)->exists()) {
            abort(403, 'Niet geautoriseerd.');
        }
    }
}