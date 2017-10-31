<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\PersonType\PersonType::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
