<?php

namespace Database\Factories\Eco\ContactGroup;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactGroupFactory extends Factory
{
    protected $model = ContactGroup::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->text(80),
            'description' => $faker->paragraph,
            'closed' => $faker->boolean(20),
            'responsible_user_id' => function() use ($faker) {
                if($faker->boolean(50)) return User::inRandomOrder()->first()->id;
            },
            'date_started' => function() use ($faker) {
                if($faker->boolean(50)) return $faker->date();
            },
            'date_finished' => function() use ($faker) {
                if($faker->boolean(20)) return $faker->date();
            },
            'created_by_id' => function() use ($faker) {
                if($faker->boolean(80)) return User::inRandomOrder()->first()->id;
            },
        ];
    }
}
