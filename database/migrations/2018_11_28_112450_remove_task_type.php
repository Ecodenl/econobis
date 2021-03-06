<?php

use App\Eco\Task\Task;
use Illuminate\Database\Migrations\Migration;

class RemoveTaskType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

       $tasksWithTypeWebform = Task::withTrashed()->where('type_id', 8)->get();

        foreach ($tasksWithTypeWebform as $task) {
            $task->type_id = 6;
            $task->save();
        }

        $taskTypeToRemove = \App\Eco\Task\TaskType::find(8);
        $taskTypeToRemove->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
