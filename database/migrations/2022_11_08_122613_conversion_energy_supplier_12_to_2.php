<?php

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ConversionEnergySupplier12To2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Log::info('AddressEnergySupplier 12 (NL Energie) -> AddressEnergySupplier 2 (Budget Energie).');

        $addressEnergySuppliers = DB::table('address_energy_suppliers')->where('energy_supplier_id', 12)->get();
        foreach ($addressEnergySuppliers as $addressEnergySupplier){
//            $addressEnergySupplier->energy_supplier_id = 2;
//            $addressEnergySupplier->save();
            DB::table('address_energy_suppliers')->where('id', $addressEnergySupplier->id)
                ->update(['energy_supplier_id' => 2]);
            Log::info('addressEnergySupplier ' . $addressEnergySupplier->id . ' omgezet');
        }
        $projectRevenueDistributions = ProjectRevenueDistribution::where('es_id', 12)->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution){
            $projectRevenueDistribution->es_id = 2;
            if($projectRevenueDistribution->energy_supplier_name == 'NL Energie' ){
                $projectRevenueDistribution->energy_supplier_name = 'Budget Energie';
            } else {
                Log::error('Naam projectRevenueDistribution ' . $projectRevenueDistribution->id . ' NIET gewijzigd');
            }
            $projectRevenueDistribution->save();
            Log::info('projectRevenueDistribution ' . $projectRevenueDistribution->id . ' omgezet');
        }
        $revenueDistributionPartsKwhs = RevenueDistributionPartsKwh::where('es_id', 12)->get();
        foreach ($revenueDistributionPartsKwhs as $revenueDistributionPartsKwh){
            $revenueDistributionPartsKwh->es_id = 2;
            if($revenueDistributionPartsKwh->energy_supplier_name == 'NL Energie' ){
                $revenueDistributionPartsKwh->energy_supplier_name = 'Budget Energie';
            } else {
                Log::error('Naam revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' NIET gewijzigd');
            }
            $revenueDistributionPartsKwh->save();
            Log::info('revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' omgezet');
        }

        $energySupplier12 = EnergySupplier::find(12);
        $energySupplier12->delete();

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
}
