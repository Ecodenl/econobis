<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
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
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $invoices = Invoice::all();

        foreach ($invoices as $invoice){
            $invoice->setDaysLastReminder();
            $invoice->save();
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info('Dagen laatste herinnering herberekend');
    }
}
