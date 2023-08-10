<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Requests\MailgunStoreMailRequest;
use App\Http\Traits\Email\EmailRelations;
use App\Http\Traits\Email\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class MailgunMailController
{
    use Storage, EmailRelations;

    public function store(MailgunStoreMailRequest $request)
    {
        /**
         * Log alle input om te kunnen debuggen voor alle mogelijke inkomende varianten.
         */
//        Log::info([
//            'info' =>'Mail ontvangen via mailgun:',
//            'input' => $request->all(),
//            'headers' => $request->headers->all(),
//            'files' => $request->files->all(),
//        ]);

        $mailbox = $request->getMailbox();

        if(!$mailbox) {
            return;
        }

        $email = new Email([
            'mailbox_id' => $mailbox->id,
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
            'cc' => $request->getCc(),
            'bcc' => [],
            'subject' => $request->input('subject'),
            'html_body' => $request->getHtmlBody(),
            'date_sent' => Carbon::now(),
            'folder' => 'inbox',
            'imap_id' => null,
            'gmail_message_id' => null,
            'message_id' => $request->input('Message-Id'),
            'status' => 'unread'
        ]);
        $email->save();

        $this->addRelationToContacts($email);
        $this->storeAttachments($request, $email);
    }

    private function storeAttachments(MailgunStoreMailRequest $request, Email $email)
    {
        foreach ($request->allFiles() as $key => $file){
            $filePathAndName = \Illuminate\Support\Facades\Storage::disk('mail_attachments')->putFile('mailbox_' . $email->mailbox_id .'/inbox', $file);

            /**
             * De cid's zijn de verwijzingen in de html van images.
             * Ook overige bijlages (excel bijv.) krijgen een cid, zet hem voor deze bijlages op null.
             * Op die manier kunnen we afbeeldingen die in de html staan verbergen als bijlage.
             */
            $cid = $request->getCidForAttachment($key);

            $emailAttachment = new EmailAttachment([
                'filename' => $filePathAndName,
                'name' => $file->getClientOriginalName(),
                'email_id' => $email->id,
                'cid' => $cid && str_contains($email->html_body, $cid) ? $cid : null,
            ]);
            $emailAttachment->save();
        }
    }
}