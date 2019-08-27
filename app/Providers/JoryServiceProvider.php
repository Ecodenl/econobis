<?php

namespace App\Providers;

use App\Http\JoryResources\CostCenterJoryResource;
use App\Http\JoryResources\LedgerJoryResource;
use App\Http\JoryResources\MailgunDomainJoryResource;
use App\Http\JoryResources\VatCodeJoryResource;
use Illuminate\Support\ServiceProvider;
use JosKolenberg\LaravelJory\Facades\Jory;

class JoryServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Jory::register(CostCenterJoryResource::class);
        Jory::register(LedgerJoryResource::class);
        Jory::register(MailgunDomainJoryResource::class);
        Jory::register(VatCodeJoryResource::class);
    }
}
