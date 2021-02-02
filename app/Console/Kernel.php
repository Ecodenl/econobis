<?php

namespace App\Console;

use App\Console\Commands\checkContactEmailAddress;
use App\Console\Commands\checkContactIban;
use App\Console\Commands\checkContactPostalCode;
use App\Console\Commands\checkMailboxes;
use App\Console\Commands\checkJobsLogForRecovery;
use App\Console\Commands\conversionParticipationsToMutationsDeltaWind;
use App\Console\Commands\conversionParticipationsToMutationsLoanDiv100;
use App\Console\Commands\conversionParticipationsToMutationsDefault;
use App\Console\Commands\conversionProjectRevenues;
use App\Console\Commands\conversionProjects;
use App\Console\Commands\conversionProjectRevenueDistribution;
use App\Console\Commands\conversionPortalRegistrationCode;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processPaidInvoices;
use App\Console\Commands\processWorkflowEmailCompleteTask;
use App\Console\Commands\processWorkflowEmailExpiredTask;
use App\Console\Commands\processWorkflowEmailOpportunityStatus;
use App\Console\Commands\processWorkflowEmailQuotationRequestStatus;
use App\Console\Commands\rebuildPortalCss;
use App\Console\Commands\recoveryJobsLog;
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
        checkContactPostalCode::class,
        checkJobsLogForRecovery::class,
        deleteEmailDefinitive::class,
        deleteFloatingAttachmentFiles::class,
        getAllEmail::class,
        setDaysLastReminderInvoice::class,
        setDaysToExpireInvoice::class,
        processPaidInvoices::class,
        checkMailboxes::class,
        processWorkflowEmailCompleteTask::class,
        processWorkflowEmailExpiredTask::class,
        processWorkflowEmailOpportunityStatus::class,
        processWorkflowEmailQuotationRequestStatus::class,
        rebuildPortalCss::class,
        conversionProjects::class,
        conversionProjectRevenues::class,
        conversionProjectRevenueDistribution::class,
        conversionParticipationsToMutationsDeltaWind::class,
        conversionParticipationsToMutationsLoanDiv100::class,
        conversionParticipationsToMutationsDefault::class,
        conversionPortalRegistrationCode::class,
        recoveryJobsLog::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('email:getAllEmail')->everyTenMinutes()->between('06:00', '23:30');
        $schedule->command('email:checkMailboxes')->dailyAt('05:58');
        $schedule->command('email:checkMailboxes')->dailyAt('08:58');
        $schedule->command('email:checkMailboxes')->dailyAt('11:58');
        $schedule->command('email:checkMailboxes')->dailyAt('14:58');
        $schedule->command('email:checkMailboxes')->dailyAt('17:58');
        $schedule->command('invoice:setDaysLastReminder')->dailyAt('01:05');
        $schedule->command('invoice:setDaysToExpire')->dailyAt('02:05');
        $schedule->command('email:deleteEmailDefinitive')->dailyAt('03:05');
//        $schedule->command('email:deleteFloatingAttachmentFiles')->dailyAt('03:35');
        $schedule->command('invoice:processPaidInvoices')->dailyAt('04:30');
        $schedule->command('workflow:processWorkflowEmailCompleteTask')->dailyAt('05:00');
        $schedule->command('workflow:processWorkflowEmailExpiredTask')->dailyAt('05:05');
        $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->dailyAt('05:10');
        $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->dailyAt('05:15');
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
