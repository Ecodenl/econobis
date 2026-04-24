<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationSide;
use Illuminate\Database\Seeder;

class HousingFileSpecificationSidesSeeder extends Seeder
{
    public function run(): void
    {
        HousingFileSpecificationSide::upsert([
            ['name' => 'Voorzijde'],
            ['name' => 'Achterzijde'],
            ['name' => 'Links'],
            ['name' => 'Rechts'],
            ['name' => 'Linkervoorzijde'],
            ['name' => 'Linkerachterzijde'],
            ['name' => 'Rechtervoorzijde'],
            ['name' => 'Rechterachterzijde'],
        ], ['name'], []);
    }
}