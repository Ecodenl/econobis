<?php

namespace Database\Factories;

use App\Eco\Occupation\Occupation;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Occupation::class, function (Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
