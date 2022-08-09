<?php

namespace Database\Seeders;

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
        factory(Organisation::class, 5)->create();
    }
}
