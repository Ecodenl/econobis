<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Campaign\Campaign::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->text(60),
    ];
});
