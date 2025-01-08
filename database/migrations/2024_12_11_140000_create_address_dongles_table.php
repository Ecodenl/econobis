<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('address_dongles', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('address_id');
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->integer('type_read_out'); #TODO hoe wil je de verschillende types bijhouden, tabel lijkt mij wat overbodig?
            $table->string('mac_number')->nullable(); #TODO in de documentatie staat number, maar een mac adres kan ook andere karakters dan nummers hebben volgens mij?
            $table->integer('type_dongle'); #TODO hoe wil je de verschillende types bijhouden, tabel lijkt mij wat overbodig?
            $table->integer('energie_id');
            $table->dateTime('date_signed');
            $table->dateTime('date_start');
            $table->dateTime('date_end');

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
    }
};
