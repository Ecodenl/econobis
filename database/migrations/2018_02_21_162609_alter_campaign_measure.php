<?php

use Illuminate\Support\Facades\DB;
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
        DB::table('campaign_measure')->truncate();

        Schema::table('campaign_measure', function (Blueprint $table) {
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
        DB::table('campaign_measure_category')->truncate();

        Schema::rename('campaign_measure_category', 'campaign_measure');

        Schema::table('campaign_measure', function (Blueprint $table) {
            $table->drop(['measure_category_id']);
            $table->renameColumn('measure_category_id', 'measure_id');
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');
        });
    }
}
