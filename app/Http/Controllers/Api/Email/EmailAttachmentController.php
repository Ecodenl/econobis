<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EmailAttachmentController extends Controller
{
    public function download(EmailAttachment $emailAttachment)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($emailAttachment->email->mailbox_id);

        $filePath = Storage::disk('mail_attachments')->getDriver()->getAdapter()->applyPathPrefix($emailAttachment->filename);

        /**
         * 20230509; Jos; Todo; Nog checken; Onderstaand op dit moment nog niet nodig, wel vanuit document aanmaken..?
         */
//        $contactId = '';
//        if($emailAttachment->email->contacts()->count() === 1) {
//            $contactId = $emailAttachment->email->contacts()->first()->id;
//        }

//        header('X-Filename:' . $emailAttachment->name);
//        header('X-ContactId:' . $contactId);
//        header('Access-Control-Expose-Headers: X-Filename, X-ContactId');

        return response()->download($filePath, $emailAttachment->name);
    }

    protected function checkMailboxAutorized($mailboxId): void
    {
        $user = Auth::user();
        if (!$user->mailboxes()->where('mailboxes.id', $mailboxId)->exists()) {
            abort(403, 'Niet geautoriseerd.');
        }
    }

}