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
        $this->authorize('manage', $email);

        return response()->json([
            'id' => $email->id,
            'mailboxId' => $email->mailbox_id,
            'contactGroup' => $email->contactGroup ? [
                'id' => $email->contactGroup->id,
                'name' => $email->contactGroup->name,
            ] : null,
            'toAddresses' => $email->getToRecipients()->toReactArray(),
            'ccAddresses' => $email->getCcRecipients()->toReactArray(),
            'bccAddresses' => $email->getBccRecipients()->toReactArray(),
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
        $this->authorize('manage', $email);

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

    public function send(Email $email)
    {
        $this->authorize('manage', $email);

        set_time_limit(0);

        $email->send(Auth::user());
    }
}