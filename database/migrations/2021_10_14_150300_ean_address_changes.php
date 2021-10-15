<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EanAddressChanges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_ean_numbers', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('address_id');
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->date('ean_since')->nullable();

            $table->unsignedInteger('energy_supply_status_id')->nullable();
            $table->foreign('energy_supply_status_id')
                ->references('id')->on('contact_energy_supply_status')
                ->onDelete('restrict');

            $table->string('ean_electricity')->nullable();
            $table->string('ean_gas')->nullable();

            $table->timestamps();

            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('update_by_id')->nullable();
            $table->foreign('update_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
        });

        Schema::create('address_ean_energy_suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('address_ean_number_id');
            $table->foreign('address_ean_number_id', 'address_ean_es_address_ean_number_id_foreign')
                ->references('id')->on('address_ean_numbers')
                ->onDelete('restrict');

            $table->unsignedInteger('energy_supplier_id');
            $table->foreign('energy_supplier_id')
                ->references('id')->on('energy_suppliers')
                ->onDelete('restrict');
            $table->date('member_since')->nullable();

            $table->unsignedInteger('energy_supply_status_id')->nullable();
            $table->foreign('energy_supply_status_id', 'address_ean_es_energy_supply_status_id_foreign')
                ->references('id')->on('contact_energy_supply_status')
                ->onDelete('restrict');

            $table->date('switch_date')->nullable();

            $table->boolean('is_current_supplier')->default(false);
            $table->string('es_number')->nullable();

            $table->timestamps();

            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('update_by_id')->nullable();
            $table->foreign('update_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
        });

        Schema::table('participation_project', function (Blueprint $table) {
            $table->unsignedInteger('address_ean_number_id')->nullable()->after('project_id');
            $table->foreign('address_ean_number_id')
                ->references('id')->on('address_ean_numbers')
                ->onDelete('restrict');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('participation_project', 'address_ean_number_id'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropForeign('participation_project_address_ean_number_id_foreign');
                $table->dropColumn('address_ean_number_id');
            });
        }
        Schema::dropIfExists('address_ean_energy_suppliers');
        Schema::dropIfExists('address_ean_numbers');
    }
}
