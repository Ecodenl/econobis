<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMarginFeeToAddressEnergySuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('address_energy_suppliers', function (Blueprint $table) {
            $table->double('margin_fee', 8, 2)->nullable()->after('es_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('address_energy_suppliers', function (Blueprint $table) {
            $table->dropColumn('margin_fee');
        });
    }
}
