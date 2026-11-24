<?php

namespace Database\Seeders\Fixed;

use App\Eco\AddressDongle\AddressDongleTypeDongle;
use App\Eco\AddressDongle\AddressDongleTypeReadOut;
use Illuminate\Database\Seeder;

class AddressDongleTypesSeeder extends Seeder
{
    public function run(): void
    {
        $p1Id = AddressDongleTypeReadOut::where('name', 'P1')->value('id');
        if (!$p1Id) {
            throw new \RuntimeException('AddressDongleTypesSeeder: read out type "P1" not found.');
        }

        $addressDongleTypes = [
            ['type_read_out_id' => $p1Id, 'name' => 'Smartstuff type A', 'order' => 1, 'is_active' => 1],
            ['type_read_out_id' => $p1Id, 'name' => 'Smartstuff type B', 'order' => 2, 'is_active' => 1],
            ['type_read_out_id' => $p1Id, 'name' => 'Ander merk', 'order' => 3, 'is_active' => 1],
        ];

        foreach ($addressDongleTypes as $addressDongleType) {
            AddressDongleTypeDongle::updateOrCreate(
                [
                    'type_read_out_id' => $addressDongleType['type_read_out_id'],
                    'name' => $addressDongleType['name'],
                ],
                $addressDongleType
            );
        }

    }
}