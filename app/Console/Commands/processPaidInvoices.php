<?php

namespace App\Console\Commands;

use App\Eco\Administration\Administration;
use App\Helpers\Twinfield\TwinfieldInvoiceHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class processPaidInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:processPaidInvoices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gaat in Twinfield kijken of facturen betaald zijn. Als is dit moeten ze in Econobis ook op betaald';

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
        foreach (Administration::where('twinfield_is_valid')->where('uses_twinfield')->get() as $administration) {
            $twinfieldInvoiceHelper = new TwinfieldInvoiceHelper($administration);
            $twinfieldInvoiceHelper->processPaidInvoices();
        }

        Log::info('Betaalde Twinfield facturen in Econobis bijgewerkt.');
    }
}
