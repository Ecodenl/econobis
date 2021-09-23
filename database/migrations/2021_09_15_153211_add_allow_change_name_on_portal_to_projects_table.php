<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAllowChangeNameOnPortalToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('disable_change_contact_name_on_portal')->default(false)->after('check_postalcode_link');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('projects', 'disable_change_contact_name_on_portal'))
        {
            Schema::table('projects', function (Blueprint $table)
            {
                $table->dropColumn('disable_change_contact_name_on_portal');
            });
        }
    }
}
