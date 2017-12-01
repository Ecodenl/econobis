<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Registration\RegistrationNote::class, function (Faker\Generator $faker) {
    return [
        'note' => $faker->sentence(),
        'registration_id' => function(){
            return \App\Eco\Registration\Registration::inRandomOrder()->first()->id;
        },
    ];
});
