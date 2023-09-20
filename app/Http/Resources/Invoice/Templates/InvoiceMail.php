<?php

namespace App\Http\Resources\Invoice\Templates;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Http\Controllers\Api\Document\DocumentController;
use Illuminate\Mail\Mailable;

class InvoiceMail extends Mailable
{
    public $html_body;
    public $subject;
    public $document_path;
    public $document_name;
    public $defaultAttachmentDocumentId;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct($email, $html_body, $document_path, $document_name, $defaultAttachmentDocumentId = null)
    {
        $this->email = $email;
        $this->html_body = $html_body;
        $this->document_path = $document_path;
        $this->document_name = $document_name;
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
            ->view('emails.generic')
            ->text('emails.genericText')
            ->attach($this->document_path, [
                'as' => $this->document_name
            ]);

        if ($this->defaultAttachmentDocumentId != null) {
            $defaultAttachmentDocument = Document::find($this->defaultAttachmentDocumentId);
            if ($defaultAttachmentDocument) {
                $documentController = new DocumentController();
                $this->attachData($documentController->downLoadRawDocument($defaultAttachmentDocument), $defaultAttachmentDocument->filename, [
                    'as' => $defaultAttachmentDocument->filename
                ]);
            }
        }

        return $this;
    }
}
