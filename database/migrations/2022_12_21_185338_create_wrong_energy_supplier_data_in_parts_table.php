<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWrongEnergySupplierDataInPartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_wrong_energy_supplier_data_in_parts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('revenue_id');
            $table->date('revenue_date_begin')->nullable();
            $table->date('revenue_date_end')->nullable();
            $table->unsignedInteger('parts_id');
            $table->date('part_date_begin')->nullable();
            $table->date('part_date_end')->nullable();
            $table->unsignedInteger('distribution_parts_id');
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
        Schema::dropIfExists('_wrong_energy_supplier_data_in_parts');
    }
}
