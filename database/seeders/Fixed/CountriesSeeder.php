<?php

namespace Database\Seeders\Fixed;

use App\Eco\Country\Country;
use Illuminate\Database\Seeder;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['id' => 'AT', 'name' => 'Oostenrijk'],
            ['id' => 'AU', 'name' => 'Australië'],
            ['id' => 'BE', 'name' => 'België'],
            ['id' => 'CA', 'name' => 'Canada'],
            ['id' => 'CH', 'name' => 'Zwitserland'],
            ['id' => 'CZ', 'name' => 'Tsjechië'],
            ['id' => 'DE', 'name' => 'Duitsland'],
            ['id' => 'DK', 'name' => 'Denemarken'],
            ['id' => 'ES', 'name' => 'Spanje'],
            ['id' => 'FI', 'name' => 'Finland'],
            ['id' => 'FR', 'name' => 'Frankrijk'],
            ['id' => 'GB', 'name' => 'Verenigd Koninkrijk'],
            ['id' => 'IE', 'name' => 'Ierland'],
            ['id' => 'IT', 'name' => 'Italië'],
            ['id' => 'LU', 'name' => 'Luxemburg'],
            ['id' => 'NL', 'name' => 'Nederland'],
            ['id' => 'NO', 'name' => 'Noorwegen'],
            ['id' => 'NZ', 'name' => 'Nieuw-Zeeland'],
            ['id' => 'PL', 'name' => 'Polen'],
            ['id' => 'PT', 'name' => 'Portugal'],
            ['id' => 'SE', 'name' => 'Zweden'],
            ['id' => 'US', 'name' => 'Verenigde Staten'],
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(
                ['id' => $country['id']],
                $country
            );
        }
    }
}