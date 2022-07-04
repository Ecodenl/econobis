<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortalSettingsDashboardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portal_settings_dashboards', function (Blueprint $table) {
            $table->increments('id');
            $table->string('welcome_title');
            $table->text('welcome_message');
            $table->string('default_widget_background_color', 30)->default('#fff');
            $table->string('default_widget_text_color', 30)->default('#000');
            $table->timestamps();
            $table->softdeletes();
        });
        Schema::create('portal_settings_dashboard_widgets', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('portal_settings_dashboard_id')->nullable()->default(null);
            $table->foreign('portal_settings_dashboard_id', 'portal_sd_portal_sd_id_foreign')
                ->references('id')->on('portal_settings_dashboards');
            $table->string('code_ref');
            $table->integer('order')->nullable();
            $table->string('title');
            $table->text('text');
            $table->text('button_text');
            $table->text('button_link');
            $table->string('widget_image_file_name')->default('');
            $table->unsignedInteger('show_group_id')->nullable()->default(null);
            $table->foreign('show_group_id', 'contact_groups_show_group_id_foreign')
                ->references('id')->on('contact_groups');
            $table->string('background_color', 30)->default('');
            $table->string('text_color', 30)->default('');
            $table->boolean('active')->default(false);
            $table->timestamps();
            $table->softdeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('portal_settings_dashboard_widgets');
        Schema::dropIfExists('portal_settings_dashboards');
    }
}
