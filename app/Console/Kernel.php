<?php

namespace App\Console;

use App\Console\Commands\checkMailboxes;
use App\Console\Commands\Checks\checkWrongTwinfieldInvoices;
use App\Console\Commands\contactGroupsContactsForReport;
use App\Console\Commands\createTaskAtEndDateAddress;
use App\Console\Commands\deleteEmailDefinitive;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processStateAllMembersLaposta;
use App\Console\Commands\processTwinfieldCustomer;
use App\Console\Commands\processTwinfieldInvoicePayment;
use App\Console\Commands\processWorkflowEmailCompleteTask;
use App\Console\Commands\processWorkflowEmailExpiredTask;
use App\Console\Commands\processWorkflowEmailOpportunityStatus;
use App\Console\Commands\processWorkflowEmailQuotationRequestStatus;
use App\Console\Commands\setDaysLastReminderInvoice;
use App\Console\Commands\setDaysToExpireInvoice;
use App\Console\Commands\setIsCurrentSupplier;
use Config;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

//use App\Console\Commands\deleteFloatingAttachmentFiles;

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
        checkWrongTwinfieldInvoices::class,
        contactGroupsContactsForReport::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $scheduleRunId = Config::get('app.SCHEDULE_RUN_ID');

        // Time is CET. So when scheduled for 06:00 it is run at 08:00 Amsterdam time (summertime).
        // Time is CET. So when scheduled for 06:00 it is run at 07:00 Amsterdam time (wintertime).
        // Time is default CET, therefore set timezone to Europ/Amsterdam, scheduled for 06:00 wil run at 06:00 Amsterdam time now.

        $schedule->command('email:getAllEmail')->everyTenMinutes()->timezone('Europe/Amsterdam')->between('06:00', '23:30');

        switch ($scheduleRunId){
            case 1:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('05:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:58');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('20:55');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:05');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:30');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:45');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:00');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:15');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:05');

                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('03:30');
//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');

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
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('05:25');
                break;
            case 2:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('05:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:59');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:00');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:20');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:33');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:48');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:03');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:18');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:20');

                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('03:45');
//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:35');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('04:45');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('05:00');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('05:15');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('05:20');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('05:25');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('05:30');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('05:40');
                break;
            case 3:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:01');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('09:01');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('12:01');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('15:01');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('18:01');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:05');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:35');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:36');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:51');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:06');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:21');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:35');

                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:00');
//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:50');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:00');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('05:15');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('05:30');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('05:35');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('05:40');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('05:45');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('05:55');
                break;
            case 4:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:02');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('09:02');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('12:02');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('15:02');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('18:02');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:10');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:50');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:39');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:54');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:09');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:24');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:50');

                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:15');
//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:05');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:15');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('05:30');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('05:45');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('05:50');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('05:55');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:00');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('06:10');
                break;
            case 5:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:03');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('09:03');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('12:03');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('15:03');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('18:03');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:15');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('00:05');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:42');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:57');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:12');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:27');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:05');

                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:30');
//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:20');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:30');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('05:45');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:00');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:05');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:10');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:15');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('06:25');
                break;
        }

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
