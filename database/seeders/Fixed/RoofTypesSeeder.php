<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\RoofType;
use Illuminate\Database\Seeder;

class RoofTypesSeeder extends Seeder
{
    public function run(): void
    {
        $roofTypes = [
            ['name' => 'Hellend dak met dakpannen', 'external_hoom_id' => 1, 'external_hoom_short' => 'pitched', 'order' => 1,],
            ['name' => 'Hellend dak met bitumen', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 2,],
            ['name' => 'Platdak', 'external_hoom_id' => 2, 'external_hoom_short' => '', 'order' => 3,],
            ['name' => 'Geen dak', 'external_hoom_id' => 3, 'external_hoom_short' => '', 'order' => 9,],
            ['name' => 'Hellend rietdak', 'external_hoom_id' => 6, 'external_hoom_short' => '', 'order' => 4,],
            ['name' => 'Puntdak', 'external_hoom_id' => 4, 'external_hoom_short' => '', 'order' => 8,],
            ['name' => 'Afgerond dak', 'external_hoom_id' => 5, 'external_hoom_short' => '', 'order' => 8,],
            ['name' => 'Onbekend', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 99,],
        ];

        foreach ($roofTypes as $roofType) {
            RoofType::updateOrCreate(
                ['name' => $roofType['name']],
                $roofType
            );
        }
    }
}