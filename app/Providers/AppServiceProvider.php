<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Monolog\Handler\SlackHandler;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        date_default_timezone_set('Europe/Amsterdam');

        if ($this->app->environment() == 'production') { // alleen errors naar slack versturen in productie
            $monolog = Log::getLogger(); // onderliggende monolog instatie ophalen
            $slackHandler
                = new SlackHandler( // nieuwe slackhandler
                    Config::get('app.SLACK_TOKEN'), // slack token uit de config -> .env halen
                    '#eco', // slack channel naam
                    'econobis', // slack username
                    true,
                    null,
                    \Monolog\Logger::ERROR, // vanaf welk level de errors naar slack worden verstuurd
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
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }
}
