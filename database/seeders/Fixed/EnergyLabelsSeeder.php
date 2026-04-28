<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\EnergyLabel;
use Illuminate\Database\Seeder;

class EnergyLabelsSeeder extends Seeder
{
    public function run(): void
    {
        $energyLabels = [
            ['name' => 'A+++', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 1],
            ['name' => 'A++', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 2],
            ['name' => 'A+', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 3],
            ['name' => 'A', 'external_hoom_id' => 1, 'external_hoom_short' => '', 'order' => 4],
            ['name' => 'B', 'external_hoom_id' => 2, 'external_hoom_short' => '', 'order' => 5],
            ['name' => 'C', 'external_hoom_id' => 3, 'external_hoom_short' => '', 'order' => 6],
            ['name' => 'D', 'external_hoom_id' => 4, 'external_hoom_short' => '', 'order' => 7],
            ['name' => 'E', 'external_hoom_id' => 5, 'external_hoom_short' => '', 'order' => 8],
            ['name' => 'F', 'external_hoom_id' => 6, 'external_hoom_short' => '', 'order' => 9],
            ['name' => 'G', 'external_hoom_id' => 7, 'external_hoom_short' => '', 'order' => 10],
            ['name' => 'Onbekend', 'external_hoom_id' => 8, 'external_hoom_short' => '', 'order' => 99],
        ];

        foreach ($energyLabels as $energyLabel) {
            EnergyLabel::updateOrCreate(
                ['name' => $energyLabel['name']],
                $energyLabel
            );
        }
    }
}