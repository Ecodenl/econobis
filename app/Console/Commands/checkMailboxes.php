<?php

namespace App\Console\Commands;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailFetcher;
use App\Eco\Mailbox\MailFetcherGmail;
use App\Eco\Mailbox\MailFetcherMsOauth;
use App\Eco\Schedule\CommandRun;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkMailboxes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkMailboxes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kijkt of mailboxen valide zijn';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $mailboxes = Mailbox::where('valid', 0)->where('is_active', 1)->where('login_tries', '<', 5)->get();
        foreach ($mailboxes as $mailbox) {
            //In construct wordt gelijk valid gekeken
            if ($mailbox->incoming_server_type === 'gmail') {
                new MailFetcherGmail($mailbox);
            } else if ($mailbox->incoming_server_type === 'ms-oauth') {
                new MailFetcherMsOauth($mailbox);
            } else if ($mailbox->incoming_server_type !== 'mailgun'){
                new MailFetcher($mailbox);
            } else {
                return;
            }
        }

        $mailboxes2 = Mailbox::where('valid', 1)->where('is_active', 1)->get();
        foreach ($mailboxes2 as $mailbox2) {

            if($mailbox2->start_fetch_mail && Carbon::parse($mailbox2->start_fetch_mail) < Carbon::now()->subHours(3)){
//                Log::info('start_fetch_mail: ' . Carbon::parse($mailbox2->start_fetch_mail)->format('Y-m-d H:i:s'));
//                Log::info('Vandaag: ' . Carbon::now()->subHours(3)->format('Y-m-d H:i:s'));
                Log::error(Carbon::now()->format('Y-m-d H:i:s') . ' : Mailbox id ' . $mailbox2->id . ' had start_fetch_mail ' . Carbon::parse($mailbox2->start_fetch_mail) . '. Deze is nu weer vrijgegeven.');
                $mailbox2->start_fetch_mail = null;
                $mailbox2->save();
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info('Mailboxen gecheckt om ' . Carbon::now()->format('Y-m-d H:i:s') . '.');
    }
}
