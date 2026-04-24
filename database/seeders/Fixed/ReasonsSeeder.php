<?php

namespace Database\Seeders\Fixed;

use App\Eco\Reason\Reason;
use Illuminate\Database\Seeder;

class ReasonsSeeder extends Seeder
{
    public function run(): void
    {
        Reason::upsert([
            ['name' => 'Milieu'],
            ['name' => 'Comfort'],
            ['name' => 'Besparing'],
        ], ['name'], []);
    }
}