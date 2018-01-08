<?php

namespace App\Http\Resources\Email\Templates;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class GenericMail extends Mailable
{
    use Queueable, SerializesModels;

    public $html_body;
    public $subject;

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

        $mail = $this->subject($this->email->subject)->view('emails.generic');

        $attachments = EmailAttachment::where('email_id', '=', $this->email->id)->get();

        //add attachments
        foreach($attachments as $attachment){
            $mail->attach(Storage::disk('mail_attachments')->getDriver()->getAdapter()->applyPathPrefix($attachment->filename), [
                'as' => $attachment->name
            ]);
        }

        return $mail;
    }
}
