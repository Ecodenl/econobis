<?php

namespace App\Http\Resources\ParticipantProject\Templates;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Http\Controllers\Api\Document\DocumentController;
use App\Mail\ConfigurableMailable;
use Illuminate\Support\Facades\Storage;

class ParticipantReportMail extends ConfigurableMailable
{
    public $html_body;
    public $subject;
    public $document;
    public $defaultAttachmentDocumentId;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct($email, $from_email, $from_name, $html_body, $document, $defaultAttachmentDocumentId = null)
    {
        $this->from_email = $from_email;
        $this->from_name = $from_name;
        $this->email = $email;
        $this->html_body = $html_body;
        $this->document = $document;
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

        $mail->attach(Storage::disk('documents')->getDriver()->getAdapter()
            ->applyPathPrefix($this->document->filename), [
            'as' => $this->document->name
        ]);

        if($this->defaultAttachmentDocumentId != null){
            $defaultAttachmentDocument = Document::find($this->defaultAttachmentDocumentId);
            if($defaultAttachmentDocument){
                $documentController = new DocumentController();
                $mail->attachData($documentController->downLoadRawDocument($defaultAttachmentDocument), $defaultAttachmentDocument->filename, [
                    'as' => $defaultAttachmentDocument->filename
                ]);
            }
        }

        $mail = $this->from($this->from_email, $this->from_name);
        return $mail;
    }
}
