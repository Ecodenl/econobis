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
use App\Console\Commands\processWorkflowEmailQuotationRequestStatusReminder;
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
        processWorkflowEmailQuotationRequestStatusReminder::class,
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

        switch ($scheduleRunId){
            case 1:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('07:45');
                $schedule->command('email:getAllEmail')->timezone('Europe/Amsterdam')->dailyAt('08:00');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:55');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:55');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('20:55');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('21:41');

                // don't schedule anything between 23:00 and 01:00 because of (xaris) backupFP.

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('03:01');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('03:03');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('03:05');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('03:10');

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:05');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:30');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:40');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('04:55');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:01');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:03');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:05');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatusReminder')->timezone('Europe/Amsterdam')->dailyAt('06:07');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:09');

                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('06:45');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:05');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:32');
                break;
            case 2:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('07:46');
                $schedule->command('email:getAllEmail')->timezone('Europe/Amsterdam')->dailyAt('08:01');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:56');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:56');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:00');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('21:56');

                // don't schedule anything between 23:00 and 01:00 because of (xaris) backupFP.

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('03:12');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('03:14');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('03:16');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('03:21');

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:10');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:32');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('04:50');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:05');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:09');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:11');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:13');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatusReminder')->timezone('Europe/Amsterdam')->dailyAt('06:15');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:17');

                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('06:47');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:10');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:37');
                break;
            case 3:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('07:47');
                $schedule->command('email:getAllEmail')->timezone('Europe/Amsterdam')->dailyAt('08:02');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:57');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:57');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:05');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('22:11');

                // don't schedule anything between 23:00 and 01:00 because of (xaris) backupFP.

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('03:23');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('03:25');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('03:27');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('03:32');

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:15');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:34');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:00');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:15');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:17');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:19');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:21');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatusReminder')->timezone('Europe/Amsterdam')->dailyAt('06:23');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:25');

                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('06:49');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:15');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:42');
                break;
            case 4:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('07:48');
                $schedule->command('email:getAllEmail')->timezone('Europe/Amsterdam')->dailyAt('08:03');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:58');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:58');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:10');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('22:26');

                // don't schedule anything between 23:00 and 01:00 because of (xaris) backupFP.

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('03:34');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('03:36');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('03:38');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('03:43');

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:20');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:36');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:10');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:25');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:25');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:27');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:29');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatusReminder')->timezone('Europe/Amsterdam')->dailyAt('06:31');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:33');

                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('06:51');
                /**
                 * Cronjob draait elke dag (1440 minuten) maar sommige events kunnen pas later beschikbaar komen daarom wat extra marge voor de zekerheid.
                 * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
                 */
                $schedule->command('mailgun:fetch-events --minutes=1500')->timezone('Europe/Amsterdam')->dailyAt('07:20');

                $schedule->command('shared:processCommandRunsToShared')->timezone('Europe/Amsterdam')->dailyAt('07:47');
                break;
            case 5:
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('07:49');
                $schedule->command('email:getAllEmail')->timezone('Europe/Amsterdam')->dailyAt('08:04');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('08:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('11:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('14:59');
                $schedule->command('email:checkMailboxes')->timezone('Europe/Amsterdam')->dailyAt('17:59');

                $schedule->command('check:controleScript')->timezone('Europe/Amsterdam')->dailyAt('21:15');

                $schedule->command('laposta:processStateAllMembersLaposta')->timezone('Europe/Amsterdam')->dailyAt('22:41');

                // don't schedule anything between 23:00 and 01:00 because of (xaris) backupFP.

                // don't schedule anything between 02:00 and 03:00 because of summer/winter time changes (02:00 -> 03:00 job is skipt and 03:00-02:00 job is run double.

                $schedule->command('address:createTaskAtEndDateAddress')->timezone('Europe/Amsterdam')->dailyAt('03:45');
                $schedule->command('addressEnergySupplier:setIsCurrentSupplier')->timezone('Europe/Amsterdam')->dailyAt('03:47');

                $schedule->command('invoice:setDaysLastReminder')->timezone('Europe/Amsterdam')->dailyAt('03:49');
                $schedule->command('invoice:setDaysToExpire')->timezone('Europe/Amsterdam')->dailyAt('03:54');

                // report:contactGroupsContacts after laposta:processStateAllMembersLaposta
                $schedule->command('report:contactGroupsContacts')->timezone('Europe/Amsterdam')->dailyAt('04:25');

//                $schedule->command('email:deleteFloatingAttachmentFiles')->timezone('Europe/Amsterdam')->dailyAt('03:35');
                $schedule->command('email:deleteEmailDefinitive')->timezone('Europe/Amsterdam')->dailyAt('04:38');

                $schedule->command('invoice:processTwinfieldCustomer')->timezone('Europe/Amsterdam')->dailyAt('05:20');
                $schedule->command('invoice:processTwinfieldInvoicePayment')->timezone('Europe/Amsterdam')->dailyAt('05:35');

                $schedule->command('workflow:processWorkflowEmailCompleteTask')->timezone('Europe/Amsterdam')->dailyAt('06:33');
                $schedule->command('workflow:processWorkflowEmailExpiredTask')->timezone('Europe/Amsterdam')->dailyAt('06:35');
                $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->timezone('Europe/Amsterdam')->dailyAt('06:37');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatusReminder')->timezone('Europe/Amsterdam')->dailyAt('06:39');
                $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->timezone('Europe/Amsterdam')->dailyAt('06:41');

                $schedule->command('invoice:checkWrongTwinfieldInvoices')->timezone('Europe/Amsterdam')->dailyAt('06:53');
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
