<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class ProductionProjectChangeKwh extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('production_projects', function($t) {
            $t->renameColumn('power_kwh_available', 'power_kw_available');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('production_projects', function($t) {
            $t->renameColumn('power_kw_available', 'power_kwh_available');
        });
    }
}
