<?php

namespace Database\Seeders\Fixed;

use App\Eco\Campaign\CampaignType;
use Illuminate\Database\Seeder;

class CampaignTypesSeeder extends Seeder
{
    public function run(): void
    {
        $campaignTypes = [
            ['name' => 'Huis aan huis'],
            ['name' => 'E-mail'],
            ['name' => 'Internet/digitaal'],
            ['name' => 'Campagne op maat'],
            ['name' => 'Energiecafé'],
            ['name' => 'Buurtaanpak'],
            ['name' => 'Subsidie'],
        ];

        foreach ($campaignTypes as $campaignType) {
            CampaignType::updateOrCreate(
                ['name' => $campaignType['name']],
                $campaignType
            );
        }
    }
}