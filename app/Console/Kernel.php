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
use App\Console\Commands\checkWrongRevenueDistributionPartsKwhIndicatorFields;
use App\Console\Commands\checkWrongTwinfieldInvoices;
use App\Console\Commands\contactGroupsContactsForReport;
use App\Console\Commands\checkOverlappingEnergySuppliers;
use App\Console\Commands\checkFirstStartingDateParticipants;
use App\Console\Commands\checkTerminationDateParticipants;
use App\Console\Commands\checkWrongProjectDataForLastProjectRevenue;
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
        checkWrongTwinfieldInvoices::class,
        checkWrongEnergySupplierDataInParts::class,
        checkMissingEnergySupplierDataInParts::class,
        checkWrongRevenueDistributionKwhStatus::class,
        contactGroupsContactsForReport::class,
        checkOverlappingEnergySuppliers::class,
        checkFirstStartingDateParticipants::class,
        checkTerminationDateParticipants::class,
        checkWrongProjectDataForLastProjectRevenue::class,
        checkWrongRevenueDistributionPartsKwhIndicatorFields::class,
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
// Time is default CET, therefore set timezone to Europ/Amsterdam, scheduled for 06:00 wil run at 06:00 Amsterdam time now.
        $schedule->command('email:getAllEmail')->everyTenMinutes()->timezone('Europe/Amsterdam')->between('06:00', '23:30');

        $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('05:58');
        $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:58');
        $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:58');
        $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:58');
        $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:58');

        $schedule->command('revenue:checkMissingEnergySuppliersInAddress')->timezone('Europe/Amsterdam')->dailyAt('20:55');
        $schedule->command('revenue:checkWrongDistributionParts')->timezone('Europe/Amsterdam')->dailyAt('21:00');
        $schedule->command('revenue:checkWrongEnergySupplierDataInParts')->timezone('Europe/Amsterdam')->dailyAt('21:05');
        $schedule->command('revenue:checkMissingEnergySupplierDataInParts')->timezone('Europe/Amsterdam')->dailyAt('21:10');
        $schedule->command('revenue:checkWrongRevenueDistributionKwhStatus')->timezone('Europe/Amsterdam')->dailyAt('21:15');
        $schedule->command('revenue:checkWrongRevenueDistributionPartsKwhIndicatorFields')->timezone('Europe/Amsterdam')->dailyAt('21:20');
        $schedule->command('revenue:checkMissingRevenueDistributionParts')->timezone('Europe/Amsterdam')->dailyAt('21:25');
        $schedule->command('addressEnergySupplier:checkOverlappingEnergySuppliers')->timezone('Europe/Amsterdam')->dailyAt('21:30');
        $schedule->command('participants:checkFirstStartingDate')->timezone('Europe/Amsterdam')->dailyAt('21:35');
        $schedule->command('participants:checkTerminationDate')->timezone('Europe/Amsterdam')->dailyAt('21:40');
//        $schedule->command('project:checkWrongProjectDataForLastProjectRevenue')->timezone('Europe/Amsterdam')->dailyAt('21:45');

        $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:45');

        $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:30');
        $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('01:00');
        $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:05');
        $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:55');

        // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

        // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
        $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:05');

        $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('03:30');
//        $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
        $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:20');
        $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('04:30');
        $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('04:45');
        $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('05:00');
        $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('05:05');
        $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('05:10');
        $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('05:15');

        /**
         * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
         * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
         */
        $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('01:25');
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
