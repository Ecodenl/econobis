<?php

namespace App\Providers;

use App\Eco\Ledger\Ledger;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\VatCode\VatCode;
use App\Http\JoryBuilders\LedgerJoryBuilder;
use App\Http\JoryBuilders\MailgunDomainJoryBuilder;
use App\Http\JoryBuilders\VatCodeJoryBuilder;
use Illuminate\Support\ServiceProvider;
use JosKolenberg\LaravelJory\JoryBuilder;

class JoryServiceProvider extends ServiceProvider
{
    public function boot()
    {
        JoryBuilder::register(MailgunDomain::class, MailgunDomainJoryBuilder::class);
        JoryBuilder::register(Ledger::class, LedgerJoryBuilder::class);
        JoryBuilder::register(VatCode::class, VatCodeJoryBuilder::class);
    }
}
