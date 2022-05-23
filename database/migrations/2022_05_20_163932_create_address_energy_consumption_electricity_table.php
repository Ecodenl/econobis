<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressEnergyConsumptionElectricityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_energy_consumption_electricity', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('address_id');
            $table->foreign('address_id', 'address_ece_address_id_foreign')
                ->references('id')->on('addresses')
                ->onDelete('restrict');
            $table->date('date_begin')->nullable();
            $table->date('date_end')->nullable();
            $table->double('consumption_high', 10, 0)->nullable();
            $table->double('consumption_low', 10, 0)->nullable();
            $table->double('return_high', 10, 0)->nullable();
            $table->double('return_low', 10, 0)->nullable();
            $table->double('proposed_variable_rate_high', 11, 2)->nullable();
            $table->double('proposed_variable_rate_low', 11, 2)->nullable();
            $table->double('proposed_fixed_rate_high', 11, 2)->nullable();
            $table->double('proposed_fixed_rate_low', 11, 2)->nullable();
            $table->double('total_variable_costs_high', 11, 2)->nullable();
            $table->double('total_variable_costs_low', 11, 2)->nullable();
            $table->double('total_fixed_costs_high', 11, 2)->nullable();
            $table->double('total_fixed_costs_low', 11, 2)->nullable();

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
        Schema::dropIfExists('address_energy_consumption_electricity');
    }
}
