<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHideGroupIdForeignKeyToPortalSettingsDashboardWidgets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('portal_settings_dashboard_widgets', function (Blueprint $table) {
            $table->foreign('hide_group_id', 'contact_groups_hide_group_id_foreign')
                ->references('id')->on('contact_groups');
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
            $table->dropForeign('contact_groups_hide_group_id_foreign');
        });
    }
}
