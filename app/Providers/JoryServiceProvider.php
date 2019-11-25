<?php

namespace App\Providers;

use App\Eco\CostCenter\CostCenter;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Ledger\Ledger;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Task\TaskType;
use App\Eco\VatCode\VatCode;
use App\Http\JoryBuilders\CostCenterJoryBuilder;
use App\Http\JoryBuilders\EmailTemplateJoryBuilder;
use App\Http\JoryBuilders\LedgerJoryBuilder;
use App\Http\JoryBuilders\MailgunDomainJoryBuilder;
use App\Http\JoryBuilders\TaskTypeJoryBuilder;
use App\Http\JoryBuilders\VatCodeJoryBuilder;
use Illuminate\Support\ServiceProvider;
use JosKolenberg\LaravelJory\JoryBuilder;

class JoryServiceProvider extends ServiceProvider
{
    public function boot()
    {
        JoryBuilder::register(MailgunDomain::class, MailgunDomainJoryBuilder::class);
        JoryBuilder::register(Ledger::class, LedgerJoryBuilder::class);
        JoryBuilder::register(CostCenter::class, CostCenterJoryBuilder::class);
        JoryBuilder::register(VatCode::class, VatCodeJoryBuilder::class);
        JoryBuilder::register(TaskType::class, TaskTypeJoryBuilder::class);
        JoryBuilder::register(EmailTemplate::class, EmailTemplateJoryBuilder::class);
    }
}
