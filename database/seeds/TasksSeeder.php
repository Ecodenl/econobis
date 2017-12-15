<?php

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
        factory(\App\Eco\Task\Task::class, 100)
            ->create()
            ->each(function ($task) {
                factory(\App\Eco\Task\TaskPropertyValue::class, random_int(0, 5))
                    ->create(['task_id' => $task->id]);
            });

    }
}
