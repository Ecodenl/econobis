<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateXxxConversion2021OzonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('xxx_conversion2021_ozon', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cooperatie');
            $table->unsignedInteger('ozon_project_id');
            $table->string('ozon_project_naam');
            $table->float('levering_laag', 14, 6)->nullable();
            $table->float('levering_hoog', 14, 6)->nullable();
            $table->float('levering_totaal', 14, 6)->nullable();
            $table->unsignedInteger('econobis_project_id');
            $table->unsignedInteger('econobis_2021_revenue_id');
            $table->float('original_econobis_2021_revenue_total_processed', 14, 6)->nullable();
            $table->date('original_date_interest_bearing_kwh')->nullable()->default(null);
            $table->integer('original_kwh_start_high_next_revenue')->nullable()->default(null);
            $table->integer('original_kwh_start_low_next_revenue')->nullable()->default(null);
            $table->integer('new_kwh_start_high_next_revenue')->nullable()->default(null);
            $table->integer('new_kwh_start_low_next_revenue')->nullable()->default(null);
            $table->boolean('done')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('xxx_conversion2021_ozon');
    }
}
