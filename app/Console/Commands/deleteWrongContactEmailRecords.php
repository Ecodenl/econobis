<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class deleteWrongContactEmailRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:deleteWrongContactEmailRecords';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verwijderen op foute email/contact koppelingen.';

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
            $emailWithoutToCcAndBcc->contacts()->detach();
        }
        Log::info('Einde Verwijderen foute email/contact koppelingen.');
    }

}
