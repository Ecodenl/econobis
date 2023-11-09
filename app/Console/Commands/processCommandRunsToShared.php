<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use App\EcoShared\SharedCommandRun\SharedCommandRun;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class processCommandRunsToShared extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'shared:processCommandRunsToShared';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Synchroniseer command runs naar shared database.";

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
        // delete all local records that are already created in shared
//        CommandRun::where('created_in_shared', true)->delete();

        // create all local records that are not created yet in shared
        foreach (CommandRun::where('created_in_shared', false)->get() as $commandRun) {
            SharedCommandRun::create([
                'local_id' => $commandRun->id,
                'app_cooperation_name' => $commandRun->app_cooperation_name,
                'schedule_run_id' => $commandRun->schedule_run_id,
                'scheduled_commands_command_ref' => $commandRun->scheduled_commands_command_ref,
                'start_at' => $commandRun->start_at,
                'end_at' => $commandRun->end_at,
                'finished' => $commandRun->finished,
            ]);

            $commandRun->created_in_shared = true;
            $commandRun->save();
        }
        Log::info("Command runs naar shared database bijgewerkt.");
    }
}
