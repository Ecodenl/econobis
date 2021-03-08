<?php

namespace App\Http\Resources\Opportunity;

use App\Http\Resources\GenericResource;
use App\Http\Resources\Intake\IntakeByOpportunity;
use App\Http\Resources\Measure\FullMeasure;
use Illuminate\Http\Resources\Json\Resource;

class OpportunityByQuotationRequest extends Resource
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
            'intake' => IntakeByOpportunity::make($this->whenLoaded('intake')),
            'quotationText' => $this->quotation_text,
            'desiredDate' => $this->desired_date,
            'evaluationAgreedDate' => $this->evaluation_agreed_date,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'taskCount' => $this->tasks()->count(),
            'noteCount' => $this->notes()->count(),
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => $this->documents()->get(),
            'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
            'relatedEmailsSent' => $this->relatedEmailsSent,
        ];
    }
}
