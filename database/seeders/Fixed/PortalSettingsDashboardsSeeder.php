<?php

namespace Database\Seeders\Fixed;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PortalSettingsDashboardsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        PortalSettingsDashboard::upsert([
            ['id' => 1, 'welcome_title' => 'Welkom op jouw energie gemeenschap', 'welcome_message' => '', 'default_widget_background_color' => '#ffffff', 'default_widget_text_color' => '#000000', 'created_at' => $now, 'updated_at' => $now],
        ], ['id'], [
            'welcome_title',
            'welcome_message',
            'default_widget_background_color',
            'default_widget_text_color',
            'updated_at',
        ]);
    }
}