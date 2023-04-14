<?php

namespace App\Console;

use App\Console\Commands\checkMailboxes;
use App\Console\Commands\deleteEmailDefinitive;
//use App\Console\Commands\deleteFloatingAttachmentFiles;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processTwinfieldCustomer;
use App\Console\Commands\processTwinfieldInvoicePayment;
use App\Console\Commands\processStateAllMembersLaposta;
use App\Console\Commands\processWorkflowEmailCompleteTask;
use App\Console\Commands\processWorkflowEmailExpiredTask;
use App\Console\Commands\processWorkflowEmailOpportunityStatus;
use App\Console\Commands\processWorkflowEmailQuotationRequestStatus;
use App\Console\Commands\setDaysLastReminderInvoice;
use App\Console\Commands\setDaysToExpireInvoice;
use App\Console\Commands\createTaskAtEndDateAddress;
use App\Console\Commands\setIsCurrentSupplier;
use App\Console\Commands\checkWrongDistributionParts;
use App\Console\Commands\checkWrongEnergySupplierDataInParts;
use App\Console\Commands\checkMissingEnergySupplierDataInParts;
use App\Console\Commands\checkWrongRevenueDistributionKwhStatus;
use App\Console\Commands\contactGroupsContactsForReport;
use App\Console\Commands\checkOverlappingEnergySuppliers;
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
        deleteEmailDefinitive::class,
//        deleteFloatingAttachmentFiles::class,
        getAllEmail::class,
        createTaskAtEndDateAddress::class,
        setIsCurrentSupplier::class,
        setDaysLastReminderInvoice::class,
        setDaysToExpireInvoice::class,
        processTwinfieldCustomer::class,
        processTwinfieldInvoicePayment::class,
        processStateAllMembersLaposta::class,
        checkMailboxes::class,
        processWorkflowEmailCompleteTask::class,
        processWorkflowEmailExpiredTask::class,
        processWorkflowEmailOpportunityStatus::class,
        processWorkflowEmailQuotationRequestStatus::class,
        checkWrongDistributionParts::class,
        checkWrongEnergySupplierDataInParts::class,
        checkMissingEnergySupplierDataInParts::class,
        checkWrongRevenueDistributionKwhStatus::class,
        contactGroupsContactsForReport::class,
        checkOverlappingEnergySuppliers::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
// Time is CET. So when scheduled for 06:00 it is run at 08:00 Amsterdam time (summertime).
// Time is CET. So when scheduled for 06:00 it is run at 07:00 Amsterdam time (wintertime).
        $schedule->command('email:getAllEmail')->everyTenMinutes()->between('06:00', '23:30');
        $schedule->command('email:checkMailboxes')->dailyAt('05:58');
        $schedule->command('email:checkMailboxes')->dailyAt('08:58');
        $schedule->command('email:checkMailboxes')->dailyAt('11:58');
        $schedule->command('email:checkMailboxes')->dailyAt('14:58');
        $schedule->command('email:checkMailboxes')->dailyAt('17:58');
        $schedule->command('laposta:processStateAllMembersLaposta')->dailyAt('22:30');
        $schedule->command('address:createTaskAtEndDateAddress')->dailyAt('00:30');
        $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->dailyAt('01:00');
        $schedule->command('addressEnergySupplier:checkOverlappingEnergySuppliers')->dailyAt('01:10');
        $schedule->command('invoice:setDaysLastReminder')->dailyAt('01:05');
        $schedule->command('invoice:setDaysToExpire')->dailyAt('02:05');
        $schedule->command('email:deleteEmailDefinitive')->dailyAt('03:05');
//        $schedule->command('email:deleteFloatingAttachmentFiles')->dailyAt('03:35');
        $schedule->command('invoice:processTwinfieldCustomer')->dailyAt('04:20');
        $schedule->command('invoice:processTwinfieldInvoicePayment')->dailyAt('04:30');
        $schedule->command('workflow:processWorkflowEmailCompleteTask')->dailyAt('05:00');
        $schedule->command('workflow:processWorkflowEmailExpiredTask')->dailyAt('05:05');
        $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->dailyAt('05:10');
        $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->dailyAt('05:15');

        $schedule->command('revenue:checkWrongDistributionParts')->dailyAt('21:00');
        $schedule->command('revenue:checkWrongEnergySupplierDataInParts')->dailyAt('21:05');
        $schedule->command('revenue:checkMissingEnergySupplierDataInParts')->dailyAt('21:10');
        $schedule->command('revenue:checkWrongRevenueDistributionKwhStatus')->dailyAt('21:15');

        $schedule->command('report:contactGroupsContacts')->dailyAt('06:00');
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
