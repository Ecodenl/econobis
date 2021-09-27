<?php

namespace App\Console\Commands;

use App\Eco\Administration\Administration;
use App\Helpers\Twinfield\TwinfieldInvoicePaymentHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class processTwinfieldInvoicePayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:processTwinfieldInvoicePayment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Gaat in Twinfield kijken of nota's betaald zijn. Als is dit moeten ze in Econobis ook op betaald";

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
        foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {
            $twinfieldInvoicePaymentHelper = new TwinfieldInvoicePaymentHelper($administration, null);
            $twinfieldInvoicePaymentHelper->processTwinfieldInvoicePayment();
        }

        Log::info("Betaalde Twinfield nota's in Econobis bijgewerkt.");
    }
}
