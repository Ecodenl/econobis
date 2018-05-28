<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

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

       // if ($this->app->environment() == 'production') {
            $monolog = \Log::getMonolog();
            $slackHandler
                = new \Monolog\Handler\SlackHandler(\Config::get('app.SLACK_TOKEN'),
                '#errors', 'econobis', true, null, \Monolog\Logger::ERROR, true, false, true);
            $monolog->pushHandler($slackHandler);
            $monolog->pushProcessor(function ($record) {
                $record['extra']['Coöperatie'] = config('app.name');
                return $record;
            });
       // }
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
