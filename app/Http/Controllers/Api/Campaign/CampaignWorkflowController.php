<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignWorkflow;
use App\Helpers\Delete\Models\DeleteCampaign;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Campaign\FullCampaignWorkflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CampaignWorkflowController extends ApiController
{
    public function delete(Campaignworkflow $campaignworkflow)
    {
        //todo van Patrick: specifieker maken?
        $this->authorize('manage', Campaign::class);

        $campaignworkflow->delete();
    }

    public function add(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->integer('statusId')->validate('required')->alias('status_id')->next()
            ->integer('emailTemplateIdWf')->validate('required|exists:email_templates,id')->alias('email_template_id_wf')->next()
            ->integer('numberOfDaysToSendEmail')->validate('required|numeric')->alias('number_of_days_to_send_email')->next()
            ->string('workflowForType')->validate('required')->alias('workflow_for_type')->next()
            ->integer('campaignId')->validate('required')->alias('campaign_id')->next()
            ->boolean('isActive')->validate('required')->alias('is_active')->next()
            ->boolean('mailCcToCoachWf')->validate('required')->alias('mail_cc_to_coach_wf')->next()
            ->boolean('mailReminderToCoachWf')->validate('required')->alias('mail_reminder_to_coach_wf')->next()
            ->integer('emailTemplateIdReminder')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_reminder')->next()
            ->integer('numberOfDaysToSendEmailReminder')->validate('nullable|numeric')->onEmpty(0)->whenMissing(0)->alias('number_of_days_to_send_email_reminder')->next()
            ->get();

        $campaignworkflow = new CampaignWorkflow();
        if($data['workflow_for_type'] === "opportunity") {
            $campaignworkflow->opportunity_status_id = $data['status_id'];
        } else {
            $campaignworkflow->quotation_request_status_id = $data['status_id'];
        }
        $campaignworkflow->workflow_for_type = $data['workflow_for_type'];
        $campaignworkflow->email_template_id_wf = $data['email_template_id_wf'];
        $campaignworkflow->number_of_days_to_send_email = $data['number_of_days_to_send_email'];
        $campaignworkflow->campaign_id = $data['campaign_id'];
        $campaignworkflow->is_active = $data['is_active'];
        $campaignworkflow->mail_cc_to_coach_wf = $data['mail_cc_to_coach_wf'];
        $campaignworkflow->mail_reminder_to_coach_wf = $data['mail_reminder_to_coach_wf'];
        $campaignworkflow->email_template_id_reminder = $data['email_template_id_reminder'];
        $campaignworkflow->number_of_days_to_send_email_reminder = $data['number_of_days_to_send_email_reminder'];
        $campaignworkflow->save();

        return FullCampaignWorkflow::make($campaignworkflow->fresh());
    }

    public function edit(Request $request, RequestInput $requestInput, CampaignWorkflow $campaignWorkflow)
    {
        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->integer('emailTemplateIdWf')->validate('required|exists:email_templates,id')->alias('email_template_id_wf')->next()
            ->integer('numberOfDaysToSendEmail')->validate('required|numeric')->alias('number_of_days_to_send_email')->next()
            ->boolean('isActive')->validate('required')->alias('is_active')->next()
            ->boolean('mailCcToCoachWf')->validate('required')->alias('mail_cc_to_coach_wf')->next()
            ->boolean('mailReminderToCoachWf')->validate('required')->alias('mail_reminder_to_coach_wf')->next()
            ->integer('emailTemplateIdReminder')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_reminder')->next()
            ->integer('numberOfDaysToSendEmailReminder')->validate('nullable|numeric')->onEmpty(0)->whenMissing(0)->alias('number_of_days_to_send_email_reminder')->next()
            ->get();

        $campaignWorkflow->email_template_id_wf = $data['email_template_id_wf'];
        $campaignWorkflow->number_of_days_to_send_email = $data['number_of_days_to_send_email'];
        $campaignWorkflow->is_active = $data['is_active'];
        $campaignWorkflow->mail_cc_to_coach_wf = $data['mail_cc_to_coach_wf'];
        $campaignWorkflow->mail_reminder_to_coach_wf = $data['mail_reminder_to_coach_wf'];
        $campaignWorkflow->email_template_id_reminder = $data['email_template_id_reminder'] ?: null;
        $campaignWorkflow->number_of_days_to_send_email_reminder = $data['number_of_days_to_send_email_reminder'] ?: 0;
        $campaignWorkflow->save();

        return FullCampaignWorkflow::make($campaignWorkflow->fresh());
    }
}