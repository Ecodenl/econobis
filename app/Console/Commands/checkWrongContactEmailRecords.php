<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class checkWrongContactEmailRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkWrongContactEmailRecords';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op foute email/contact koppelingen.';

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
     *
     */
    public function handle()
    {
        $emailsWithoutToCcAndBcc = Email::where('folder', 'inbox')->where('to', '[]')->where('cc', '[]')->where('bcc', '[]')->get();
        foreach ($emailsWithoutToCcAndBcc as $emailWithoutToCcAndBcc) {
            print_r("Email id: " . $emailWithoutToCcAndBcc->id . " Aantal contacts: " . $emailWithoutToCcAndBcc->contacts()->count() . "\n");
        }
        dd('Einde Check op foute email/contact koppelingen.');
    }

}
