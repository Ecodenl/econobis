<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplierStatus;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EnergySupplierStatusSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        EnergySupplierStatus::upsert([
            ['name' => 'Voorlopig', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Definitief', 'created_at' => $now, 'updated_at' => $now],
        ], ['name'], ['updated_at']);
    }
}