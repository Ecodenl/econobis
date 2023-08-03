<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeForeignKeyOpportunityStatusMeasureCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('measure_categories', function (Blueprint $table) {
            $table->dropForeign('measure_categories_opportunity_status_id_wf_cqr_foreign');
            $table->foreign('opportunity_status_id_wf_create_opportunity', 'measure_categories_opportunity_status_id_wf_cqr_foreign')
                ->references('id')->on('opportunity_status')
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
        Schema::table('measure_categories', function (Blueprint $table) {
            $table->dropForeign('measure_categories_opportunity_status_id_wf_cqr_foreign');
            $table->foreign('opportunity_status_id_wf_create_opportunity', 'measure_categories_opportunity_status_id_wf_cqr_foreign')
                ->references('id')->on('measures')
                ->onDelete('restrict');
        });
    }
}
