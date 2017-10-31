<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\PhoneNumber\PhoneNumber::class, function (Faker\Generator $faker) {
    return [
        'number' => $faker->phoneNumber,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            return \App\Eco\PhoneNumber\PhoneNumberType::random()->id;
        },
    ];
});
