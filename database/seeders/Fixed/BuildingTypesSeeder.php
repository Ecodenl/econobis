<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\BuildingType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BuildingTypesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        BuildingType::upsert([
            [
                'name' => 'Vrijstaand',
                'external_hoom_id' => 3,
                'external_hoom_short' => 'detached-house',
                'order' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Hoekwoning',
                'external_hoom_id' => 2,
                'external_hoom_short' => '',
                'order' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Tussenwoning',
                'external_hoom_id' => 5,
                'external_hoom_short' => '',
                'order' => 3,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Appartement',
                'external_hoom_id' => 1,
                'external_hoom_short' => '',
                'order' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Appartement VVE',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Gehele tussenwoning',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 6,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Beneden woning meerdere verdiepingen',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 7,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => '2 onder 1 kap',
                'external_hoom_id' => 4,
                'external_hoom_short' => '',
                'order' => 8,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Onbekend',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 99,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['name'], ['external_hoom_id', 'external_hoom_short', 'order', 'updated_at']);
    }
}