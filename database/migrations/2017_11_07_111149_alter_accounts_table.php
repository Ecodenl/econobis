<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->string('website')->default('');
            $table->string('chamber_of_commerce_number')->default('');
            $table->string('vat_number')->default('');

            $table->integer('industry_id')->unsigned()->nullable()->default(null);
            $table->foreign('industry_id')->references('id')->on('industries') ->onDelete('restrict');

            $table->integer('square_meters')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('accounts', function (Blueprint $table) {
            //
        });
    }
}
