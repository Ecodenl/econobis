<?php

namespace Database\Factories;

use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(PhoneNumber::class, function (Generator $faker) {
    return [
        'number' => $faker->phoneNumber,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            return PhoneNumberType::random()->id;
        },
    ];
});
