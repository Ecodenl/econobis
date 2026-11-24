<?php

namespace Database\Seeders\Fixed;

use App\Eco\AddressDongle\AddressDongleTypeReadOut;
use Illuminate\Database\Seeder;

class AddressDongleReadOutTypesSeeder extends Seeder
{
    public function run(): void
    {
        $addressDongleReadOutTypes =[
            ['name' => 'Onbekend', 'order' => 1, 'is_active' => 1],
            ['name' => 'P1', 'order' => 2, 'is_active' => 1],
            ['name' => 'P4', 'order' => 3, 'is_active' => 1],
        ];

        foreach ($addressDongleReadOutTypes as $addressDongleReadOutType) {
            AddressDongleTypeReadOut::updateOrCreate(
                ['name' => $addressDongleReadOutType['name']],
                $addressDongleReadOutType
            );
        }
    }
}