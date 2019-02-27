<?php

namespace App\Providers;

use App\Eco\Mailbox\MailgunDomain;
use App\Http\JoryBuilders\MailgunDomainJoryBuilder;
use Illuminate\Support\ServiceProvider;
use JosKolenberg\LaravelJory\JoryBuilder;

class JoryServiceProvider extends ServiceProvider
{
    public function boot()
    {
        JoryBuilder::register(MailgunDomain::class, MailgunDomainJoryBuilder::class);
    }
}
