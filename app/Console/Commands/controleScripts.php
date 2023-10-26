<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

class controleScripts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:controleScripts';

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

        Artisan::call('revenue:checkMissingEnergySuppliersInAddress');
        Artisan::call('revenue:checkWrongDistributionParts');
        Artisan::call('revenue:checkWrongEnergySupplierDataInParts');
        Artisan::call('revenue:checkMissingEnergySupplierDataInParts');
        Artisan::call('revenue:checkWrongRevenueDistributionKwhStatus');
        Artisan::call('revenue:checkWrongRevenueDistributionPartsKwhIndicatorFields');
        Artisan::call('revenue:checkMissingRevenueDistributionParts');
        Artisan::call('addressEnergySupplier:checkOverlappingEnergySuppliers');
        Artisan::call('participants:checkFirstStartingDate');
        Artisan::call('participants:checkTerminationDate');
//        Artisan::call('project:checkWrongProjectDataForLastProjectRevenue');

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

    }


}

