<?php

namespace Database\Seeders;

use App\Eco\Person\Person;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Person::class, 50)->create();
    }
}
