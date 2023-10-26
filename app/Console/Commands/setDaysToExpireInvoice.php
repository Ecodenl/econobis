<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
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
    protected $description = 'Herberekend dagen verlopen betaaltermijn';

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
        $commandRun->save();

        $invoices = Invoice::all();

        foreach ($invoices as $invoice){
            $invoice->setDaysToExpire();
            $invoice->save();
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info('Dagen voor verlopen betaaltermijn herberekend');
    }
}
