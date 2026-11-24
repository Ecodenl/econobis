<?php

namespace Database\Seeders\Fixed;

use App\Eco\Campaign\CampaignStatus;
use Illuminate\Database\Seeder;

class CampaignStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $campaignStatuses = [
            ['name' => 'Niet gestart'],
            ['name' => 'Gestart'],
            ['name' => 'In afwachting'],
            ['name' => 'Klaar'],
        ];

        foreach ($campaignStatuses as $campaignStatus) {
            CampaignStatus::updateOrCreate(
                ['name' => $campaignStatus['name']],
                $campaignStatus
            );
        }
    }
}