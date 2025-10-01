<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;   // <— nieuw
use Illuminate\Cache\RateLimiting\Limit;      // <— nieuw
use Illuminate\Http\Request;                  // <— nieuw
use Laravel\Passport\Passport;
use Monolog\Handler\SlackHandler;
use Psr\Log\LogLevel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Passport::enablePasswordGrant();

        Schema::defaultStringLength(191);
        date_default_timezone_set('Europe/Amsterdam');

        // RateLimiter voor login via /oauth/token
        RateLimiter::for('oauth-login', function (Request $request) {
// ToDo WM: voor lokaal testen ook even doen, later kan dit weer teruggezet worden.
//            if (app()->isLocal()) {
//                Log::info('Local!');
//                return Limit::none();
//            }
            $userId = (string) ($request->input('username') ?? $request->input('email') ?? 'unknown');
            return Limit::perMinute(5)->by($userId.'|'.$request->ip());
        });

        if ($this->app->environment() == 'production') { // alleen errors naar slack versturen in productie
            $host= gethostname();
            $ip = gethostbyname($host);
//        Log::info("host " . $host);
//        Log::info("ip " . $ip);
//        [2023-10-30 15:53:29] production.INFO: host vps10.xarishosting.nl  {"Coöperatie":"Econobis Xaris"}
//        [2023-10-30 15:53:29] production.INFO: ip 37.97.146.3  {"Coöperatie":"Econobis Xaris"}
//            if($ip == '37.97.146.3') {
            if($ip == '85.10.155.161') {
                $slackChannelName = '#eco-vps10';
            } else {
                $slackChannelName = '#eco';
            }

            $monolog = Log::getLogger(); // onderliggende monolog instatie ophalen
            $slackHandler
                = new SlackHandler( // nieuwe slackhandler
                Config::get('app.SLACK_TOKEN'), // slack token uit de config -> .env halen
                $slackChannelName, // slack channel naam
                'econobis', // slack username
                true,
                null,
                LogLevel::ERROR, // vanaf welk level de errors naar slack worden verstuurd
                true,
                false,
                true); // extra data toevoegen

            //nieuwe handler die de coöperatie toevoegd aan elke log
            $monolog->pushHandler($slackHandler);
            $monolog->pushProcessor(function ($record) {
                $record['extra']['Coöperatie'] = config('app.name');
                return $record;
            });
            //locale linux/windows verschil
            setlocale(LC_TIME, 'nl_NL.utf8');
        } else {
            if (Config::get('app.LC_TIME')) {
                setlocale(LC_TIME, Config::get('app.LC_TIME'));
            } else {
                setlocale(LC_TIME, 'nld_nld');
            }
        }

        Arr::macro('keysToSnakeCase', function ($array) {
            return array_combine(
                array_map(function ($key) {
                    return snake_case($key);
                }, array_keys($array)),
                $array
            );
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }
}
