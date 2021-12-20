<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPortalImagesToPortalSettingsLayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('portal_settings_layouts', function (Blueprint $table) {
            $table->string('portal_logo_file_name_header')->after('portal_logo_file_name');
            $table->string('portal_image_bg_file_name_login')->after('portal_logo_file_name_header');
            $table->string('portal_image_bg_file_name_header')->after('portal_image_bg_file_name_login');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('portal_settings_layouts', 'portal_image_bg_file_name_header')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_image_bg_file_name_header');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'portal_image_bg_file_name_login')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_image_bg_file_name_login');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'portal_logo_file_name_header')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_logo_file_name_header');
            });
        }
    }
}
