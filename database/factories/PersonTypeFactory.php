<?php

namespace Database\Factories;

use App\Eco\PersonType\PersonType;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(PersonType::class, function (Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
