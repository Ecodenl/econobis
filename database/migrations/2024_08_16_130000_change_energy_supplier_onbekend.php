<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeEnergySupplierOnbekend extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//            DB::table('energy_suppliers')
//                ->where('name', 'Onbekend')
//                ->update(['name' => 'Onbekend/n.v.t.']);

        $supplierUnknown = EnergySupplier::where('name', 'Onbekend')->first();
        if($supplierUnknown){
            $supplierUnknown->name = 'Onbekend/n.v.t.';
            $supplierUnknown->saveQuietly();

            foreach ($supplierUnknown->distributionPartsKwh as $distributionPartsKwh){
                $distributionPartsKwh->energy_supplier_name = 'Onbekend/n.v.t.';
                $distributionPartsKwh->saveQuietly();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        DB::table('energy_suppliers')
//            ->where('name', 'Onbekend/n.v.t.')
//            ->update(['name' => 'Onbekend']);
        $supplierUnknown = EnergySupplier::where('name', 'Onbekend/n.v.t.')->first();
        if($supplierUnknown){
            $supplierUnknown->name = 'Onbekend';
            $supplierUnknown->saveQuietly();

            foreach ($supplierUnknown->distributionPartsKwh as $distributionPartsKwh){
                $distributionPartsKwh->energy_supplier_name = 'Onbekend';
                $distributionPartsKwh->saveQuietly();
            }
        }

    }
}
