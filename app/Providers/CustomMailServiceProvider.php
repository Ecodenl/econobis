<?php

namespace App\Providers;

use App\Mail\CustomMailDriver\GmailapiManager;
use App\Mail\CustomMailDriver\MsoauthapiManager;
use Illuminate\Mail\MailServiceProvider;

class CustomMailServiceProvider extends MailServiceProvider
{
    /**
     * Register the Illuminate mailer instance.
     *
     * @return void
     */
    protected function registerIlluminateMailer()
    {
        $this->app->singleton('mail.manager', function($app) {
            return new GmailapiManager($app);
        });

        $this->app->singleton('mail.manager', function($app) {
            return new MsoauthapiManager($app);
        });

        // Copied from Illuminate\Mail\MailServiceProvider
        $this->app->bind('mailer', function ($app) {
            return $app->make('mail.manager')->mailer();
        });
    }
}
