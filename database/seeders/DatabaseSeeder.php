<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\Fixed\FixedSeeder;
use Database\Seeders\Demo\DemoSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(FixedSeeder::class);

        if (app()->environment(['local', 'testing']) && env('SEED_DEMO', false)) {
            $this->call(DemoSeeder::class);
        }
    }
}

