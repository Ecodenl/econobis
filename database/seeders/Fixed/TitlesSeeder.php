<?php

namespace Database\Seeders\Fixed;

use App\Eco\Title\Title;
use Illuminate\Database\Seeder;

class TitlesSeeder extends Seeder
{
    public function run(): void
    {
        Title::upsert([
            ['name' => 'Dhr', 'address' => 'De heer', 'salutation' => 'heer', 'active' => 1],
            ['name' => 'Mevr', 'address' => 'Mevrouw', 'salutation' => 'mevrouw', 'active' => 1],
            ['name' => 'De heer, Mevrouw', 'address' => 'De heer, Mevrouw', 'salutation' => 'heer, mevrouw', 'active' => 1],
            ['name' => 'Familie', 'address' => 'Familie', 'salutation' => 'familie', 'active' => 1],
            ['name' => 'De heer of mevrouw', 'address' => 'De heer of mevrouw', 'salutation' => 'heer of mevrouw', 'active' => 1],
            ['name' => 'De heren', 'address' => 'De heren', 'salutation' => 'heren', 'active' => 1],
            ['name' => 'De dames', 'address' => 'De dames', 'salutation' => 'dames', 'active' => 1],
            ['name' => 'Erven', 'address' => 'Erven van', 'salutation' => 'erven van', 'active' => 0],
            ['name' => 'Geen voorkeur', 'address' => '', 'salutation' => '', 'active' => 1],
        ], ['name'], ['address', 'salutation', 'active']);
    }
}