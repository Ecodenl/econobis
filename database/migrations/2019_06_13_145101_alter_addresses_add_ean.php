<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterAddressesAddEan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->string('ean_electricity')->nullable();
            $table->string('ean_gas')->nullable();
        });

        $contactEnergySuppliers = \App\Eco\EnergySupplier\ContactEnergySupplier::where('is_current_supplier', 1)
            ->where(function ($query) {
                $query->where('ean_electricity', '!=', '')->orWhere('ean_gas', '!=', '');
            })
            ->get();

        foreach($contactEnergySuppliers as $contactEnergySupplier) {
            $primaryAddress = $contactEnergySupplier->contact->primaryAddress;

            if($primaryAddress) {
                $primaryAddress->ean_electricity = $contactEnergySupplier->ean_electricity;
                $primaryAddress->ean_gas = $contactEnergySupplier->ean_gas;
                $primaryAddress->save();
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
        //
    }
}