<?php

namespace Database\Seeders\Fixed;

use App\Eco\Country\Country;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        Country::upsert([
            ['id' => 'AT', 'name' => 'Oostenrijk', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'AU', 'name' => 'Australië', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'BE', 'name' => 'België', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'CA', 'name' => 'Canada', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'CH', 'name' => 'Zwitserland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'CZ', 'name' => 'Tsjechië', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'DE', 'name' => 'Duitsland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'DK', 'name' => 'Denemarken', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'ES', 'name' => 'Spanje', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'FI', 'name' => 'Finland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'FR', 'name' => 'Frankrijk', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'GB', 'name' => 'Verenigd Koninkrijk', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'IE', 'name' => 'Ierland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'IT', 'name' => 'Italië', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'LU', 'name' => 'Luxemburg', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'NL', 'name' => 'Nederland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'NO', 'name' => 'Noorwegen', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'NZ', 'name' => 'Nieuw-Zeeland', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'PL', 'name' => 'Polen', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'PT', 'name' => 'Portugal', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'SE', 'name' => 'Zweden', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 'US', 'name' => 'Verenigde Staten', 'created_at' => $now, 'updated_at' => $now],
        ], ['id'], ['name', 'updated_at']);
    }
}