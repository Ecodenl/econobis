<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMessageIdEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->text('to')->change();
            $table->text('cc')->change();
            $table->text('bcc')->change();
            $table->text('message_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->string('to', 5000)->change();
            $table->string('cc', 5000)->change();
            $table->string('bcc', 5000)->change();
            $table->string('message_id', 256)->change();
        });
    }
}
