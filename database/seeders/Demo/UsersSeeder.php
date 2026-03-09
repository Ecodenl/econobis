<?php

namespace Database\Seeders\Demo;

use App\Eco\User\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        factory(User::class, 10)->create();
        User::factory()->count(2)->create();
    }
}
