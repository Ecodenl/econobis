<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Email\Email;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Storage;

class GenericMail extends Mailable
{
    public $email;
    public $html_body;

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
        $this->subject($this->email->subject)
            ->view('emails.generic_with_inline_images')
            ->text('emails.genericText');

        $attachments = $this->email->attachments()->whereNull('cid')->get();

        foreach($attachments as $attachment){
            $this->attach(Storage::disk('mail_attachments')->path($attachment->filename), [
                'as' => $attachment->name
            ]);
        }

        return $this;
    }
}
