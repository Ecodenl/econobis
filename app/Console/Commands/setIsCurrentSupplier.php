<?php

namespace App\Console\Commands;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Schedule\CommandRun;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class setIsCurrentSupplier extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'addressEnergySupplier:setIsCurrentSupplier';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Bepaal of energieleveranciers huidig zijn geworden';

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

        $addressEnergySupplierController = new AddressEnergySupplierController();

        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach ($addressEnergySuppliers as $addressEnergySupplier){
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info('Procedure of energieleveranciers huidig zijn geworden klaar');
    }
}
