<?php

namespace App\Mail\CustomMailDriver;

class MailManager extends \Illuminate\Mail\MailManager
{
    protected function createGmailapiTransport()
    {
        $config = $this->app['config']->get('services.gmailapi', []);

        return new GmailapiTransport(
            $config['mailbox_id'],
        );
    }

    protected function createMsoauthapiTransport()
    {
        $config = $this->app['config']->get('services.msoauthapi', []);

        return new MsoauthapiTransport(
            $config['mailbox_id'],
        );
    }
}
