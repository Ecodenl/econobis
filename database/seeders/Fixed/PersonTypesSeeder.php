<?php

namespace Database\Seeders\Fixed;

use App\Eco\PersonType\PersonType;
use Illuminate\Database\Seeder;

class PersonTypesSeeder extends Seeder
{
    public function run(): void
    {
        $personTypes = [
            ['name' => 'Particulier'],
            ['name' => 'Adviseur'],
            ['name' => 'Eigenaar bedrijf'],
            ['name' => 'ZZP\'er'],
            ['name' => 'Journalist'],
            ['name' => 'Wethouder'],
            ['name' => 'Kunstenaar'],
            ['name' => 'Collega coöperatie'],
        ];

        foreach ($personTypes as $personType) {
            PersonType::updateOrCreate(
                ['name' => $personType['name']],
                $personType
            );
        }
    }
}