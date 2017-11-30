<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\ContactGroup\ContactGroup::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->text(80),
        'description' => $faker->paragraph,
        'closed' => $faker->boolean(20),
        'responsible_user_id' => function() use ($faker) {
            if($faker->boolean(50)) return App\Eco\User\User::inRandomOrder()->first()->id;
        },
        'date_started' => function() use ($faker) {
            if($faker->boolean(50)) return $faker->date();
        },
        'date_finished' => function() use ($faker) {
            if($faker->boolean(20)) return $faker->date();
        },
        'created_by_id' => function() use ($faker) {
            if($faker->boolean(80)) return App\Eco\User\User::inRandomOrder()->first()->id;
        },
    ];
});
