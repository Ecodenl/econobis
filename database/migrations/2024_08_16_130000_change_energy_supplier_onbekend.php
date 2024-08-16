<?php

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
        DB::table('energy_suppliers')
            ->where('name', 'Onbekend')
            ->update(['name' => 'Onbekend/n.v.t.']);    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('energy_suppliers')
            ->where('name', 'Onbekend/n.v.t.')
            ->update(['name' => 'Onbekend']);
    }
}
