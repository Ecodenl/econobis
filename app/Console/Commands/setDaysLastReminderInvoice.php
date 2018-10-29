<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class setDaysLastReminderInvoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:setDaysLastReminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herberekend dagen laatste herinnering';

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
        $invoices = Invoice::all();

        foreach ($invoices as $invoice){
            $invoice->setDaysLastReminder();
            $invoice->save();
        }

        Log::info('Dagen laatste herinnering herberekend');
    }
}
