<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Email\Email;
use App\Mail\ConfigurableMailable;
use Illuminate\Support\Facades\Storage;

class GenericMail extends ConfigurableMailable
{
    public $email;
    public $html_body;

    /**
     * Create a new message instance.
     *
     * @param Email $email
     */
    public function __construct(Email $email, $html_body)
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
        $mail = $this->subject($this->email->subject)->view('emails.generic_with_inline_images')->text('emails.genericText');

        $attachments = $this->email->attachments()->whereNull('cid')->get();

        foreach($attachments as $attachment){
            $mail->attach(Storage::disk('mail_attachments')->getDriver()->getAdapter()->applyPathPrefix($attachment->filename), [
                'as' => $attachment->name
            ]);
        }

        return $mail;
    }
}
