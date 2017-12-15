<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Task\TaskPropertyValue::class, function (Faker\Generator $faker) {
    return [
        'value' => $faker->sentence(),
        'property_id' => function () {
            return \App\Eco\Task\TaskProperty::inRandomOrder()->first()->id;
        },
        'task_id' => function () {
            return \App\Eco\Task\Task::inRandomOrder()->first()->id;
        },
    ];
});
