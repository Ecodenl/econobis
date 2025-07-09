<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EmailAttachmentController extends Controller
{
    public function download(EmailAttachment $emailAttachment)
    {
        $this->authorize('manage', $emailAttachment->email);

//        Log::info('test wim filepath mail_attachments');
//        Log::info(Storage::disk('mail_attachments')->path($emailAttachment->filename));

        return Storage::disk('mail_attachments')->download($emailAttachment->filename, $emailAttachment->name);


//        $filePath = Storage::disk('mail_attachments')->path($emailAttachment->filename);

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

//        return response()->download($filePath, $emailAttachment->name);
    }

    public function addDocumentsAsAttachments(Email $email, Request $request)
    {
        $this->authorize('manage', $email);

        $data = $request->validate([
            'documentIds' => ['array'],
        ]);

        foreach (Document::findMany($data['documentIds']) as $document) {
            $fileContents = $document->getFileContents();

            if(!$fileContents){
                continue;
            }

            $filename = 'mailbox_' . $email->mailbox_id . '/outbox/' . time() . '_' . $document->filename;
            Storage::disk('mail_attachments')->put($filename, $fileContents);

            $emailAttachment = new EmailAttachment([
                'filename' => $filename,
                'name' => $document->filename,
                'email_id' => $email->id,
            ]);
            $emailAttachment->save();
        }

        return response()->json([]);
    }

    public function delete(EmailAttachment $emailAttachment)
    {
        $this->authorize('manage', $emailAttachment->email);

        //delete real file (only when count on filename is 1, otherwise this attachment is also in use in another email because of a reply or send through)
        $countAttachment = EmailAttachment::where('filename', $emailAttachment->filename)->count();
        if($countAttachment === 1){
            Storage::disk('mail_attachments')->delete($emailAttachment->filename);
        }

        $emailAttachment->delete();

        return response()->json([]);
    }

    public function store(Email $email, Request $request)
    {
        $this->authorize('manage', $email);

        $request->validate([
            'file' => 'required',
        ]);

        $file = $request->file('file');
        $filename = $file->store('mailbox_' . $email->mailbox_id . '/outbox', 'mail_attachments');

        $emailAttachment = new EmailAttachment([
            'filename' => $filename,
            'name' => $file->getClientOriginalName(),
            'email_id' => $email->id,
        ]);
        $emailAttachment->save();

        return response()->json($emailAttachment);
    }
}