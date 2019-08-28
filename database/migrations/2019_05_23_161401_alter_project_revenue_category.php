<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProjectRevenueCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_category', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
        });

        DB::table('project_revenue_category')
            ->where('name', 'Opbrengst kWh')
            ->update(['code_ref' => 'revenueKwh']);

        DB::table('project_revenue_category')
            ->where('name', 'Opbrengst euro')
            ->update(['code_ref' => 'revenueEuro']);

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