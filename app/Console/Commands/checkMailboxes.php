<?php

namespace App\Console\Commands;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailFetcher;
use App\Http\Controllers\Api\Mailbox\MailboxController;
use Illuminate\Console\Command;

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
        $mailboxes = Mailbox::where('valid', 0)->where('is_active', 1)->where('login_tries', '<', 5)->get();
        foreach ($mailboxes as $mailbox) {
            //In construct wordt gelijk valid gekeken
            new MailFetcher($mailbox);
        }
    }
}
