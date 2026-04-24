<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\RoofType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RoofTypesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        RoofType::upsert([
            ['name' => 'Hellend dak met dakpannen', 'external_hoom_id' => 1, 'external_hoom_short' => 'pitched', 'order' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Hellend dak met bitumen', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Platdak', 'external_hoom_id' => 2, 'external_hoom_short' => '', 'order' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Geen dak', 'external_hoom_id' => 3, 'external_hoom_short' => '', 'order' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Hellend rietdak', 'external_hoom_id' => 6, 'external_hoom_short' => '', 'order' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Puntdak', 'external_hoom_id' => 4, 'external_hoom_short' => '', 'order' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Afgerond dak', 'external_hoom_id' => 5, 'external_hoom_short' => '', 'order' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Onbekend', 'external_hoom_id' => null, 'external_hoom_short' => '', 'order' => 99, 'created_at' => $now, 'updated_at' => $now],
        ], ['name'], ['external_hoom_id', 'external_hoom_short', 'order', 'updated_at']);
    }
}