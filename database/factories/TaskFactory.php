<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Task\Task::class, function (Faker\Generator $faker) {
    return [
        'note' => $faker->text(),
        'type_id' => function () {
            return \App\Eco\Task\TaskType::inRandomOrder()->first()->id;
        },
        'contact_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\Contact\Contact::inRandomOrder()->first()->id;
        },
        'finished' => $faker->boolean(),
        'intake_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\Intake\Intake::inRandomOrder()->first()->id;
        },
        'opportunity_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\Opportunity\Opportunity::inRandomOrder()->first()->id;
        },
        'contact_group_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\ContactGroup\ContactGroup::inRandomOrder()->first()->id;
        },
        'date_planned_start' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'date_planned_finish' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'start_time_planned' => function () use ($faker) {
            if ($faker->boolean(20)) return $faker->time();
        },
        'end_time_planned' => function () use ($faker) {
            if ($faker->boolean(10)) return $faker->time();
        },
        'date_finished' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'responsible_user_id' => function () {
            return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
        'created_by_id' => function () {
            return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
        'finished_by_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
    ];
});
