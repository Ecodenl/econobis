<?php

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ConversionEnergySupplier33To54 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Log::info('Omzetten AddressEnergySupplier 33 Holthausen Clean Energy naar AddressEnergySupplier 54 Clean Energy');

        Schema::dropIfExists('xxx_contact_energy_supplier');

//        $addressEnergySuppliers = AddressEnergySupplier::where('energy_supplier_id', 33)->get();
        $addressEnergySuppliers = DB::table('address_energy_suppliers')->where('energy_supplier_id', 33)->get();
        foreach ($addressEnergySuppliers as $addressEnergySupplier){
            $addressEnergySupplier->energy_supplier_id = 54;
            $addressEnergySupplier->save();
            Log::info('addressEnergySupplier ' . $addressEnergySupplier->id . ' omgezet');
        }
        $projectRevenueDistributions = ProjectRevenueDistribution::where('es_id', 33)->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution){
            $projectRevenueDistribution->es_id = 54;
            if($projectRevenueDistribution->energy_supplier_name == 'Holthausen Clean Energy (HCE)' ){
                $projectRevenueDistribution->energy_supplier_name = 'Clean Energy';
            } else {
                Log::error('Naam projectRevenueDistribution ' . $projectRevenueDistribution->id . ' NIET gewijzigd');
            }
            $projectRevenueDistribution->save();
            Log::info('projectRevenueDistribution ' . $projectRevenueDistribution->id . ' omgezet');
        }
        $revenueDistributionPartsKwhs = RevenueDistributionPartsKwh::where('es_id', 33)->get();
        foreach ($revenueDistributionPartsKwhs as $revenueDistributionPartsKwh){
            $revenueDistributionPartsKwh->es_id = 54;
            if($revenueDistributionPartsKwh->energy_supplier_name == 'Holthausen Clean Energy (HCE)' ){
                $revenueDistributionPartsKwh->energy_supplier_name = 'Clean Energy';
            } else {
                Log::error('Naam revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' NIET gewijzigd');
            }
            $revenueDistributionPartsKwh->save();
            Log::info('revenueDistributionPartsKwh ' . $revenueDistributionPartsKwh->id . ' omgezet');
        }

        $energySupplier33 = EnergySupplier::find(33);
        $energySupplier33->delete();

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
