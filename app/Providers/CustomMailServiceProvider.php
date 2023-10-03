<?php

namespace App\Providers;

use App\Mail\MailManager;
use Illuminate\Mail\MailServiceProvider;
use Illuminate\Support\Facades\Mail;
use InnoGE\LaravelMsGraphMail\MicrosoftGraphTransport;
use InnoGE\LaravelMsGraphMail\Services\MicrosoftGraphApiService;

class CustomMailServiceProvider extends MailServiceProvider
{
    /**
     * Register the Illuminate mailer instance.
     *
     * @return void
     */
    protected function registerIlluminateMailer()
    {
        // Een vieze truc: tbv werkend maken mailgun-mailer package op servers: hier maar CURL_SSLVERSION_TLSv1_2 definieren.
        // om 1 of andere reden hebben we op server (vps9 en vps10) geen toegang tot php.jar/stubs/curl/curl_d.php ?!
        // daar word o.a. dus CURL_SSLVERSION_TLSv1_2 = 6 gedefinieerd.
        if (!defined('CURL_SSLVERSION_TLSv1_2')) {
            define('CURL_SSLVERSION_TLSv1_2', 6);
        }

        $this->app->singleton('mail.manager', function ($app) {
            return new MailManager($app);
        });

        $this->app->bind('mailer', function ($app) {
            return $app->make('mail.manager')->mailer();
        });

        /**
         * Custom microsoft-graph driver in LaravelMsGraphMailServiceProvider is voor
         * ons niet bruikbaar omdat we de config dynamisch uit de database halen.
         * Daarom hier een custom transport toegevoegd die dit wel ondersteunt.
         */
        Mail::extend('microsoft-graph-custom', function (array $config) {
            return new MicrosoftGraphTransport(
                new MicrosoftGraphApiService(
                    tenantId: $config['microsoft_graph_tenant_id'],
                    clientId: $config['microsoft_graph_client_id'],
                    clientSecret: $config['microsoft_graph_client_secret'],
                    accessTokenTtl: 0,
                ),
                $config['from']['address']
            );
        });
    }
}
