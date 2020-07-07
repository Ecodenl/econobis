<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwinfieldFieldsForOauth2ToAdministrationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->string('twinfield_client_secret')->nullable()->after('mailbox_id');
            $table->string('twinfield_client_id')->nullable()->after('mailbox_id');
            $table->string('twinfield_connection_type')->nullable()->after('mailbox_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('twinfield_connection_type');
            $table->dropColumn('twinfield_client_id');
            $table->dropColumn('twinfield_client_secret');
        });
    }
}
