<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\EmailAddress\EmailAddress::class, function (Faker\Generator $faker) {
    return [
        'email' => $faker->email,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            return \App\Eco\EmailAddress\EmailAddressType::random()->id;
        },
    ];
});
