<?php

namespace App\Http\Resources\Hoomdossier\Templates;

use App\Eco\Document\Document;
use App\Http\Controllers\Api\Document\DocumentController;
use Illuminate\Mail\Mailable;

class HoomdossierMail extends Mailable
{
    public $html_body;
    public $subject;
    public $defaultAttachmentDocumentId;

    /**
     * Create a new message instance.
     *
     * @param Mail $mail
     */
    public function __construct($mail, $html_body, $defaultAttachmentDocumentId = null)
    {
        $this->mail = $mail;
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
        $this->subject($this->mail->subject)
            ->view('emails.generic')
            ->text('emails.genericText');

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
