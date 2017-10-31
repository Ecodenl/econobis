<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\AccountType\AccountType::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
