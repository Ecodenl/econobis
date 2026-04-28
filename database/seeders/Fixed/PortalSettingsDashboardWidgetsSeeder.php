<?php

namespace Database\Seeders\Fixed;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use Illuminate\Database\Seeder;

class PortalSettingsDashboardWidgetsSeeder extends Seeder
{
    public function run(): void
    {
        $portalSettingsDashboardWidgets = [
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'over-ons', 'order' => 1, 'title' => 'Over ons', 'text' => 'Vind hier onze contact gegevens', 'button_text' => 'Over Ons', 'button_link' => 'over-ons', 'widget_image_file_name' => 'over-ons.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'project-schrijf-je-in', 'order' => 2, 'title' => 'Projecten', 'text' => 'Doe mee met onze projecten en participeer', 'button_text' => 'Projecten', 'button_link' => 'inschrijven-projecten', 'widget_image_file_name' => 'project-schrijf-je-in.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'huidige-deelnames', 'order' => 3, 'title' => 'Huidige deelnames', 'text' => 'Vind hier de projecten waar aan je deelneemt', 'button_text' => 'Huidige deelnames', 'button_link' => 'inschrijvingen-projecten', 'widget_image_file_name' => 'huidige-deelnames.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'groepen-beheer', 'order' => 999, 'title' => 'Groepen beheer', 'text' => 'Beheer hier de groepen waar je in zit', 'button_text' => 'Groepen', 'button_link' => 'groepen-beheer', 'widget_image_file_name' => 'groepen-beheer.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 0, 'hide_group_id' => null],
        ];

        foreach ($portalSettingsDashboardWidgets as $portalSettingsDashboardWidget) {
            PortalSettingsDashboardWidget::updateOrCreate(
                ['code_ref' => $portalSettingsDashboardWidget['code_ref']],
                $portalSettingsDashboardWidget
            );
        }

    }
}