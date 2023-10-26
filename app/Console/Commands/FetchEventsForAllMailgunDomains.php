<?php

namespace App\Console\Commands;

use App\Eco\Mailbox\MailgunDomain;
use App\Jobs\Mailgun\FetchMailgunEvents;
use Illuminate\Console\Command;

class FetchEventsForAllMailgunDomains extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailgun:fetch-events {--minutes=30}';

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
        foreach (MailgunDomain::where('is_verified', true)->get() as $mailgunDomain) {
            $this->fetchEventsForMailgunDomain($mailgunDomain);
        }
    }

    protected function fetchEventsForMailgunDomain(MailgunDomain $mailgunDomain)
    {
        FetchMailgunEvents::dispatchSync($mailgunDomain, (int) $this->option('minutes'));
    }
}
