<?php

namespace App\Mail;

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
            $transport = Transport::fromDsn("smtp://{$username}:{$password}@{$host}:{$port}");
        } else {
            return;
        }

//        $mailer->setSwiftMailer(new Swift_Mailer($transport));

// transport met smpt volgens mij alleen indien geen msoauth en geen mailgun
//        $mailer->setSymfonyTransport(Transport::fromDsn("smtp://{$username}:{$password}@{$host}:{$port}"));
          $mailer->setSymfonyTransport( $transport);

// het was zo:
//        Container::getInstance()->call([$this, 'build']);
//        $mailer->send($this->buildView(), $this->buildViewData(), function ($message) {
//            $message->from([config('mail.from.address') => config('mail.from.name')]);
//            $this->buildFrom($message)
//                ->buildRecipients($message)
//                ->buildSubject($message)
//                ->buildAttachments($message)
//                ->runCallbacks($message);
//
// door PK vervangen door maar nu ineens met een return en de callback: in code is niet goed !?:
//        return $mailer->send([], [], callback: function ($message) {
//        $message->html($this->html_body);
//
//        $this->buildFrom($message)
//            ->buildRecipients($message)
//            ->buildSubject($message)
//            ->runCallbacks($message)
//            ->buildAttachments($message);
//    });
//
// WM heeft er voorlopig dit van gemaakt (geen rode kringeltjes meer ivm fout in code in ieder geval):
        $mailer->send([], [], function ($message) {
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