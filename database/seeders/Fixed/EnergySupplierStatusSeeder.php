<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplierStatus;
use Illuminate\Database\Seeder;

class EnergySupplierStatusSeeder extends Seeder
{
    public function run(): void
    {
        EnergySupplierStatus::upsert([
            ['name' => 'Geïnteresseerd'],
            ['name' => 'Geen interesse'],
            ['name' => 'Stapt over'],
            ['name' => 'Overgestapt'],
        ], ['name'], []);
    }
}