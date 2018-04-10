<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImportExtraFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('external_id')->nullable();
            $table->boolean('did_agree_avg')->default(false);
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->string('number_suffix')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('external_id');
            $table->dropColumn('did_agree_avg');
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn('number_suffix');
        });
    }
}
