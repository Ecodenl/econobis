<?php

namespace Database\Factories;

use App\Eco\Task\Task;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskPropertyValue;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(TaskPropertyValue::class, function (Generator $faker) {
    return [
        'value' => $faker->sentence(),
        'property_id' => function () {
            return TaskProperty::inRandomOrder()->first()->id;
        },
        'task_id' => function () {
            return Task::inRandomOrder()->first()->id;
        },
    ];
});
