<?php

namespace App\Console\Commands\OneTimeChecks;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class recoverWrongDistributionParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'onetimecheck:recoverWrongDistributionParts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recover wrong distribution parts';

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

        Log::info('Recover wrong distribution parts');
        Log::info('-----------------------------');
        Log::info('nog niet gebruiken op deze manier');

////        Loop door tabel _wrong_distribution_parts_data.
//        $wrongDistributionPartsDistributions = DB::table('_wrong_distribution_parts_data')->pluck('distribution_id')->toArray();
//        $wrongDistributionPartsDistributionIds = array_unique($wrongDistributionPartsDistributions);
//        foreach ($wrongDistributionPartsDistributionIds as $wrongDistributionPartsDistributionId) {
//
//            $distributionKwh = RevenueDistributionKwh::find($wrongDistributionPartsDistributionId);
//            if ($distributionKwh && in_array($distributionKwh->status, ['concept', 'confirmed'])) {
//
//                if ($distributionKwh->participation->address_id) {
//                    $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
//                    foreach ($distributionPartsKwh as $distributionPartKwh) {
//                        if ($distributionPartKwh->es_id == null) {
//                            Log::info('Wijzigen distributionPartKwh: ' . $distributionPartKwh->id . ' - Revenue: ' . $distributionPartKwh->revenue_id . ' - Distr.: ' . $distributionKwh->id . ' - Adres: ' . $distributionKwh->participation->address_id);
//                            $addressEnergySupplier = $this->getAddressEnergySupplierInAPeriod($distributionKwh->participation->address_id, $distributionPartKwh->partsKwh->date_begin, $distributionPartKwh->partsKwh->date_end);
//                            if($addressEnergySupplier){
//                                Log::info('  energy wordt :  ' . $addressEnergySupplier->energySupplier->id . ' - ' . $addressEnergySupplier->energySupplier->name . ' - ' . $addressEnergySupplier->es_number);
//                                // Aanpassen: es_id, es_number en energysupplier name.
//                            $distributionPartKwh->es_id = $addressEnergySupplier->energySupplier->id;
//                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
//                            $distributionPartKwh->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
//                            $distributionPartKwh->save();
//
//                            }
//                        }
//                    }
//                }
//            }
//
//        }
//
////        Loop door tabel _wrong_distribution_parts_data.
//        $wrongDistributionParts = DB::table('_wrong_distribution_parts_data')->pluck('part_id')->toArray();
//        $wrongDistributionPartsIds = array_unique($wrongDistributionParts);
//        foreach ($wrongDistributionPartsIds as $wrongDistributionPartsId) {
//
//            $distributionPartKwh = RevenueDistributionPartsKwh::find($wrongDistributionPartsId);
//            if ($distributionPartKwh && $distributionPartKwh->status == 'processed') {
//                Log::info('Set distributionPartKwh ' . $distributionPartKwh->id . ' van processed op confirmed');
//
//                $distributionValuesKwh = $distributionPartKwh->distributionKwh->distributionValuesKwh->where('parts_id', $distributionPartKwh->parts_id)->where('status', 'processed');
//                foreach ($distributionValuesKwh as $distributionValueKwh){
//                    Log::info('Set $distributionValueKwh ' . $distributionPartKwh->id . '/' . $distributionValueKwh->id . ' van processed op confirmed');
//                    $distributionValueKwh->status = 'confirmed';
//                    $distributionValueKwh->save();
//                }
//                $distributionPartKwh->date_energy_supplier_report = null;
//                $distributionPartKwh->status = 'confirmed';
//                $distributionPartKwh->save();
//            }
//
//        }
//
////        Loop door tabel _wrong_distribution_parts_data.
//        $wrongDistributionPartsRevenues = DB::table('_wrong_distribution_parts_data')->pluck('revenue_id')->toArray();
//        $wrongDistributionPartsRevenuesIds = array_unique($wrongDistributionPartsRevenues);
//        foreach ($wrongDistributionPartsRevenuesIds as $wrongDistributionPartsRevenuesId) {
//            $revenuesKwh = RevenuesKwh::find($wrongDistributionPartsRevenuesId);
//            foreach ($revenuesKwh->partsKwh as $partsKwh) {
//                Log::info('runCountingsRevenuesKwh ' . $wrongDistributionPartsRevenuesId . '/' . $partsKwh->id);
//                $partsKwh->calculator()->runCountingsRevenuesKwh();
//            }
//        }

    }

    private function getAddressEnergySupplierInAPeriod($addressid, $dateBegin, $dateEnd)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $addressid)
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
    }}
