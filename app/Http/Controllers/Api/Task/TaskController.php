<?php

namespace App\Http\Controllers\Api\Task;

use App\Eco\Task\Task;
use App\Eco\Task\TaskStatus;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\Task\Grid\RequestQuery;
use App\Http\Resources\Registration\GridTask;
use App\Http\Resources\Task\FullTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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

    public function store(RequestInput $input)
    {
        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('typeId')->validate(['required', 'exists:task_types,id'])->alias('type_id')->next()
            ->integer('contactId')->validate('exists:contacts,id')->whenMissing(null)->onEmpty(null)->alias('contact_id')->next()
            ->integer('statusId')->validate(['required', Rule::in(TaskStatus::ids())])->alias('status_id')->next()
            ->integer('registrationId')->validate('exists:registrations,id')->whenMissing(null)->onEmpty(null)->alias('registration_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->whenMissing(null)->onEmpty(null)->alias('contact_group_id')->next()
            ->date('datePlanned')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_planned')->next()
            ->date('dateStarted')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_started')->next()
            ->date('dateFinished')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_finished')->next()
            ->integer('responsibleUserId')->validate(['required', 'exists:users,id'])->alias('responsible_user_id')->next()
            ->get();

        $task = new Task($data);
        $task->created_by_id = Auth::id();
        $task->save();

        return $this->show($task);
    }

    public function update(Task $task, RequestInput $input)
    {
        $data = $input->string('name')->next()
            ->string('description')->next()
            ->integer('typeId')->validate('exists:task_types,id')->alias('type_id')->next()
            ->integer('contactId')->validate('exists:contacts,id')->alias('contact_id')->next()
            ->integer('statusId')->validate(Rule::in(TaskStatus::ids()))->alias('status_id')->next()
            ->integer('registrationId')->validate('exists:registrations,id')->alias('registration_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->alias('contact_group_id')->next()
            ->date('datePlanned')->validate('date')->alias('date_planned')->next()
            ->date('dateStarted')->validate('date')->alias('date_started')->next()
            ->date('dateFinished')->validate('date')->alias('date_finished')->next()
            ->integer('responsibleUserId')->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->get();

        $task->fill($data);
        $task->save();

        return $this->show($task);
    }

}
