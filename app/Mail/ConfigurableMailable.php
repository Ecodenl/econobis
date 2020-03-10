<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Container\Container;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Transport\MailgunTransport;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Swift_Mailer;
use Swift_SmtpTransport;
use GuzzleHttp\Client as HttpClient;

class ConfigurableMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Override Mailable functionality to support mailbox settings on the fly
     *
     * @param  \Illuminate\Contracts\Mail\Mailer  $mailer
     * @return void
     */
    public function send(Mailer $mailer)
    {
        if(config('mail.driver') == 'mailgun') {
            $key = config('services.mailgun.secret');
            $domain = config('services.mailgun.domain');
            $endpoint = config('services.mailgun.endpoint');

            $transport = new MailgunTransport(new HttpClient , $key, $domain, $endpoint);
        }elseif(config('mail.driver') !== 'log') {
            $host      = config('mail.host');
            $port      = config('mail.port');
            $security  = config('mail.encryption');

            $transport = new Swift_SmtpTransport( $host, $port, $security);
            $transport->setUsername(config('mail.username'));
            $transport->setPassword(config('mail.password'));
        }else{
            return;
        }

        $mailer->setSwiftMailer(new Swift_Mailer($transport));

        Container::getInstance()->call([$this, 'build']);

        $mailer->send($this->buildView(), $this->buildViewData(), function ($message) {
            $message->from([config('mail.from.address') => config('mail.from.name')]);
            $this->buildFrom($message)
                ->buildRecipients($message)
                ->buildSubject($message)
                ->buildAttachments($message)
                ->runCallbacks($message);
        });
    }
}