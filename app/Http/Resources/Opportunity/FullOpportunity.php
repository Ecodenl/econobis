<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullOpportunity extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'measure' => FullMeasure::make($this->whenLoaded('measure')),
            'number' => $this->number,
            'status' => GenericResource::make($this->whenLoaded('status')),
            'opportunityEvaluation' => GenericResource::make($this->whenLoaded('opportunityEvaluation')),
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'quotationText' => $this->quotation_text,
            'quotationRequests' => FullQuotationRequest::collection($this->whenLoaded('quotationRequests')),
            'desiredDate' => $this->desired_date,
            'evaluationAgreedDate' => $this->evaluation_agreed_date,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
            'noteCount' => $this->notes()->count(),
            'relatedNotes' => GridTask::collection($this->whenLoaded('notes')),
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => $this->documents()->get(),
            'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
            'relatedEmailsSent' => $this->relatedEmailsSent,
        ];
    }
}
