<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRevenueDeliveredKwhPeriodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_revenue_delivered_kwh_period', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('distribution_id');
            $table->foreign('distribution_id')
                ->references('id')->on('project_revenue_distribution')
                ->onDelete('restrict');

            $table->unsignedInteger('revenue_id');
            $table->foreign('revenue_id')
                ->references('id')->on('project_revenues')
                ->onDelete('restrict');

            $table->date('date_begin')->nullable();
            $table->date('date_end')->nullable();
            $table->integer('days_of_period')->nullable();
            $table->integer('participations_quantity')->nullable();
            $table->double('delivered_kwh', 8, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_revenue_delivered_kwh_period');
    }
}
