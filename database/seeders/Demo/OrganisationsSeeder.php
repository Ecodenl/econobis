<?php

namespace Database\Seeders\Demo;

use App\Eco\Organisation\Organisation;
use Illuminate\Database\Seeder;

class OrganisationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Organisation::factory()->count(5)
            ->create();
    }
}
