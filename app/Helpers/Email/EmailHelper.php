<?php

namespace App\Helpers\Email;


use App\Eco\Mailbox\Mailbox;
use Config;

class EmailHelper
{
    public function setConfigToDefaultMailbox()
    {
        $mailbox = Mailbox::getDefault();

        // Er is geen default mailbox, in dat geval vallen we terug op de configuratie in .env
        if(!$mailbox){
            throw new \Exception('No default mailbox has been set.');
        }

        $this->setConfigToMailbox($mailbox);
    }

    public function setConfigToMailbox(Mailbox $mailbox)
    {
        if($mailbox->outgoing_server_type === 'mailgun'){
            $this->setConfigToMailgunMailbox($mailbox);
        } elseif($mailbox->outgoing_server_type === 'smtp'){
            $this->setConfigToSmtpMailbox($mailbox);
        }
    }

    protected function setConfigToMailgunMailbox(Mailbox $mailbox)
    {
        $mailgunDomain = $mailbox->mailgunDomain;
        if(!$mailgunDomain){
            throw new \Exception('Mailbox ' . $mailbox->id . ' given to apply Mailgun but mailbox has no Mailgun domain.');
        }
        if(!$mailgunDomain->is_verified){
            throw new \Exception('Mailbox ' . $mailbox->id . ' given to apply Mailgun but Mailgun domain has not been verified.');
        }

        Config::set('mail.from', ['address' => $mailbox->email, 'name' => $mailbox->name]);

        if($this->inProduction()){
            Config::set('mail.driver', 'mailgun');
            Config::set('mail.mailgun_domain', $mailgunDomain->domain);
            Config::set('services.mailgun.domain', $mailgunDomain->domain);
            Config::set('services.mailgun.secret', $mailgunDomain->secret);
        }
    }

    protected function setConfigToSmtpMailbox(Mailbox $mailbox)
    {
        Config::set('mail.from', ['address' => $mailbox->email, 'name' => $mailbox->name]);

        if($this->inProduction()) {
            Config::set('mail.driver', 'smtp');
            Config::set('mail.host', $mailbox->smtp_host);
            Config::set('mail.port', $mailbox->smtp_port);
            Config::set('mail.encryption', $mailbox->smtp_encryption);
            Config::set('mail.username', $mailbox->username);
            Config::set('mail.password', $mailbox->password);
        }
    }

    protected function inProduction()
    {
        return config('mail.driver') !== 'log';
    }
}