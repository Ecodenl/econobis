<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplierType;
use Illuminate\Database\Seeder;

class EnergySupplierTypesSeeder extends Seeder
{
    public function run(): void
    {
        $energySupplierTypes = [
            ['name' => 'Gas'],
            ['name' => 'Elektriciteit'],
            ['name' => 'Elektriciteit en gas'],
        ];

        foreach ($energySupplierTypes as $energySupplierType) {
            EnergySupplierType::updateOrCreate(
                ['name' => $energySupplierType['name']],
                $energySupplierType
            );
        }
    }
}