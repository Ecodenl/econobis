<?php

namespace App\Mail;

use App\Eco\Mailbox\Mailbox;
use App\Mail\CustomMailDriver\GmailapiTransport;
use App\Mail\CustomMailDriver\MsoauthapiTransport;
use Illuminate\Bus\Queueable;
use Illuminate\Container\Container;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Transport\MailgunTransport;
use Illuminate\Queue\SerializesModels;
use GuzzleHttp\Client as HttpClient;
use Symfony\Component\Mailer\Transport;



class ConfigurableMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Override Mailable functionality to support mailbox settings on the fly
     *
     * @param  \Illuminate\Contracts\Mail\Factory|\Illuminate\Contracts\Mail\Mailer  $mailer
     * @return void
     */
    public function send($mailer)
    {
        if(config('mail.default') === 'mailgun') {
            $key = config('services.mailgun.secret');
            $domain = config('services.mailgun.domain');
            $endpoint = config('services.mailgun.endpoint');

            $transport = new MailgunTransport(new HttpClient , $key, $domain, $endpoint);
        }elseif(config('mail.default') === 'gmailapi') {
            // Send mail with gmail?!?!?
            $mailboxId = config('services.gmailapi.mailbox_id');

            if(!$mailboxId) return;

            $transport = new GmailapiTransport($mailboxId);
//todo WM oauth: nog testen !!!
        }elseif(config('mail.default') === 'msoauthapi') {
            // Send mail with msoauthapi?!?!?
            $mailboxId = config('services.msoauthapi.mailbox_id');

            if(!$mailboxId) return;

            $transport = new MsoauthapiTransport($mailboxId);
        }elseif(config('mail.default') !== 'log') {
            $host      = config('mail.host');
            $port      = config('mail.port');
            $security  = config('mail.encryption');
            $password  = config('mail.password');
            $username  = config('mail.username');
        } else {
            return;
        }

        Container::getInstance()->call([$this, 'build']);

        $mailer->setSymfonyTransport(Transport::fromDsn("smtp://{$username}:{$password}@{$host}:{$port}"));

        return $mailer->send([], [], callback: function ($message) {
            $message->html($this->html_body);

            $this->buildFrom($message)
                ->buildRecipients($message)
                ->buildSubject($message)
                ->runCallbacks($message)
                ->buildAttachments($message);
        });
    }

    private function GmailAuth()
    {

    }
}