<?php

namespace Database\Seeders;


use App\Eco\Task\Task;
use App\Eco\Task\TaskPropertyValue;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Task::class, 100)
            ->create()
            ->each(function ($task) {
                factory(TaskPropertyValue::class, random_int(0, 5))
                    ->create(['task_id' => $task->id]);
            });

    }
}
