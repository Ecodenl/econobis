<?php

namespace Database\Factories;

use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Title\Title;
use App\Eco\User\User;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(User::class, function (Generator $faker) {
    static $password;

    return [
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName,
        'last_name_prefix_id' => function () {
            if (random_int(0, 10) < 8) return null;
            return LastNamePrefix::inRandomOrder()->first()->id;
        },
        'title_id' => function () {
            if (random_int(0, 10) < 8) return null;
            return Title::inRandomOrder()->first()->id;
        },
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'phone_number' => $faker->phoneNumber,
        'mobile' => $faker->phoneNumber,
        'occupation' => $faker->jobTitle,
        'visit_count' => $faker->numberBetween(0, 200),
        'last_visit' => $faker->dateTimeBetween('-2 years', 'now'),
        'active' => $faker->boolean(85),
        'alfresco_password' => '',
    ];
});
