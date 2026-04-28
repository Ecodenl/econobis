<?php

namespace Database\Seeders\Fixed;

use App\Eco\LastNamePrefix\LastNamePrefix;
use Illuminate\Database\Seeder;

class LastNamePrefixesSeeder extends Seeder
{
    public function run(): void
    {
        $lastNamePrefixes = [
            ['name' => 'van'],
            ['name' => 'de'],
            ['name' => 'van der'],
            ['name' => 'van de'],
            ['name' => 'van den'],
            ['name' => 'den'],
            ['name' => 'ten'],
            ['name' => 'ter'],
            ['name' => 'te'],
            ['name' => 'van \'t'],
            ['name' => 'el'],
            ['name' => 'le'],
            ['name' => 'van het'],
            ['name' => 'in \'t'],
            ['name' => '\'t'],
            ['name' => 'von'],
            ['name' => 'du'],
            ['name' => 'da'],
            ['name' => 'de la'],
            ['name' => 'la'],
            ['name' => 'der'],
            ['name' => 'van ter'],
            ['name' => 'op \'t'],
            ['name' => 'op den'],
            ['name' => 'op ten'],
            ['name' => 'op de'],
            ['name' => 'uit den'],
            ['name' => 'di'],
            ['name' => 'voor den'],
            ['name' => 'op der'],
            ['name' => 'in den'],
            ['name' => 'aan den'],
        ];

        foreach ($lastNamePrefixes as $lastNamePrefix) {
            LastNamePrefix::updateOrCreate(
                ['name' => $lastNamePrefix['name']],
                $lastNamePrefix
            );
        }
    }
}