<?php

namespace App\Http\Resources\Portal\Templates;

use App\Mail\ConfigurableMailable;

class PortalMail extends ConfigurableMailable
{
    public $html_body;
    public $subject;
    public $document_path;
    public $document_name;
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
        $mail = $this->subject($this->mail->subject)->view('emails.generic')->text('emails.genericText');

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
