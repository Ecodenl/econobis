<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('mailbox_id');
            $table->foreign('mailbox_id')
                ->references('id')->on('mailboxes')
                ->onDelete('restrict');

            $table->string('from')->default('');
            $table->string('to', 1000)->default('[]');
            $table->string('cc', 1000)->default('[]');
            $table->string('bcc', 1000)->default('[]');

            $table->string('subject')->default('');
            $table->text('html_body');

            $table->dateTime('date');

            $table->string('folder')->default('');
            $table->unsignedInteger('imap_id');
            $table->string('message_id');

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
        Schema::dropIfExists('emails');
    }
}
