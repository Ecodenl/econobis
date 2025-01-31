<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_dongle_read_out_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedInteger('order');
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        DB::table('address_dongle_read_out_types')->insert([
                ['name' => 'Onbekend', 'order' => 1, 'is_active' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
                ['name' => 'P1', 'order' => 2, 'is_active' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
                ['name' => 'P4', 'order' => 3, 'is_active' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
            ]
        );

        Schema::create('address_dongle_types', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('type_read_out_id');
            $table->foreign('type_read_out_id')->references('id')->on('address_dongle_read_out_types');

            $table->string('name');
            $table->unsignedInteger('order');
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        DB::table('address_dongle_types')->insert([
                ['type_read_out_id'=> 2, 'name' => 'Smartstuff type A', 'order' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
                ['type_read_out_id'=> 2, 'name' => 'Smartstuff type B', 'order' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
                ['type_read_out_id'=> 2, 'name' => 'Ander merk', 'order' => 3, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
            ]
        );

        Schema::create('address_dongles', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('address_id');
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->unsignedInteger('type_read_out_id');
            $table->foreign('type_read_out_id')->references('id')->on('address_dongle_read_out_types');

            $table->string('mac_number')->nullable(); #TODO in de documentatie staat number, maar een mac adres kan ook andere karakters dan nummers hebben volgens mij?

            $table->unsignedInteger('type_dongle_id')->nullable();
            $table->foreign('type_dongle_id')->references('id')->on('address_dongle_types');

            $table->integer('energy_id')->nullable();
            $table->date('date_signed')->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')->references('id')->on('users');

            $table->unsignedInteger('updated_by_id');
            $table->foreign('updated_by_id')->references('id')->on('users');

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
        Schema::dropIfExists('address_dongles');
        Schema::dropIfExists('address_dongle_types');
        Schema::dropIfExists('address_dongle_read_out_types');
    }
};
