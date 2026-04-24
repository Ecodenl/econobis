<?php

namespace Database\Seeders\Fixed;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PortalSettingsDashboardWidgetsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        PortalSettingsDashboardWidget::upsert([
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'over-ons', 'order' => 1, 'title' => 'Over ons', 'text' => 'Vind hier onze contact gegevens', 'button_text' => 'Over Ons', 'button_link' => 'over-ons', 'widget_image_file_name' => 'over-ons.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'created_at' => $now, 'updated_at' => $now, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'project-schrijf-je-in', 'order' => 2, 'title' => 'Projecten', 'text' => 'Doe mee met onze projecten en participeer', 'button_text' => 'Projecten', 'button_link' => 'inschrijven-projecten', 'widget_image_file_name' => 'project-schrijf-je-in.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'created_at' => $now, 'updated_at' => $now, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'huidige-deelnames', 'order' => 3, 'title' => 'Huidige deelnames', 'text' => 'Vind hier de projecten waar aan je deelneemt', 'button_text' => 'Huidige deelnames', 'button_link' => 'inschrijvingen-projecten', 'widget_image_file_name' => 'huidige-deelnames.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 1, 'created_at' => $now, 'updated_at' => $now, 'hide_group_id' => null],
            ['portal_settings_dashboard_id' => 1, 'code_ref' => 'groepen-beheer', 'order' => 999, 'title' => 'Groepen beheer', 'text' => 'Beheer hier de groepen waar je in zit', 'button_text' => 'Groepen', 'button_link' => 'groepen-beheer', 'widget_image_file_name' => 'groepen-beheer.png', 'show_group_id' => null, 'background_color' => '', 'text_color' => '', 'active' => 0, 'created_at' => $now, 'updated_at' => $now, 'hide_group_id' => null],
        ], ['code_ref'], [
            'portal_settings_dashboard_id',
            'order',
            'title',
            'text',
            'button_text',
            'button_link',
            'widget_image_file_name',
            'show_group_id',
            'background_color',
            'text_color',
            'active',
            'updated_at',
            'hide_group_id',
        ]);
    }
}