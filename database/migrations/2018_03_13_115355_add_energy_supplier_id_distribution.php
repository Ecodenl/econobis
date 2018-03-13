<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEnergySupplierIdDistribution extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('production_project_revenue_distribution', function (Blueprint $table) {
            $table->unsignedInteger('es_id')->nullable();
            $table->foreign('es_id')
                ->references('id')->on('energy_suppliers')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('production_project_revenue_distribution', function (Blueprint $table) {
            $table->dropForeign(['es_id']);
            $table->dropColumn('es_id');
        });
    }
}
