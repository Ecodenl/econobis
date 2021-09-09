<?php

namespace App\Mail\CustomMailDriver;

use Illuminate\Mail\MailManager;

class GmailapiManager extends MailManager
{
    /**
     * Create an instance of the Gmail Swift Transport driver.
     *
     * @return GmailapiTransport
     */
    protected function createGmailapiTransport()
    {
        $config = $this->app['config']->get('services.gmailapi', []);

        return new GmailapiTransport(
            $config['mailbox_id'],
        );
    }
}