<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCheckPostalcodeLinkToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('check_postalcode_link')->default(false)->after('subsidy_provided');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('projects', 'check_postalcode_link'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('check_postalcode_link');
            });
        }
    }
}
