<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
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

    }


}

