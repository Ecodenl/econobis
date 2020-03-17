<?php

namespace App\Console;

use App\Console\Commands\checkContactEmailAddress;
use App\Console\Commands\checkContactIban;
use App\Console\Commands\checkContactPostalCode;
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
use Illuminate\Support\Facades\Log;

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
        $appCoopName =  \Config::get('app.APP_COOP_NAME');
        Log::info('AppCoopName: ' . $appCoopName);
        switch ( $appCoopName ) {
            case 'test-acceptatie':
                Log::info('Check A: ' . $appCoopName);
                $timeSetDaysLastReminder = '16:00';
                $timeSetDaysToExpire = '16:05';
                $timeCheckContactPostalCode = '16:11';
                break;
            case 'test-lokaal':
                Log::info('Check B: ' . $appCoopName);
                $timeSetDaysLastReminder = '15:50';
                $timeSetDaysToExpire = '15:55';
                $timeCheckContactPostalCode = '07:00';
                break;
            default:
                Log::info('Check rest: ' . $appCoopName);
                $timeSetDaysLastReminder = '00:05';
                $timeSetDaysToExpire = '01:05';
                $timeCheckContactPostalCode = '07:00';
                break;
        }

        $schedule->command('email:getAllEmail')->everyFiveMinutes();
        $schedule->command('email:checkMailboxes')->everyThirtyMinutes();

        $schedule->command('contact:checkContactPostalCode')->dailyAt($timeCheckContactPostalCode);
        $schedule->command('invoice:setDaysLastReminder')->dailyAt($timeSetDaysLastReminder);
        $schedule->command('invoice:setDaysToExpire')->dailyAt($timeSetDaysToExpire);
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
