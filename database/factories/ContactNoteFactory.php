<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\ContactNote\ContactNote::class, function (Faker\Generator $faker) {
    return [
        'note' => $faker->text(),
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'created_by_id' => App\Eco\User\User::inRandomOrder()->first()->id,
        'updated_by_id' => App\Eco\User\User::inRandomOrder()->first()->id,
    ];
});
