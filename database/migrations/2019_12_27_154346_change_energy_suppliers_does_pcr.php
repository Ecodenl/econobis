<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeEnergySuppliersDoesPcr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('energy_suppliers')
            ->where('name', 'Energiedirect')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'E.on')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Essent')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Main energie')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'NL Energie')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Vattenfall')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Pure energy')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Qurrent')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Oxxio')
            ->update(['does_postal_code_links' => 1]);
        DB::table('energy_suppliers')
            ->where('name', 'Vandebron')
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
