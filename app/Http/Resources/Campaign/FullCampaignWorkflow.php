<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 19-12-2017
 * Time: 15:27
 */

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCampaignWorkflow extends JsonResource
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
            'workflowForType' => $this->workflow_for_type,
            'opportunityStatusId' => $this->opportunity_status_id,
            'quotationRequestStatusId' => $this->quotation_request_status_id,
            'numberOfDaysToSendEmail' => $this->number_of_days_to_send_email,
            'emailTemplateIdWf' => $this->email_template_id_wf,
            'mailCcToCoachWf' => $this->mail_cc_to_coach_wf,
            'isActive' => $this->is_active,
            'status' => $this->status,
            'emailTemplateWorkflow' => $this->emailTemplateWorkflow,
        ];
    }
}