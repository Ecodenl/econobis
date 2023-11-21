<?php

namespace App\Console\Commands;

use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Schedule\CommandRun;
use App\Jobs\Mailgun\FetchMailgunEvents;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchEventsForAllMailgunDomains extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailgun:fetch-events {--minutes=30}';
    protected $commandRef = 'mailgun:fetch-events';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Haal alle events op voor alle mailgun domeinen.';

    /**
     *
     */
    public function handle()
    {
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->commandRef;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        foreach (MailgunDomain::where('is_verified', true)->get() as $mailgunDomain) {
            $this->fetchEventsForMailgunDomain($mailgunDomain);
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

    }

    protected function fetchEventsForMailgunDomain(MailgunDomain $mailgunDomain)
    {
        FetchMailgunEvents::dispatchSync($mailgunDomain, (int) $this->option('minutes'));
    }
}
