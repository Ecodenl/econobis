<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWrongRevenueDistributionKwhStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_wrong_revenue_distribution_kwh_status', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('revenue_id');
            $table->date('revenue_date_begin')->nullable();
            $table->date('revenue_date_end')->nullable();
            $table->unsignedInteger('distribution_id');
            $table->text('comment');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_wrong_revenue_distribution_kwh_status');
    }
}
