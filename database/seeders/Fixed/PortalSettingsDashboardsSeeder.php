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

        // Alle velden (op id na natuurlijk), zijn muteerbaar voor gebruiker.
        // We voegen alleen ontbrekende (nieuwe) records toe en laten bestaande ongemoeid.
        // We gebruiken hier daarom firstOrCreate() ipv updateOrCreate() en doen geen update().
        foreach ($portalSettingsDashboards as $portalSettingsDashboard) {
            PortalSettingsDashboard::firstOrCreate(
                ['id' => $portalSettingsDashboard['id']],
                $portalSettingsDashboard
            );
        }
    }
}