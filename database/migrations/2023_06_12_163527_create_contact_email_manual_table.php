<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactEmailManualTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_email_manual', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('cascade');

            $table->unsignedInteger('email_id');
            $table->foreign('email_id')
                ->references('id')->on('emails')
                ->onDelete('cascade');

            $table->unique(['contact_id', 'email_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('contact_email_manual');
    }
}
