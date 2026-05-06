<?php

namespace Database\Seeders\Fixed;

use App\Eco\PortalSettings\PortalSettings;
use Illuminate\Database\Seeder;

class PortalSettingsSeeder extends Seeder
{
    public function run(): void
    {
//        PortalSettings::query()->updateOrCreate(
//            ['id' => 1],
//            [
//                'portal_active' => false,
//            ]
//        );
        $portalSettings = [
            ['id' => 1, 'portal_active' => false],
        ];

        // Alle velden (op id na natuurlijk), zijn muteerbaar voor gebruiker.
        // We voegen alleen ontbrekende (nieuwe) records toe en laten bestaande ongemoeid.
        // We gebruiken hier daarom firstOrCreate() ipv updateOrCreate() en doen geen update().
        foreach ($portalSettings as $portalSetting) {
            PortalSettings::firstOrCreate(
                ['id' => $portalSetting['id']],
                $portalSetting
            );
        }
    }
}