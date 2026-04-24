<?php

namespace Database\Seeders\Fixed;

use App\Eco\AddressDongle\AddressDongleTypeReadOut;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AddressDongleReadOutTypesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        AddressDongleTypeReadOut::upsert([
            ['name' => 'Onbekend', 'order' => 1, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'P1', 'order' => 2, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'P4', 'order' => 3, 'is_active' => 1, 'created_at' => $now, 'updated_at' => $now],
        ], ['name'], ['order', 'is_active', 'updated_at']);
    }
}