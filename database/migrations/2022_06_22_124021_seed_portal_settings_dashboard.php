<?php

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboards;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidgets;
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
            $portalSettingsDashboardTable = new PortalSettingsDashboards();
            $portalSettingsDashboardTable->welcome_title = $portalSettingsDashboardJson->get('welcomeTitle');
            $portalSettingsDashboardTable->welcome_message = $portalSettingsDashboardJson->get('welcomeMessage');
            $portalSettingsDashboardTable->save();

            $widgets = $portalSettingsDashboardJson->get('widgets');
            foreach ($widgets as $widget) {
                $portalSettingsDashboardWidget = new PortalSettingsDashboardWidgets();
                $portalSettingsDashboardWidget->portal_settings_dashboard_id = $portalSettingsDashboardTable->id;
                $portalSettingsDashboardWidget->code_ref = $widget['id'];
                $portalSettingsDashboardWidget->order = $widget['order'];
                $portalSettingsDashboardWidget->title = $widget['title'];
                $portalSettingsDashboardWidget->text = $widget['text'];
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
