<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplierStatus;
use Illuminate\Database\Seeder;

class EnergySupplierStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $energySupplierStatuses = [
            ['name' => 'Geïnteresseerd'],
            ['name' => 'Geen interesse'],
            ['name' => 'Stapt over'],
            ['name' => 'Overgestapt'],
        ];

        foreach ($energySupplierStatuses as $energySupplierStatus) {
            EnergySupplierStatus::updateOrCreate(
                ['name' => $energySupplierStatus['name']],
                $energySupplierStatus
            );
        }

    }
}