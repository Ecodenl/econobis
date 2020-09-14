<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangesEnergySuppliersSeptember2020 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // UPDATE contact_energy_supplier SET energy_supplier_id = 12 WHERE contact_energy_supplier.energy_supplier_id = 11
        // UPDATE project_revenue_distribution SET energy_supplier_id = 12 WHERE project_revenue_distribution.energy_supplier_id = 11
        // UPDATE contact_energy_supplier SET energy_supplier_id = 19 WHERE contact_energy_supplier.energy_supplier_id = 29
        // UPDATE project_revenue_distribution SET energy_supplier_id = 19 WHERE project_revenue_distribution.energy_supplier_id = 29

        $contactEnergySuppliers = \App\Eco\EnergySupplier\ContactEnergySupplier::where('energy_supplier_id', 11)->get();
        foreach ($contactEnergySuppliers as $contactEnergySupplier){
            $contactEnergySupplier->energy_supplier_id = 12;
            $contactEnergySupplier->save();
        }
        $projectRevenueDistributions = \App\Eco\Project\ProjectRevenueDistribution::withTrashed()->where('es_id', 11)->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution){
            $projectRevenueDistribution->es_id = 12;
            $projectRevenueDistribution->save();
        }

        $contactEnergySuppliers = \App\Eco\EnergySupplier\ContactEnergySupplier::where('energy_supplier_id', 29)->get();
        foreach ($contactEnergySuppliers as $contactEnergySupplier){
            $contactEnergySupplier->energy_supplier_id = 19;
            $contactEnergySupplier->save();
        }
        $projectRevenueDistributions = \App\Eco\Project\ProjectRevenueDistribution::withTrashed()->where('es_id', 29)->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution){
            $projectRevenueDistribution->es_id = 19;
            $projectRevenueDistribution->save();
        }

        $es = EnergySupplier::where('id', 11)->first();
        $es->delete();

        $es = EnergySupplier::where('id', 29)->first();
        $es->delete();
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
