<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Occupation\Occupation::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
