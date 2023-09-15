<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Http\Controllers\Api\Document\DocumentController;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Storage;

class GenericMail extends Mailable
{
    public $email;
    public $html_body;
    public $defaultAttachmentDocumentId;

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
        $this->subject($this->email->subject)
            ->view('emails.generic_with_inline_images')
            ->text('emails.genericText');

        $attachments = $this->email->attachments()->whereNull('cid')->get();

        //add attachments
        foreach($attachments as $attachment){
            $this->attach(Storage::disk('mail_attachments')->path($attachment->filename), [
                'as' => $attachment->name
            ]);
        }

        if($this->defaultAttachmentDocumentId != null){
            $defaultAttachmentDocument = Document::find($this->defaultAttachmentDocumentId);
            if($defaultAttachmentDocument){
                $documentController = new DocumentController();
                $this->attachData($documentController->downLoadRawDocument($defaultAttachmentDocument), $defaultAttachmentDocument->filename, [
                    'as' => $defaultAttachmentDocument->filename
                ]);
            }
        }

        return $this;
    }
}
