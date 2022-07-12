<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIncludeIntoExportGroupReportToContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->boolean('include_into_export_group_report')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups', 'include_into_export_group_report'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('include_into_export_group_report');
            });
        }
    }
}
