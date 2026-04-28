<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\EnergyLabelStatus;
use Illuminate\Database\Seeder;

class EnergyLabelStatusSeeder extends Seeder
{
    public function run(): void
    {
        $energySupplierStatuses = [
            ['name' => 'Voorlopig'],
            ['name' => 'Definitief'],
        ];

        foreach ($energySupplierStatuses as $energySupplierStatus) {
            EnergyLabelStatus::updateOrCreate(
                ['name' => $energySupplierStatus['name']],
                $energySupplierStatus
            );
        }
    }
}