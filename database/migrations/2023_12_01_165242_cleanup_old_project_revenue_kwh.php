<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $projectRevenues = DB::table('project_revenues')->whereIn('category_id', [1, 4])->get();
        foreach ($projectRevenues as $projectRevenue) {
            $projectRevenueDistributions = DB::table('project_revenue_distribution')->where('revenue_id', $projectRevenue->id)->get();
            foreach ($projectRevenueDistributions as $projectRevenueDistribution) {
                DB::table('project_revenue_delivered_kwh_period')->where('distribution_id', $projectRevenueDistribution->id)->delete();
                DB::table('project_revenue_distribution')->where('id', $projectRevenueDistribution->id)->delete();
            }
            DB::table('project_revenue_distribution')->where('revenue_id', $projectRevenue->id)->delete();
            DB::table('project_revenues')->where('id', $projectRevenue->id)->delete();
        }

        Schema::table('project_revenue_delivered_kwh_period', function (Blueprint $table) {
            $table->dropForeign(['distribution_id']);
            $table->dropForeign(['revenue_id']);
        });

        Schema::rename('project_revenue_delivered_kwh_period', 'xxxx_project_revenue_delivered_kwh_period');

        DB::table('project_revenue_category')->insert([
                [
                    'name' => 'Opbrengst deelnemer',
                    'code_ref' => 'revenueParticipant'
                ],
            ]
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('project_revenue_category')
            ->where('code_ref', 'revenueParticipant')
            ->delete();

        Schema::rename('xxxx_project_revenue_delivered_kwh_period', 'project_revenue_delivered_kwh_period');

        Schema::table('project_revenue_delivered_kwh_period', function (Blueprint $table) {
            $table->foreign('distribution_id')
                ->references('id')->on('project_revenue_distribution')
                ->onDelete('restrict');

            $table->foreign('revenue_id')
                ->references('id')->on('project_revenues')
                ->onDelete('restrict');
        });

    }
};
