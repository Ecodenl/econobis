<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdministrationsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administrations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('administration_number')->nullable();
            $table->string('address')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();

            $table->string('country_id')->nullable()->default(null);
            $table->foreign('country_id')
                ->references('id')->on('countries')
                ->onDelete('restrict');

            $table->integer('kvk_number')->nullable();
            $table->string('btw_number');
            $table->text('IBAN');
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('bic')->nullable();
            $table->string('sepa_contract_name')->nullable();
            $table->string('sepa_creditor_id')->nullable();
            $table->string('rsin_number')->nullable();
            $table->integer('default_payment_term')->nullable();
            $table->string('logo_filename')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->softdeletes();

            $table->timestamps();
        });


        Schema::create('administration_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('administration_id')->unsigned();
            $table->foreign('administration_id')->references('id')->on('administrations');
            $table->unique(['user_id','administration_id']);
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
        Schema::dropIfExists('administrations');
        Schema::dropIfExists('administration_user');
    }
}
