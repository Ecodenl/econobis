<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Measure\MeasureTaken::class, function (Faker\Generator $faker) {
    return [
        'measure_date' => $faker->date(),
        'energy_label_id' => \App\Eco\EnergyLabel\EnergyLabel::inRandomOrder()->first()->id,
    ];
});
