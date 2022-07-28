<?php

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedFirstPortalSettingsDashboard extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettingsDashboard = PortalSettingsDashboard::find(1);
        if(!$portalSettingsDashboard){
            $portalSettingsDashboardNew = new PortalSettingsDashboard();
            $portalSettingsDashboardNew->welcome_title = 'Welkom op jouw energie gemeenschap';
            $portalSettingsDashboardNew->welcome_message = '';
            $portalSettingsDashboardNew->default_widget_background_color = '#ffffff';
            $portalSettingsDashboardNew->default_widget_text_color = '#000000';
            $portalSettingsDashboardNew->save();

            $widgetOverons = new PortalSettingsDashboardWidget();
            $widgetOverons->portal_settings_dashboard_id = $portalSettingsDashboardNew->id;
            $widgetOverons->code_ref = 'over-ons';
            $widgetOverons->order = 1;
            $widgetOverons->title = 'Over ons';
            $widgetOverons->text = 'Vind hier onze contact gegevens';
            $widgetOverons->button_text = 'Over Ons';
            $widgetOverons->button_link = 'over-ons';
            $widgetOverons->widget_image_file_name = 'over-ons.png';
            $widgetOverons->show_group_id = null;
            $widgetOverons->background_color = '';
            $widgetOverons->text_color = '';
            $widgetOverons->active = true;
            $widgetOverons->save();

            $widgetProject = new PortalSettingsDashboardWidget();
            $widgetProject->portal_settings_dashboard_id = $portalSettingsDashboardNew->id;
            $widgetProject->code_ref = 'project-schrijf-je-in';
            $widgetProject->order = 2;
            $widgetProject->title = 'Projecten';
            $widgetProject->text = 'Doe mee met onze projecten en participeer';
            $widgetProject->button_text = 'Projecten';
            $widgetProject->button_link = 'inschrijven-projecten';
            $widgetProject->widget_image_file_name = 'project-schrijf-je-in.png';
            $widgetProject->show_group_id = null;
            $widgetProject->background_color = '';
            $widgetProject->text_color = '';
            $widgetProject->active = true;
            $widgetProject->save();

            $widgetDeelnames = new PortalSettingsDashboardWidget();
            $widgetDeelnames->portal_settings_dashboard_id = $portalSettingsDashboardNew->id;
            $widgetDeelnames->code_ref = 'huidige-deelnames';
            $widgetDeelnames->order = 3;
            $widgetDeelnames->title = 'Huidige deelnames';
            $widgetDeelnames->text = 'Vind hier de projecten waar aan je deelneemt';
            $widgetDeelnames->button_text = 'Huidige deelnames';
            $widgetDeelnames->button_link = 'inschrijvingen-projecten';
            $widgetDeelnames->widget_image_file_name = 'huidige-deelnames.png';
            $widgetDeelnames->show_group_id = null;
            $widgetDeelnames->background_color = '';
            $widgetDeelnames->text_color = '';
            $widgetDeelnames->active = true;
            $widgetDeelnames->save();

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
