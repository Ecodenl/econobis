<?php

namespace Database\Factories\Eco\Task;

use App\Eco\Task\Task;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskPropertyValue;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskPropertyValueFactory extends Factory
{
    protected $model = TaskPropertyValue::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'value' => $faker->sentence(),
            'property_id' => function () {
                return TaskProperty::inRandomOrder()->first()->id;
            },
            'task_id' => function () {
                return Task::inRandomOrder()->first()->id;
            },
        ];
    }
}
