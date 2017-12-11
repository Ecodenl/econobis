<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\OrganisationType\OrganisationType::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
