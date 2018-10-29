<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class setDaysToExpireInvoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:setDaysToExpire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herberekend dagen verlopen';

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
            $invoice->setDaysToExpire();
            $invoice->save();
        }

        Log::info('Dagen laatste herinnering herberekend');
    }
}
