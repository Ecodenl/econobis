<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEndDateToEnergySuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('energy_suppliers', function (Blueprint $table) {
            $table->date('end_date')->nullable();
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
            //
        });
        if (Schema::hasColumn('energy_suppliers', 'end_date'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table) {
                $table->dropColumn('end_date');
            });
        }
    }
}
