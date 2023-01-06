<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaignProjectManagerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaign_project_manager', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('contact_id');
            $table->timestamps();
            $table->primary(['campaign_id', 'contact_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campaign_project_manager');
    }
}
