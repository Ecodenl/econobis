<?php

namespace App\Console\Commands;

use App\Eco\Administration\Administration;
use App\Eco\Schedule\CommandRun;
use App\Eco\User\User;
use App\Helpers\Twinfield\TwinfieldInvoicePaymentHelper;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
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
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $adminUser = User::where('email', config('app.admin_user.email'))->first();
        if($adminUser){
            Auth::setUser($adminUser);
        }

        foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {
            $twinfieldInvoicePaymentHelper = new TwinfieldInvoicePaymentHelper($administration, null, null);
            $twinfieldInvoicePaymentHelper->processTwinfieldInvoicePayment();
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Betaalde Twinfield nota's in Econobis bijgewerkt.");
    }
}
