<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileSpecificationStatus;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class HousingFileSpecificationStatusesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        HousingFileSpecificationStatus::upsert([
            ['name' => 'Gewenst', 'code_ref' => 'desirable', 'order' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Wordt gerealiseerd', 'code_ref' => 'is_realized', 'order' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Aanwezig', 'code_ref' => 'present', 'order' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Onbekend', 'code_ref' => 'unknown', 'order' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Kans gemaakt', 'code_ref' => 'opportunity_created', 'order' => 2, 'created_at' => $now, 'updated_at' => $now],
        ], ['code_ref'], ['name', 'order', 'updated_at']);
    }
}