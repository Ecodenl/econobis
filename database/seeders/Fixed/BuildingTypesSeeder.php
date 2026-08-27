<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\BuildingType;
use Illuminate\Database\Seeder;

class BuildingTypesSeeder extends Seeder
{
    public function run(): void
    {
        $buildingTypes = [
            [ 'name' => 'Vrijstaand', 'external_hoom_id' => 3, 'external_hoom_short' => 'detached-house', 'order' => 1],
            [ 'name' => 'Hoekwoning', 'external_hoom_id' => 2, 'external_hoom_short' => '', 'order' => 2],
            ['name' => 'Tussenwoning', 'external_hoom_id' => 5, 'external_hoom_short' => '', 'order' => 3],
            ['name' => 'Appartement','external_hoom_id' => 1, 'external_hoom_short' => '', 'order' => 4],
            [ 'name' => 'Appartement VVE', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 5],
            [ 'name' => 'Gehele tussenwoning', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 6],
            [ 'name' => 'Beneden woning meerdere verdiepingen', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 7],
            [ 'name' => '2 onder 1 kap', 'external_hoom_id' => 4, 'external_hoom_short' => '', 'order' => 8],
            ['name' => 'Onbekend', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 99],
        ];

        foreach ($buildingTypes as $buildingType) {
            BuildingType::updateOrCreate(
                ['name' => $buildingType['name']],
                $buildingType
            );
        }
    }
}