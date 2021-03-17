<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMarch2021EnergySuppliersDoesPcr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('energy_suppliers')
            ->where('name', 'Engie')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Easyenergy')
            ->update(['does_postal_code_links' => 1]);
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
