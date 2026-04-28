<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationFloor;
use Illuminate\Database\Seeder;

class HousingFileSpecificationFloorsSeeder extends Seeder
{
    public function run(): void
    {
        $housingFileSpecificationFloors = [
            ['name' => 'Begane grond'],
            ['name' => 'Eerste verdieping'],
            ['name' => 'Tweede verdieping'],
        ];

        foreach ($housingFileSpecificationFloors as $housingFileSpecificationFloor) {
            HousingFileSpecificationFloor::updateOrCreate(
                ['name' => $housingFileSpecificationFloor['name']],
                $housingFileSpecificationFloor
            );
        }
    }
}