<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMailgunEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mailgun_events', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('mailgun_domain_id');
            $table->foreign('mailgun_domain_id')
                ->references('id')->on('mailgun_domains')
                ->onDelete('cascade');

            $table->string('mailgun_id');
            $table->string('mailgun_message_id');
            $table->string('event');
            $table->string('recipient');
            $table->string('subject');
            $table->dateTime('event_date');

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
        Schema::dropIfExists('mailgun_events');
    }
}
