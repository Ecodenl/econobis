<?php

namespace Database\Seeders\Demo;

use App\Eco\Person\Person;
use Illuminate\Database\Seeder;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Person::factory()->count(5)
            ->create();
    }
}
