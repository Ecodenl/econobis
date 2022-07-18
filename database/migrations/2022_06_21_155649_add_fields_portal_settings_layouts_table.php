<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsPortalSettingsLayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('portal_settings_layouts', function (Blueprint $table) {
            $table->boolean('use_transparent_background_login')->default(false)->after('portal_image_bg_file_name_login');
            $table->boolean('use_transparent_background_header')->default(false)->after('portal_image_bg_file_name_header');
            $table->string('portal_main_background_color', 30)->default('#f1eff0')->after('button_text_color');
            $table->string('portal_main_text_color', 30)->default('#000000')->after('portal_main_background_color');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('portal_settings_layouts', 'portal_main_text_color'))
        {
            Schema::table('portal_settings_layouts', function (Blueprint $table)
            {
                $table->dropColumn('portal_main_text_color');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'portal_main_background_color'))
        {
            Schema::table('portal_settings_layouts', function (Blueprint $table)
            {
                $table->dropColumn('portal_main_background_color');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'use_transparent_background_header'))
        {
            Schema::table('portal_settings_layouts', function (Blueprint $table)
            {
                $table->dropColumn('use_transparent_background_header');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'use_transparent_background_login'))
        {
            Schema::table('portal_settings_layouts', function (Blueprint $table)
            {
                $table->dropColumn('use_transparent_background_login');
            });
        }
    }
}
