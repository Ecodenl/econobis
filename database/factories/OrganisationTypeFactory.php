<?php

namespace Database\Factories;

use App\Eco\OrganisationType\OrganisationType;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(OrganisationType::class, function (Generator $faker) {
    return [
        'name' => $faker->jobTitle,
    ];
});
