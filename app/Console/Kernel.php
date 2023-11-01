<?php

namespace App\Console;

use App\Console\Commands\checkMailboxes;
use App\Console\Commands\Checks\checkWrongTwinfieldInvoices;
use App\Console\Commands\contactGroupsContactsForReport;
use App\Console\Commands\createTaskAtEndDateAddress;
use App\Console\Commands\deleteEmailDefinitive;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processCommandRunsToShared;
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
        processCommandRunsToShared::class,
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

        $schedule->command('email:getAllEmail')->everyTenMinutes()->timezone('Europe/Amsterdam')->between('07:30', '23:00');

        switch ($scheduleRunId){
            case 1:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:45');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:55');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('20:55');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:01');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:05');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:10');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('00:15');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('00:20');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:05');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('03:18');
                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('03:21');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('03:24');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('03:27');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:01');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:11');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:21');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:31');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:05');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:32');
                break;
            case 2:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:46');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:56');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:00');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:21');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:25');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:30');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('00:35');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('00:40');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:20');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('03:48');
                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('03:51');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('03:54');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('03:57');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:03');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:13');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:23');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:33');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:10');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:37');
                break;
            case 3:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:47');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:57');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:05');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('23:41');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('00:45');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('00:50');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('00:55');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:00');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:35');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:18');
                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:21');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('04:24');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('04:27');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:05');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:15');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:25');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:35');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:15');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:42');
                break;
            case 4:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:48');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:58');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:10');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('00:01');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('01:05');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('01:10');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:15');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:20');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('03:50');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:48');
                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:51');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('04:54');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('04:57');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:07');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:17');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:27');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:37');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:20');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:47');
                break;
            case 5:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('06:49');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:59');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:15');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('00:21');

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('01:25');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('01:30');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('01:35');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('01:40');

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:05');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('05:18');
                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:21');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:24');
                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('05:27');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:09');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:19');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:29');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:39');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:25');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:52');
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
