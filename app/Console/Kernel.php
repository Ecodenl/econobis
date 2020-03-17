<?php

namespace App\Console;

use App\Console\Commands\checkContactEmailAddress;
use App\Console\Commands\checkContactIban;
use App\Console\Commands\checkMailboxes;
use App\Console\Commands\conversionParticipationsToMutationsDeltaWind;
use App\Console\Commands\conversionParticipationsToMutationsLoanDiv100;
use App\Console\Commands\conversionParticipationsToMutationsDefault;
use App\Console\Commands\conversionProjectRevenues;
use App\Console\Commands\conversionProjects;
use App\Console\Commands\conversionProjectRevenueDistribution;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processPaidInvoices;
use App\Console\Commands\processWorkflowEmailCompleteTask;
use App\Console\Commands\processWorkflowEmailExpiredTask;
use App\Console\Commands\processWorkflowEmailOpportunityStatus;
use App\Console\Commands\processWorkflowEmailQuotationRequestStatus;
use App\Console\Commands\setDaysLastReminderInvoice;
use App\Console\Commands\setDaysToExpireInvoice;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        checkContactEmailAddress::class,
        checkContactIban::class,
        getAllEmail::class,
        setDaysLastReminderInvoice::class,
        setDaysToExpireInvoice::class,
        processPaidInvoices::class,
        checkMailboxes::class,
        processWorkflowEmailCompleteTask::class,
        processWorkflowEmailExpiredTask::class,
        processWorkflowEmailOpportunityStatus::class,
        processWorkflowEmailQuotationRequestStatus::class,
        conversionProjects::class,
        conversionProjectRevenues::class,
        conversionProjectRevenueDistribution::class,
        conversionParticipationsToMutationsDeltaWind::class,
        conversionParticipationsToMutationsLoanDiv100::class,
        conversionParticipationsToMutationsDefault::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('email:getAllEmail')->everyFiveMinutes();
        $schedule->command('email:checkMailboxes')->everyThirtyMinutes();
        $schedule->command('invoice:setDaysLastReminder')->dailyAt('00:05');
        $schedule->command('invoice:setDaysToExpire')->dailyAt('01:05');
        $schedule->command('invoice:processPaidInvoices')->dailyAt('03:00');
        $schedule->command('workflow:processWorkflowEmailCompleteTask')->dailyAt('04:00');
        $schedule->command('workflow:processWorkflowEmailExpiredTask')->dailyAt('04:05');
        $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->dailyAt('04:10');
        $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->dailyAt('04:15');
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
