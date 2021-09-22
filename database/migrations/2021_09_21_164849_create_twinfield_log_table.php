<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTwinfieldLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twinfield_log', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('invoice_id')->nullable();
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');
            $table->unsignedInteger('contact_id')->nullable();
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->string('message_text', 256);
            $table->string('message_type', 10);
            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->boolean('is_error', false);
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
        Schema::dropIfExists('twinfield_log');
    }
}
