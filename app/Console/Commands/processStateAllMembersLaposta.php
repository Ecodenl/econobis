<?php

namespace App\Console\Commands;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Schedule\CommandRun;
use App\Eco\User\User;
use App\Helpers\Laposta\LapostaHelper;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class processStateAllMembersLaposta extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laposta:processStateAllMembersLaposta';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "State alle relaties uit Laposta ophalen en deze bijwerken bij contactgroep contacten.";

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

        $cooperation = Cooperation::first();
        if($cooperation && $cooperation->use_laposta) {
            $lapostaHelper = new LapostaHelper();
            $lapostaHelper->processStateAllMembersLaposta();
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("State laposta relaties in Econobis contacten bijgewerkt.");
    }
}
