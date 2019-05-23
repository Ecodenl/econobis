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
        DB::table('production_project_revenue_category')
            ->where('id', 1)
            ->update(['name' => 'Opbrengst kWh']);

        DB::table('production_project_revenue_category')
            ->where('id', 2)
            ->update(['name' => 'Opbrengst euro']);

        Schema::table('production_project_revenue_distribution', function (Blueprint $table) {
            $table->string('energy_supplier_ean_electricity')->nullable();
            $table->string('energy_supplier_number')->nullable();
            $table->double('payout_kwh')->nullable();
        });

        Schema::table('production_project_revenues', function (Blueprint $table) {
            $table->double('payout_kwh')->nullable();
        });

        DB::table('production_project_revenue_type')->insert([
            ['name' => 'Aflossing'],
            ['name' => 'Rente en aflossing']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('production_project_revenue_category')
            ->where('id', 1)
            ->update(['name' => 'Uitkering']);

        DB::table('production_project_revenue_category')
            ->where('id', 2)
            ->update(['name' => 'Opbrengst']);

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
