<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Controllers\Api\Document\DocumentController;
use App\Mail\ConfigurableMailable;
use Illuminate\Support\Facades\Storage;

class GenericMail extends ConfigurableMailable
{
    public $html_body;
    public $subject;
    public $defaultAttachmentDocumentId;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct(Email $email, $html_body, $defaultAttachmentDocumentId = null)
    {
        $this->email = $email;
        $this->html_body = $html_body;
        $this->defaultAttachmentDocumentId = $defaultAttachmentDocumentId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->subject($this->email->subject)->view('emails.generic')->text('emails.genericText');

        $attachments = EmailAttachment::where('email_id', '=', $this->email->id)->get();

        //add attachments
        foreach($attachments as $attachment){
            $mail->attach(Storage::disk('mail_attachments')->path($attachment->filename), [
                'as' => $attachment->name
            ]);
        }

        if($this->defaultAttachmentDocumentId != null){
            $defaultAttachmentDocument = Document::find($this->defaultAttachmentDocumentId);
            if($defaultAttachmentDocument){
                $documentController = new DocumentController();
                $mail->attachData($documentController->downLoadRawDocument($defaultAttachmentDocument), $defaultAttachmentDocument->filename, [
                    'as' => $defaultAttachmentDocument->filename
                ]);
            }
        }

        return $mail;
    }
}
