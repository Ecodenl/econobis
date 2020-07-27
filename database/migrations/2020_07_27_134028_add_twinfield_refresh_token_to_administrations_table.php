<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwinfieldRefreshTokenToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->string('twinfield_refresh_token')->nullable()->after('twinfield_client_secret');
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
            $table->dropColumn('twinfield_refresh_token');
        });
    }
}
