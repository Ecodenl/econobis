<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ContactEnergySupplier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('energy_suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('contact_energy_supply_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $contact_energy_supply_statusses = [
            'Geïntresseerd',
            'Geen interesse',
            'Stapt over',
            'Overgestapt'
        ];

        foreach (
            $contact_energy_supply_statusses as $contact_energy_supply_status
        ) {
            DB::table('contact_energy_supply_status')->insert([
                    'name' => $contact_energy_supply_status
                ]
            );
        }

        Schema::create('contact_energy_supplier', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->unsignedInteger('energy_supplier_id');
            $table->foreign('energy_supplier_id')
                ->references('id')->on('energy_suppliers')
                ->onDelete('restrict');

            $table->string('type')->nullable();
            $table->date('member_since')->nullable();
            $table->string('ean_electricity')->nullable();
            $table->string('ean_gas')->nullable();

            $table->unsignedInteger('contact_energy_supply_status_id')->nullable();
            $table->foreign('contact_energy_supply_status_id')
                ->references('id')->on('contact_energy_supply_status')
                ->onDelete('restrict');

            $table->date('switch_date')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

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
        Schema::dropIfExists('energy_suppliers');
        Schema::dropIfExists('contact_energy_supplier');
        Schema::dropIfExists('contact_energy_supply_status');
    }
}
