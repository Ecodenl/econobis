<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Eco\Email\Jobs;


use App\Eco\Email\Email;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
use Config;
use Mail;

class SendEmail
{

    /**
     * @var Email
     */
    private $email;

    public function __construct(Email $email)
    {
        $this->email = $email;
    }

    public function handle()
    {
        $this->validateRequest();

        $config = Config::get('mail');

        $email = $this->email;
        $mailbox = $email->mailbox;

        $config['driver'] = 'smtp';
        $config['host'] = $mailbox->smtp_host;
        $config['port'] = $mailbox->smtp_port;
        $config['from'] = ['address' => $mailbox->email, 'name' => $mailbox->name];
        $config['encryption'] = $mailbox->smtp_encryption;
        $config['username'] = $mailbox->username;
        $config['password'] = $mailbox->password;

        Config::set('mail', $config);

        $mail = Mail::to($email->to);

        ($email->cc != []) ? $mail->cc($email->cc) : null;
        ($email->bcc != []) ? $mail->bcc($email->bcc) : null;

        $mail->send(new GenericMail($email, $email->html_body));

        $email->date_sent = new Carbon();
        $email->folder = 'sent';
        $email->save();
    }

    private function validateRequest()
    {
        if($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }
}