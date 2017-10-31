<?php

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
        factory(User::class, 1)->create([
            'name' => 'Administrator',
            'email' => 'info@xaris.nl',
        ]);

        factory(User::class, 99)->create();
    }
}
