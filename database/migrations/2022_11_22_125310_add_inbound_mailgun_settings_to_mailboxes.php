<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInboundMailgunSettingsToMailboxes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->boolean('inbound_mailgun_enabled')->default(false);
            $table->string('inbound_mailgun_email')->nullable();
            $table->string('inbound_mailgun_post_token')->nullable();
            $table->string('inbound_mailgun_route_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mailboxes', function (Blueprint $table) {
            $table->dropColumn('inbound_mailgun_enabled');
            $table->dropColumn('inbound_mailgun_email');
            $table->dropColumn('inbound_mailgun_post_token');
            $table->dropColumn('inbound_mailgun_route_id');
        });
    }
}
