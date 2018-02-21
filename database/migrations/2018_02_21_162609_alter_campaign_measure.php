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
            $table->renameColumn('measure_id', 'measure_category_id');
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
