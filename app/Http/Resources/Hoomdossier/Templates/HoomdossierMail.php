<?php

namespace App\Http\Resources\Hoomdossier\Templates;

use App\Eco\Email\Email;
use App\Mail\ConfigurableMailable;

class HoomdossierMail extends ConfigurableMailable
{
    public $html_body;
    public $subject;

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
