<?php

namespace App\Http\Resources\ParticipantProject\Templates;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Mail\ConfigurableMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class ParticipantReportMail extends ConfigurableMailable
{
//    use Queueable, SerializesModels;

    public $html_body;
    public $subject;
    public $document;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct($email, $from_email, $from_name, $html_body, $document)
    {
        $this->from_email = $from_email;
        $this->from_name = $from_name;
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

        $mail = $this->from($this->from_email, $this->from_name);
        return $mail;
    }
}
