<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Task;

use Illuminate\Support\Facades\Auth;

class TaskObserver
{

    public function creating(Task $task)
    {
        $userId = Auth::id();
        $task->created_by_id = $userId;
        $task->updated_by_id = $userId;
    }

    public function updating(Task $task)
    {
        $userId = Auth::id();
        $task->updated_by_id = $userId;
    }
}