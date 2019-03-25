<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVatCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vat_codes', function (Blueprint $table) {
            $table->increments('id');
            $table->date('start_date')->nullable();
            $table->string('description')->nullable(false)->default('');
            $table->float('percentage')->nullable();
            $table->string('twinfield_code')->nullable(false)->default('');
            $table->string('twinfield_ledger_code')->nullable(false)->default('');
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
        Schema::dropIfExists('vat_codes');
    }
}
