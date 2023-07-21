<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullOpportunity extends JsonResource
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
            'name' => $this->measureCategory->name . ' - ' . $this->status->name,
            'measureCategory' => $this->measureCategory,
            'measures' => FullMeasure::collection($this->whenLoaded('measures')),
            'number' => $this->number,
            'status' => GenericResource::make($this->whenLoaded('status')),
            'datePlannedToSendWfEmailStatus' => $this->date_planned_to_send_wf_email_status,
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'quotationText' => $this->quotation_text,
            'quotationRequests' => FullQuotationRequest::collection($this->whenLoaded('quotationRequests')),
            'desiredDate' => $this->desired_date,
            'evaluationIsRealised' => $this->evaluation_is_realised,
            'evaluationRealised' => GenericResource::make($this->whenLoaded('evaluationRealised')),
            'evaluationIsStatisfied' => $this->evaluation_is_statisfied,
            'evaluationStatisfied' => GenericResource::make($this->whenLoaded('evaluationStatisfied')),
            'evaluationWouldRecommendOrganisation' => $this->evaluation_would_recommend_organisation,
            'evaluationRecommendOrganisation' => GenericResource::make($this->whenLoaded('evaluationRecommendOrganisation')),
            'evaluationNote' => $this->evaluation_note,
            'evaluationAgreedDate' => $this->evaluation_agreed_date,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
            'noteCount' => $this->notes()->count(),
            'relatedNotes' => GridTask::collection($this->whenLoaded('notes')),
            'documentCount' => $this->relatedDocuments ? $this->relatedDocuments->count() : 0,
            'relatedDocuments' => $this->relatedDocuments,
            'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
            'relatedEmailsSent' => $this->relatedEmailsSent,
            'relatedQuotationRequestsStatuses' => $this->relatedQuotationRequestsStatuses,
            'defaultStatusId' => $this->defaultStatusId,
            'amount' => $this->amount,
        ];
    }
}
