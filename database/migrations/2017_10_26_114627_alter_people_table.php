<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {
            $table->string('first_name_partner')->default('');
            $table->string('last_name_partner')->default('');
            $table->date('date_of_birth_partner')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('people', function (Blueprint $table) {
//            $table->dropColumn('first_name_partner');
//            $table->dropColumn('last_name_partner');
//            $table->dropColumn('date_of_birth_partner');
        });
    }
}
