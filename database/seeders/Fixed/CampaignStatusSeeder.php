<?php

namespace Database\Seeders\Fixed;

use App\Eco\Campaign\CampaignStatus;
use Illuminate\Database\Seeder;

class CampaignStatusSeeder extends Seeder
{
    public function run(): void
    {
        CampaignStatus::upsert([
            ['name' => 'Niet gestart'],
            ['name' => 'Gestart'],
            ['name' => 'In afwachting'],
            ['name' => 'Klaar'],
        ], ['name'], []);
    }
}