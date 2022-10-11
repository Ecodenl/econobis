<?php

namespace App\Mail\CustomMailDriver;

use Illuminate\Mail\MailManager;

class MsoauthapiManager extends MailManager
{
    /**
     * Create an instance of the MsOauth Graph.
     *
     * @return MsoauthapiTransport
     */
    protected function createMsoauthapiTransport()
    {
        $config = $this->app['config']->get('services.msoauthapi', []);

        return new MsoauthapiTransport(
            $config['mailbox_id'],
        );
    }
}