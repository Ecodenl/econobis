<?php

namespace App\Providers;

use App\Mail\MailManager;
use Illuminate\Contracts\Events\Dispatcher as LaravelDispatcher;
use Illuminate\Mail\MailServiceProvider;
use Illuminate\Support\Facades\Mail;
use InnoGE\LaravelMsGraphMail\MicrosoftGraphTransport;
use InnoGE\LaravelMsGraphMail\Services\MicrosoftGraphApiService;
use Psr\EventDispatcher\EventDispatcherInterface;

class CustomMailServiceProvider extends MailServiceProvider
{
    public function register()
    {
        // Bind PSR EventDispatcher naar Laravel dispatcher
        $this->app->singleton(EventDispatcherInterface::class, function ($app) {
            return new class($app['events']) implements EventDispatcherInterface {
                private LaravelDispatcher $dispatcher;

                public function __construct(LaravelDispatcher $dispatcher)
                {
                    $this->dispatcher = $dispatcher;
                }

                public function dispatch(object $event): object
                {
                    $this->dispatcher->dispatch($event);
                    return $event;
                }
            };
        });

        // Bind mail manager en mailer
        $this->app->singleton('mail.manager', function ($app) {
            return new MailManager($app);
        });

        $this->app->bind('mailer', function ($app) {
            return $app->make('mail.manager')->mailer();
        });

        // Fix voor cURL TLS versie
        if (!defined('CURL_SSLVERSION_TLSv1_2')) {
            define('CURL_SSLVERSION_TLSv1_2', 6);
        }
    }

    public function boot()
    {
        Mail::extend('microsoft-graph-custom', function (array $config) {
            return new MicrosoftGraphTransport(
                new MicrosoftGraphApiService(
                    tenantId: $config['microsoft_graph_tenant_id'],
                    clientId: $config['microsoft_graph_client_id'],
                    clientSecret: $config['microsoft_graph_client_secret'],
                    accessTokenTtl: 0,
                ),
                app(EventDispatcherInterface::class) // Correcte PSR dispatcher
            );
        });
    }
}
