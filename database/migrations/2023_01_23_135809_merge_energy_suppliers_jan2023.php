<?php

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class MergeEnergySuppliersJan2023 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->doMergeEnergySupplier('2022-12-31', 16, 'Qurrent', 8, 'Greenchoice');
        $this->doMergeEnergySupplier('2022-12-31', 27, 'Anode Energie', 56, 'Gezinsenergie');
        $this->doMergeEnergySupplier('2022-12-31', 35, 'Fenor energie', 2, 'Budget Energie');

//        die('stop');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }

    /**
     * @param int $energySupplierIdMergeFrom
     * @param string $energySupplierNameMergeFrom
     * @param int $energySupplierIdMergeTo
     * @param string $energySupplierNameMergeTo
     */
    private function doMergeEnergySupplier(string $energySupplierEndDateMergeFrom, int $energySupplierIdMergeFrom, string $energySupplierNameMergeFrom, int $energySupplierIdMergeTo, string $energySupplierNameMergeTo): void
    {
        Log::info('AddressEnergySupplier ' . $energySupplierIdMergeFrom . ' (' . $energySupplierNameMergeFrom . ') -> AddressEnergySupplier ' . $energySupplierIdMergeTo . ' (' . $energySupplierNameMergeTo . ').');

        $addressEnergySuppliers = DB::table('address_energy_suppliers')->where('energy_supplier_id', $energySupplierIdMergeFrom)->get();
        foreach ($addressEnergySuppliers as $addressEnergySupplier) {
            DB::table('address_energy_suppliers')->where('id', $addressEnergySupplier->id)
                ->update(['energy_supplier_id' => $energySupplierIdMergeTo]);
            Log::info('addressEnergySupplier ' . $addressEnergySupplier->id . ' omgezet');
        }
        $revenueDistributionPartsKwhs = RevenueDistributionPartsKwh::where('es_id', $energySupplierIdMergeFrom)->where('status', '!=', 'processed')->get();
        foreach ($revenueDistributionPartsKwhs as $revenueDistributionPartsKwh) {
            $revenueDistributionPartsKwh->es_id = $energySupplierIdMergeTo;
            if ($revenueDistributionPartsKwh->energy_supplier_name == $energySupplierNameMergeFrom) {
                $revenueDistributionPartsKwh->energy_supplier_name = $energySupplierNameMergeTo;
            } else {
                Log::error('Naam revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' NIET gewijzigd');
            }
            $revenueDistributionPartsKwh->save();
            Log::info('revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' omgezet');
        }
//
        $energySupplierMergeFrom = EnergySupplier::find($energySupplierIdMergeFrom);
        $energySupplierMergeFrom->end_date = $energySupplierEndDateMergeFrom;
        $energySupplierMergeFrom->save();
        Log::info('EnergySupplier ' . $energySupplierMergeFrom->name . ' beeindigd op: ' . \Carbon\Carbon::parse($energySupplierMergeFrom->end_date)->format('d-m-Y') );
    }
}
