<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationSide;
use Illuminate\Database\Seeder;

class HousingFileSpecificationSidesSeeder extends Seeder
{
    public function run(): void
    {
        $housingFileSpecificationSides = [
            ['name' => 'Voorzijde'],
            ['name' => 'Achterzijde'],
            ['name' => 'Links'],
            ['name' => 'Rechts'],
            ['name' => 'Linkervoorzijde'],
            ['name' => 'Linkerachterzijde'],
            ['name' => 'Rechtervoorzijde'],
            ['name' => 'Rechterachterzijde'],
        ];

        foreach ($housingFileSpecificationSides as $housingFileSpecificationSide) {
            HousingFileSpecificationSide::updateOrCreate(
                ['name' => $housingFileSpecificationSide['name']],
                $housingFileSpecificationSide
            );
        }
    }
}