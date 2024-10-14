<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCampaignIdToHousingFileSpecifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_file_specifications', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id')->after('housing_file_id')->nullable();
            $table->foreign('campaign_id')
                ->references('id')->on('campaigns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('housing_file_specifications', function (Blueprint $table) {
            $table->dropForeign(['campaign_id']);
            $table->dropColumn('campaign_id');
        });
    }
}
