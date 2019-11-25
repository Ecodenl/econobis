<?php

namespace App\Http\Controllers\Api\Task;

use App\Eco\Task\TaskType;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;

class TaskTypeController extends Controller
{

    public function jory(Request $request)
    {
        return TaskType::jory()->applyRequest($request);
    }

    public function update(RequestInput $input, TaskType $taskType)
    {
        $this->authorize('update', TaskType::class);
        $data = $input->boolean('usesWfCompletedTask')->alias('uses_wf_completed_task')->next()
            ->integer('emailTemplateIdWfCompletedTask')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_wf_completed_task')->next()
            ->integer('numberOfDaysToSendEmailCompletedTask')->alias('number_of_days_to_send_email_completed_task')->next()
            ->boolean('usesWfExpiredTask')->alias('uses_wf_expired_task')->next()
            ->integer('emailTemplateIdWfExpiredTask')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_wf_expired_task')->next()
            ->get();

        $taskType->fill($data);
        $taskType->save();

        return GenericResource::make($taskType);
    }

}