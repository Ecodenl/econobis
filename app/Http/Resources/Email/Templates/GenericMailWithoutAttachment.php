<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Email\Email;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GenericMailWithoutAttachment extends Mailable
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
    public function __construct($email, $html_body)
    {
        $this->email = $email;
        $this->html_body = $html_body;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $mail = $this->subject($this->email->subject)->view('emails.generic')->text('emails.genericText');;

        return $mail;
    }
}
