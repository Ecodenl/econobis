<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\EnergyLabel;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EnergyLabelsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        EnergyLabel::upsert([
            [
                'name' => 'A+++',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'A++',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'A+',
                'external_hoom_id' => null,
                'external_hoom_short' => '',
                'order' => 3,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'A',
                'external_hoom_id' => 1,
                'external_hoom_short' => '',
                'order' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'B',
                'external_hoom_id' => 2,
                'external_hoom_short' => '',
                'order' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'C',
                'external_hoom_id' => 3,
                'external_hoom_short' => '',
                'order' => 6,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'D',
                'external_hoom_id' => 4,
                'external_hoom_short' => '',
                'order' => 7,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'E',
                'external_hoom_id' => 5,
                'external_hoom_short' => '',
                'order' => 8,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'F',
                'external_hoom_id' => 6,
                'external_hoom_short' => '',
                'order' => 9,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'G',
                'external_hoom_id' => 7,
                'external_hoom_short' => '',
                'order' => 10,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Onbekend',
                'external_hoom_id' => 8,
                'external_hoom_short' => '',
                'order' => 99,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['name'], ['external_hoom_id', 'external_hoom_short', 'order', 'updated_at']);
    }
}