<?php

namespace App\Http\Resources\Invoice\Templates;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $html_body;
    public $subject;
    public $document_path;
    public $document_name;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct($email, $html_body, $document_path, $document_name)
    {
        $this->email = $email;
        $this->html_body = $html_body;
        $this->document_path = $document_path;
        $this->document_name = $document_name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $mail = $this->subject($this->email->subject)->view('emails.generic')->text('emails.genericText');;

        $mail->attach($this->document_path, [
            'as' => $this->document_name
        ]);

        return $mail;
    }
}
