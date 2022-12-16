<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatewrongDistributionPartsDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_wrong_distribution_parts_data', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('revenue_id');
            $table->date('revenue_date_begin')->nullable();
            $table->date('revenue_date_end')->nullable();
            $table->unsignedInteger('part_id');
            $table->unsignedInteger('distribution_id');
            $table->date('part_date_begin')->nullable();
            $table->date('part_date_end')->nullable();
            $table->text('previous_parts_ids_not_processed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_wrong_distribution_parts_data');
    }
}
