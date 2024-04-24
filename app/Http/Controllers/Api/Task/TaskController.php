<?php

namespace App\Http\Controllers\Api\Task;

use App\Eco\Email\Email;
use App\Eco\Task\Task;
use App\Helpers\Delete\Models\DeleteTask;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Workflow\TaskWorkflowHelper;
use App\Http\RequestQueries\Task\Grid\TaskRequestQuery;
use App\Http\RequestQueries\Task\Grid\NoteRequestQuery;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\Task\CalendarTask;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\Task\TaskPeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{

    public function gridTask(TaskRequestQuery $requestQuery)
    {
        $tasks = $requestQuery->get();

        return GridTask::collection($tasks)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'taskIdsTotal' => $requestQuery->totalIds(),
            ]
        ]);
    }

    public function gridNote(NoteRequestQuery $requestQuery)
    {
        $tasks = $requestQuery->get();

        return GridTask::collection($tasks)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'noteIdsTotal' => $requestQuery->totalIds(),
            ]
            ]);
    }

    public function calendar(Request $request)
    {
        $tasks = Task::whereBetween('date_planned_start', [$request->startDate, $request->endDate])->get();

        return CalendarTask::collection($tasks);
    }

    public function show(Task $task)
    {
        $task->load([
            'type',
            'contact',
            'intake',
            'contactGroup',
            'campaign',
            'housingFile',
            'project',
            'participant',
            'responsibleUser',
            'responsibleTeam',
            'createdBy',
            'updatedBy',
            'finishedBy',
            'opportunity.status',
            'opportunity.measures',
            'properties.property',
            'tasks',
            'notes',
            'documents',
            'order',
            'invoice',
        ]);

        $task->relatedEmailsInbox = $this->getRelatedEmails($task->id, 'inbox');
        $task->relatedEmailsSent = $this->getRelatedEmails($task->id, 'sent');

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $task->relatedDocuments = $task->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $task->relatedDocuments = $task->documents()->get();
        }

        return FullTask::make($task);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Task::class);

        $data = $input->string('note')->whenMissing('')->onEmpty('')->next()
            ->integer('typeId')->validate('exists:task_types,id')->onEmpty(null)->alias('type_id')->next()
            ->integer('contactId')->validate('exists:contacts,id')->whenMissing(null)->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->whenMissing(null)->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->whenMissing(null)->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->whenMissing(null)->onEmpty(null)->alias('campaign_id')->next()
            ->boolean('finished')->next()
            ->date('datePlannedStart')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_planned_start')->next()
            ->date('datePlannedFinish')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_planned_finish')->next()
            ->string('startTimePlanned')->whenMissing(null)->onEmpty(null)->alias('start_time_planned')->next()
            ->string('endTimePlanned')->whenMissing(null)->onEmpty(null)->alias('end_time_planned')->next()
            ->date('dateFinished')->validate('date')->whenMissing(null)->onEmpty(null)->alias('date_finished')->next()
            ->integer('responsibleUserId')->validate('exists:users,id', 'required_unless, responsible_team_id')->whenMissing(null)->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('exists:teams,id', 'required_unless, responsible_user_id')->whenMissing(null)->onEmpty(null)->alias('responsible_team_id')->next()
            ->integer('finishedById')->validate('exists:users,id')->whenMissing(null)->onEmpty(null)->alias('finished_by_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->integer('invoiceId')->validate('exists:invoices,id')->onEmpty(null)->alias('invoice_id')->next()
            ->get();

        $task = new Task($data);

        if($task->finished){
            $task->date_finished = Carbon::today();
            $task->finished_by_id = Auth::id();
        }
        $task->save();

        if ($task->type && $task->type->uses_wf_new_task) {
            $taskWorkflowHelper = new TaskWorkflowHelper($task);
            $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
            if($processed)
            {
                $task->date_sent_wf_new_task =  Carbon::now();
                $task->save();
            }
        }

        return $this->show($task);
    }

    public function update(Task $task, RequestInput $input)
    {
        $this->authorize('manage', Task::class);

        $data = $input->string('note')->next()
            ->integer('typeId')->validate('exists:task_types,id')->onEmpty(null)->alias('type_id')->next()
            ->integer('contactId')->validate('exists:contacts,id')->onEmpty(null)->alias('contact_id')->next()
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->onEmpty(null)->alias('contact_group_id')->next()
            ->integer('campaignId')->validate('exists:campaigns,id')->onEmpty(null)->alias('campaign_id')->next()
            ->boolean('finished')->next()
            ->date('datePlannedStart')->onEmpty(null)->validate('date')->alias('date_planned_start')->next()
            ->date('datePlannedFinish')->onEmpty(null)->validate('date')->alias('date_planned_finish')->next()
            ->string('startTimePlanned')->onEmpty(null)->alias('start_time_planned')->next()
            ->string('endTimePlanned')->onEmpty(null)->alias('end_time_planned')->next()
            ->date('dateFinished')->validate('date')->onEmpty(null)->alias('date_finished')->next()
            ->integer('responsibleUserId')->validate('exists:users,id', 'required_unless, responsible_team_id')->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('exists:teams,id', 'required_unless, responsible_user_id')->onEmpty(null)->alias('responsible_team_id')->next()
            ->integer('finishedById')->validate('exists:users,id')->onEmpty(null)->alias('finished_by_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('housingFileId')->validate('exists:housing_files,id')->onEmpty(null)->alias('housing_file_id')->next()
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
            ->integer('participantId')->validate('exists:participation_project,id')->onEmpty(null)->alias('participation_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->integer('invoiceId')->validate('exists:invoices,id')->onEmpty(null)->alias('invoice_id')->next()
            ->get();

        $task->fill($data);

        if( $task->getOriginal('finished') != $task->finished && $task->finished ){
            $task->date_finished = Carbon::today();
            $task->finished_by_id = Auth::id();
        }
        $task->save();

        return $this->show($task);
    }

    public function duplicate(Task $task)
    {
        $task->load('properties');

        $newTask = $task->replicate();
        $newTask->task_id = $task->id;
        $newTask->responsible_user_id = Auth::id();
        $newTask->responsible_team_id = null;
        $newTask->date_planned_start = null;
        $newTask->date_planned_finish = null;
        $newTask->start_time_planned = null;
        $newTask->end_time_planned = null;

        if($newTask->finished){
            $newTask->date_finished = Carbon::today();
            $newTask->finished_by_id = Auth::id();
        }

        $newTask->push();

        foreach($task->getRelations() as $relation => $items){
            foreach($items as $item){
                unset($item->id);
                $newTask->{$relation}()->create($item->toArray());
            }
        }

        return $this->show($newTask);
    }

    public function destroy(Task $task)
    {
        $this->authorize('manage', Task::class);

        try {
            DB::beginTransaction();

            $deleteTask = new DeleteTask($task);
            $result = $deleteTask->delete();
            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function bulkDelete(Request $request)
    {
        $this->authorize('manage', Task::class);

        if($request->input('ids')){
            $tasksToDelete = Task::whereIn('id', $request->input('ids'))->get();
            foreach ($tasksToDelete as $task) {
                $deleteTask = new DeleteTask($task);
                $deleteTask->delete();
            }
        }
    }

    public function bulkUpdate(Request $request)
    {
        $this->authorize('manage', Task::class);

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:tasks,id'],
        ]);

        $tasks = Task::whereIn('id', $request->input('ids'))->get();

        // todo WM: is dit nodig?
//        foreach ($tasks as $task) {
//            $this->authorize('manage', $task);
//        }

        $data = $request->validate([
            'finished' => ['boolean'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
        ]);

        foreach ($tasks as $task) {
            $task->update(Arr::keysToSnakeCase($data));
        }

    }

    public function finish(Task $task)
    {
        $this->authorize('manage', Task::class);

        $task->date_finished = Carbon::today();
        $task->finished = true;
        $task->finished_by_id = Auth::id();
        $task->save();

        return $this->show($task->fresh());
    }

    public function getAmountOfActiveTasks(){
        $user = Auth::user();

        $userTeamIds = $user->teams()->pluck('id')->toArray();

        $userTasks = Task::where('finished', false)->where('responsible_user_id', $user->id)->get();
        $teamTasks = Task::where('finished', false)->whereIn('responsible_team_id', $userTeamIds)->get();

        $allTasks = $userTasks->merge($teamTasks);

        return $allTasks->count();
    }

    public function peek(Request $request)
    {
        $teamContactIds = Auth::user()->getTeamContactIds();

        $query = Task::query();
        if ($teamContactIds){
            $query->whereIn('contact_id', $teamContactIds)->orderBy('id');
        }else{
            $query->orderBy('id');
        }

        if($request->has('contactIds')){
            $query = $query->whereIn('contact_id', json_decode($request->input('contactIds')));
        }

        return TaskPeek::collection($query->get());
    }

    public function getRelatedEmails($id, $folder)
    {
        return Email::where('task_id', $id)->where('folder', $folder)->get();
    }
}
