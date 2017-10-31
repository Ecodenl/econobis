<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {
            $table->integer('last_name_prefix_id')->unsigned()->nullable()->default(null);
            $table->foreign('last_name_prefix_id')->references('id')->on('last_name_prefixes') ->onDelete('restrict');
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
            $table->dropForeign('people_last_name_prefix_id_foreign');
            $table->dropColumn('last_name_prefix_id');
        });
    }
}
