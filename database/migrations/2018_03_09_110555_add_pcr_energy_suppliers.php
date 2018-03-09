<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPcrEnergySuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('energy_suppliers', function (Blueprint $table) {
            $table->boolean('does_postal_code_links')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('energy_suppliers', function (Blueprint $table) {
            $table->dropColumn('does_postal_code_links');
        });
    }
}
