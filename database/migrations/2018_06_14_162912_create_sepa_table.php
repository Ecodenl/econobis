<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSepaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sepas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('filename');
            $table->string('name');
            $table->unsignedInteger('administration_id')->nullable();
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');
            $table->timestamps();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->unsignedInteger('sepa_id')->nullable();
            $table->foreign('sepa_id')
                ->references('id')->on('sepas')
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
        Schema::dropIfExists('sepas');

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['sepa_id']);
            $table->dropColumn('sepa_id');
        });
    }
}
