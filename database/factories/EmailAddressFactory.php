<?php

namespace Database\Factories;

use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(EmailAddress::class, function (Generator $faker) {
    return [
        'email' => $faker->email,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            return EmailAddressType::random()->id;
        },
    ];
});
