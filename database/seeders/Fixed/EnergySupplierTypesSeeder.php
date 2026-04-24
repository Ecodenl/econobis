<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplierType;
use Illuminate\Database\Seeder;

class EnergySupplierTypesSeeder extends Seeder
{
    public function run(): void
    {
        EnergySupplierType::upsert([
            ['name' => 'Gas'],
            ['name' => 'Elektriciteit'],
            ['name' => 'Elektriciteit en gas'],
        ], ['name'], []);
    }
}