<?php

namespace Database\Factories;

use App\Eco\ContactNote\ContactNote;
use App\Eco\User\User;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(ContactNote::class, function (Generator $faker) {
    return [
        'note' => $faker->text(),
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'created_by_id' => User::inRandomOrder()->first()->id,
        'updated_by_id' => User::inRandomOrder()->first()->id,
    ];
});
