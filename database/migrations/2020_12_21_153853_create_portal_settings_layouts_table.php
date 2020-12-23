<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortalSettingsLayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portal_settings_layouts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->boolean('is_default')->default(false);
            $table->string('portal_logo_file_name');;
            $table->string('portal_favicon_file_name');
            $table->string('portal_background_color', 30);
            $table->string('portal_background_text_color', 30);
            $table->string('login_header_background_color', 30);
            $table->string('login_header_background_text_color', 30);
            $table->string('header_icons_color', 30);
            $table->string('login_field_background_color', 30);
            $table->string('login_field_background_text_color', 30);
            $table->string('button_color', 30);
            $table->string('button_text_color', 30);
            $table->timestamps();
            $table->softdeletes();
        });

        Schema::table('administrations', function (Blueprint $table) {
            $table->unsignedInteger('portal_settings_layout_id')->nullable()->default(null);
            $table->foreign('portal_settings_layout_id')
                ->references('id')->on('portal_settings_layouts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('administrations', 'portal_settings_layout_id')) {
            Schema::table('administrations', function (Blueprint $table) {
                $table->dropForeign(['portal_settings_layout_id']);
                $table->dropColumn('portal_settings_layout_id');
            });
        }
        Schema::dropIfExists('portal_settings_layouts');
    }
}
