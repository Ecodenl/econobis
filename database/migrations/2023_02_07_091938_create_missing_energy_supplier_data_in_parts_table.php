<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissingEnergySupplierDataInPartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_missing_energy_supplier_data_in_parts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('revenue_id');
            $table->date('revenue_date_begin')->nullable();
            $table->date('revenue_date_end')->nullable();
            $table->unsignedInteger('parts_id');
            $table->date('part_date_begin')->nullable();
            $table->date('part_date_end')->nullable();
            $table->unsignedInteger('distribution_id');
            $table->unsignedInteger('participation_id');
            $table->date('participation_date_terminated')->nullable();
            $table->unsignedInteger('address_supplier_energy_id')->nullable();
            $table->date('address_supplier_energy_member_since')->nullable();
            $table->date('address_supplier_energy_end_date')->nullable();
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
        Schema::dropIfExists('_missing_energy_supplier_data_in_parts');
    }
}
