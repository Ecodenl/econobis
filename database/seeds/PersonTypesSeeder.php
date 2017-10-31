<?php

use Illuminate\Database\Seeder;

class PersonTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Eco\PersonType\PersonType::class, 10)->create();
    }
}
