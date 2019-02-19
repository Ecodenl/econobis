<?php

namespace App\Http\Resources\ParticipantProject\Templates;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class ParticipantReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public $html_body;
    public $subject;
    public $document;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct($email, $html_body, $document)
    {
        $this->email = $email;
        $this->html_body = $html_body;
        $this->document = $document;
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

        return $mail;
    }
}
