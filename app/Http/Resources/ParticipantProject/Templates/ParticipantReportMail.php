<?php

namespace App\Http\Resources\ParticipantProject\Templates;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Http\Controllers\Api\Document\DocumentController;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Storage;

class ParticipantReportMail extends Mailable
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
        if($this->document && $this->document->file_path_and_name !== null){
            $this->subject($this->email->subject)
                ->view('emails.generic')
                ->text('emails.genericText')
                ->attach(Storage::disk('documents')->path($this->document->file_path_and_name), [
                    'as' => $this->document->filename
                ]);
        } else {
            $this->subject($this->email->subject)
                ->view('emails.generic')
                ->text('emails.genericText');
        }

        if ($this->defaultAttachmentDocumentId != null) {
            $defaultAttachmentDocument = Document::find($this->defaultAttachmentDocumentId);
            if ($defaultAttachmentDocument) {
                $documentController = new DocumentController();

                $attachment = $documentController->downLoadRawDocument($defaultAttachmentDocument);
                if ($attachment && isset($attachment['content'])) {
                    $this->attachData(
                        $attachment['content'],
                        $attachment['filename'],
                        [
                            'as' => $attachment['filename'],
                            'mime' => $attachment['mime'] ?? 'application/octet-stream',
                        ]
                    );
                }
            }
        }

        $this->from($this->from_email, $this->from_name);

        return $this;
    }
}
