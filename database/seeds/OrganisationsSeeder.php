<?php

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
        factory(\App\Eco\Organisation\Organisation::class, 5)->create();
    }
}
