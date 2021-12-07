<?php

namespace App\Console\Commands;

use App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class setIsCurrentSupplier extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:setIsCurrentSupplier';

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
        $addressEnergySupplierController = new AddressEnergySupplierController();

        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach ($addressEnergySuppliers as $addressEnergySupplier){
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }

        Log::info('Procedure of energieleveranciers huidig zijn geworden klaar');
    }
}
