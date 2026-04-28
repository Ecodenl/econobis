<?php

namespace Database\Seeders\Fixed;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use Illuminate\Database\Seeder;

class PortalSettingsDashboardsSeeder extends Seeder
{
    public function run(): void
    {
        $portalSettingsDashboards = [
            ['id' => 1, 'welcome_title' => 'Welkom op jouw energie gemeenschap', 'welcome_message' => '', 'default_widget_background_color' => '#ffffff', 'default_widget_text_color' => '#000000'],
        ];

        foreach ($portalSettingsDashboards as $portalSettingsDashboard) {
            PortalSettingsDashboard::updateOrCreate(
                ['id' => $portalSettingsDashboard['id']],
                $portalSettingsDashboard
            );
        }
    }
}