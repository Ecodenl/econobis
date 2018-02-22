<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCampaignMeasure extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaign_measure', function (Blueprint $table) {
            $table->dropForeign('measure_id');
            $table->renameColumn('measure_id', 'measure_category_id');
            $table->foreign('measure_category_id')
                ->references('id')->on('measure_categories')
                ->onDelete('restrict');
        });

        Schema::rename('campaign_measure', 'campaign_measure_category');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('campaign_measure_category', 'campaign_measure');

        Schema::table('campaign_measure', function (Blueprint $table) {
            $table->renameColumn('measure_category_id', 'measure_id');
        });
    }
}
