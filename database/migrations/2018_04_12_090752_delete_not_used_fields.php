<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteNotUsedFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn('number_suffix');
        });

        Schema::table('people', function (Blueprint $table) {
            $table->dropColumn('primary');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->string('number_suffix')->nullable();
        });

        Schema::table('people', function (Blueprint $table) {
            $table->boolean('primary')->default(false);
        });
    }
}
