<?php

namespace Database\Seeders\Fixed;

use App\Eco\AddressDongle\AddressDongleTypeDongle;
use App\Eco\AddressDongle\AddressDongleTypeReadOut;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AddressDongleTypesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $p1Id = AddressDongleTypeReadOut::where('name', 'P1')->value('id');
        if (!$p1Id) {
            throw new \RuntimeException('AddressDongleTypesSeeder: read out type "P1" not found.');
        }

        AddressDongleTypeDongle::upsert([
            ['type_read_out_id' => $p1Id, 'name' => 'Smartstuff type A', 'order' => 1, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['type_read_out_id' => $p1Id, 'name' => 'Smartstuff type B', 'order' => 2, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['type_read_out_id' => $p1Id, 'name' => 'Ander merk', 'order' => 3, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
        ], ['type_read_out_id', 'name'], ['order', 'is_active', 'updated_at']);
    }
}