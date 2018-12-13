<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailboxIgnoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mailbox_ignores', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('mailbox_id');
            $table->foreign('mailbox_id')
                ->references('id')->on('mailboxes')
                ->onDelete('restrict');
           $table->string('value')->nullable();
           $table->string('type_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mailbox_ignores');
    }
}
