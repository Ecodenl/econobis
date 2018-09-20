<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddConnectionsToDynamicContactGroupFilter extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dynamic_contact_group_filter', function (Blueprint $table) {
            $table->string('connect_name')->default('');
            $table->string('connected_to')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dynamic_contact_group_filter', function (Blueprint $table) {
            //
        });
    }
}
