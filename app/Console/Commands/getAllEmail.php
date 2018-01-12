<?php

namespace App\Console\Commands;

use App\Http\Controllers\Api\Mailbox\MailboxController;
use Illuminate\Console\Command;

class getAllEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:getAllEmail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Haalt alle email op van alle mailboxes';

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
    MailboxController::receiveAllEmail();
    }
}
