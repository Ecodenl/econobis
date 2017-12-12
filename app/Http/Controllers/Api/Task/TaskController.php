<?php

namespace App\Http\Controllers\Api\Task;

use App\Eco\Task\Task;
use App\Http\Controllers\Api\Task\Grid\RequestQuery;
use App\Http\Resources\Registration\GridTask;
use App\Http\Resources\Task\FullTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{

    public function grid(RequestQuery $query)
    {
        $tasks = $query->get();

        return GridTask::collection($tasks);
    }

    public function show(Task $task)
    {
        $task->load([
            'type',
            'contact',
            'registration',
            'contactGroup',
            'responsibleUser',
            'createdBy',
        ]);

        return FullTask::make($task);
    }

}
