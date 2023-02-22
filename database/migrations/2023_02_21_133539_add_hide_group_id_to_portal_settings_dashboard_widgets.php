<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHideGroupIdToPortalSettingsDashboardWidgets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('portal_settings_dashboard_widgets', function (Blueprint $table) {
            $table->unsignedInteger('hide_group_id')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('portal_settings_dashboard_widgets', function (Blueprint $table) {
            $table->dropColumn('hide_group_id');
        });
    }
}
