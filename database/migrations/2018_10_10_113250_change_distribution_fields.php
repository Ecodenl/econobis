<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDistributionFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $rc = \App\Eco\ProductionProject\ProductionProjectRevenueCategory::find(1);
        $rc->name = 'Opbrengst kWh';
        $rc->save();

        $rc = \App\Eco\ProductionProject\ProductionProjectRevenueCategory::find(2);
        $rc->name = 'Opbrengst euro';
        $rc->save();

        Schema::table('production_project_revenue_distribution', function (Blueprint $table) {
            $table->string('energy_supplier_ean_electricity')->nullable();
            $table->string('energy_supplier_number')->nullable();
            $table->double('payout_kwh')->nullable();
        });

        Schema::table('production_project_revenues', function (Blueprint $table) {
            $table->double('payout_kwh')->nullable();
        });

        $rt = new \App\Eco\ProductionProject\ProductionProjectRevenueType();
        $rt->name = 'Aflossing';
        $rt->save();

        $rt = new \App\Eco\ProductionProject\ProductionProjectRevenueType();
        $rt->name = 'Rente en aflossing';
        $rt->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $rc = \App\Eco\ProductionProject\ProductionProjectRevenueCategory::find(1);
        $rc->name = 'Uitkering';
        $rc->save();

        $rc = \App\Eco\ProductionProject\ProductionProjectRevenueCategory::find(2);
        $rc->name = 'Opbrengst';
        $rc->save();


        Schema::table('production_project_revenue_distribution', function (Blueprint $table) {
            $table->dropColumn('energy_supplier_ean_electricity');
            $table->dropColumn('energy_supplier_number');
            $table->dropColumn('payout_kwh');
        });

        Schema::table('production_project_revenues', function (Blueprint $table) {
            $table->dropColumn('payout_kwh');
        });
    }
}
