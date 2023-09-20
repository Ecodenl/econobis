<?php

namespace App\Console\Commands\RecoverScripts;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenuesKwh;
use Illuminate\Console\Command;

class recoverWrongEnergySupplierDataInParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recover:recoverWrongEnergySupplierDataInParts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recover wrong energy supplier data in parts';

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

//        Log::info($this->description);
//        Log::info('-----------------------------');

        $revenuesKwh = RevenuesKwh::all();
        foreach ($revenuesKwh as $revenueKwh) {
            // niet verwerkte parts controlleren
            $revenueDistributionPartsKwh = $revenueKwh->distributionPartsKwh
                ->where('status', '!=', 'processed');
            foreach ($revenueDistributionPartsKwh as $distributionPartKwh) {
                $address = $distributionPartKwh->distributionKwh->participation->address;
                if ($address) {
                    $addressEnergySupplier = $this->getAddressEnergySupplierInAPeriod($address->id, $distributionPartKwh->partsKwh->date_begin, $distributionPartKwh->partsKwh->date_end);
                    if (!$addressEnergySupplier) {
                        if ($distributionPartKwh->es_id != null
                            || ($distributionPartKwh->energy_supplier_name != null && $distributionPartKwh->energy_supplier_name != '')
                            || ($distributionPartKwh->energy_supplier_number != null  && $distributionPartKwh->energy_supplier_number != '')
                        ) {
                            $distributionPartKwh->energy_supplier_name = "";
                            $distributionPartKwh->energy_supplier_number = "";
                            $distributionPartKwh->es_id = null;
                            $distributionPartKwh->save();
                        }
                    } else {
                        if ($distributionPartKwh->es_id != $addressEnergySupplier->energy_supplier_id
                            || $distributionPartKwh->energy_supplier_number != $addressEnergySupplier->es_number
                            || $distributionPartKwh->energy_supplier_name != $addressEnergySupplier->energySupplier->name
                        ) {
                            $distributionPartKwh->es_id = $addressEnergySupplier->energy_supplier_id;
                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                            $distributionPartKwh->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
                            $distributionPartKwh->save();
                        }
                    }
                }
            }
        }
    }

    private function getAddressEnergySupplierInAPeriod($addressid, $dateBegin, $dateEnd)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $addressid)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $dateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $dateBegin);
                    })
                    ->orWhereNull('end_date');
            })->first();
        return $addressEnergySupplier;
    }

}
