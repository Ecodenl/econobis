<?php

namespace Database\Factories\Eco\Task;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Task\Task;
use App\Eco\Task\TaskType;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'note' => $faker->text(),
            'type_id' => function () {
                return TaskType::inRandomOrder()->first()->id;
            },
            'contact_id' => function () use ($faker) {
                if ($faker->boolean(50)) return Contact::inRandomOrder()->first()->id;
            },
            'finished' => $faker->boolean(),
            'intake_id' => function () use ($faker) {
                if ($faker->boolean(50)) return Intake::inRandomOrder()->first()->id;
            },
            'opportunity_id' => function () use ($faker) {
                if ($faker->boolean(50)) return Opportunity::inRandomOrder()->first()->id;
            },
            'contact_group_id' => function () use ($faker) {
                if ($faker->boolean(50)) return ContactGroup::inRandomOrder()->first()->id;
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
                return User::inRandomOrder()->first()->id;
            },
            'created_by_id' => function () {
                return User::inRandomOrder()->first()->id;
            },
            'finished_by_id' => function () use ($faker) {
                if ($faker->boolean(50)) return User::inRandomOrder()->first()->id;
            },
        ];
    }
}
