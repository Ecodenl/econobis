<?php

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use App\Helpers\Settings\PortalSettings;
use Illuminate\Database\Migrations\Migration;
use Spatie\Valuestore\Valuestore;

class SeedPortalSettingsDashboard extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettingsExists = !empty(PortalSettings::get('portalUrl')) ? true : false;

        if($portalSettingsExists){
            $portalSettingsDashboardJson = Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings-dashboard.json'));
            $portalSettingsDashboardTable = new PortalSettingsDashboard();
            $portalSettingsDashboardTable->welcome_title = $portalSettingsDashboardJson->get('welcomeTitle');
            $portalSettingsDashboardTable->welcome_message = $portalSettingsDashboardJson->get('welcomeMessage');
            $portalSettingsDashboardTable->save();

            $widgets = $portalSettingsDashboardJson->get('widgets');
            foreach ($widgets as $widget) {
                $portalSettingsDashboardWidget = new PortalSettingsDashboardWidget();
                $portalSettingsDashboardWidget->portal_settings_dashboard_id = $portalSettingsDashboardTable->id;
                $portalSettingsDashboardWidget->code_ref = $widget['id'];
                $portalSettingsDashboardWidget->order = $widget['order'];
                $portalSettingsDashboardWidget->title = $widget['title'];
                $portalSettingsDashboardWidget->text = $widget['text'];
                $portalSettingsDashboardWidget->widget_image_file_name = str_replace('/images/', '', $widget['image']);;
                $portalSettingsDashboardWidget->button_text = $widget['buttonText'];
                $portalSettingsDashboardWidget->button_link = $widget['buttonLink'];
                $portalSettingsDashboardWidget->active = $widget['active'];
                $portalSettingsDashboardWidget->save();
            }

        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
