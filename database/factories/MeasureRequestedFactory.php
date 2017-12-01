<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Measure\MeasureRequested::class, function (Faker\Generator $faker) {
    return [
        'desired_date' => $faker->date(),
        'degree_interest' => $faker->numberBetween(0, 10),
    ];
});
