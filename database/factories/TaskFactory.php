<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Task\Task::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence(),
        'description' => $faker->text(),
        'type_id' => function () {
            return \App\Eco\Task\TaskType::inRandomOrder()->first()->id;
        },
        'contact_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\Contact\Contact::inRandomOrder()->first()->id;
        },
        'status_id' => \App\Eco\Task\TaskStatus::random()->id,
        'registration_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\Registration\Registration::inRandomOrder()->first()->id;
        },
        'contact_group_id' => function () use ($faker) {
            if ($faker->boolean(50)) return \App\Eco\ContactGroup\ContactGroup::inRandomOrder()->first()->id;
        },
        'date_planned' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'date_started' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'date_finished' => function () use ($faker) {
            if ($faker->boolean(50)) return $faker->date();
        },
        'responsible_user_id' => function () {
            return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
        'created_by_id' => function () use ($faker) {
            return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
    ];
});
