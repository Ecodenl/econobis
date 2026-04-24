<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationFloor;
use Illuminate\Database\Seeder;

class HousingFileSpecificationFloorsSeeder extends Seeder
{
    public function run(): void
    {
        HousingFileSpecificationFloor::upsert([
            ['name' => 'Begane grond'],
            ['name' => 'Eerste verdieping'],
            ['name' => 'Tweede verdieping'],
        ], ['name'], []);
    }
}