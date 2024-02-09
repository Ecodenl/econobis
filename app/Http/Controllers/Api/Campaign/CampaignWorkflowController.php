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
        Log::info(json_encode($requestInput));
        $this->authorize('manage', Campaign::class);

        $data = $requestInput
            ->string('statusId')->validate('required')->alias('status_id')->next()
            ->string('emailTemplatedIdWf')->validate('required|exists:email_templates,id')->alias('email_template_id_wf')->next()
            ->string('numberOfDaysToSendEmail')->validate('required|numeric')->alias('number_of_days_to_send_email')->next()
            ->string('workflowForType')->validate('required')->alias('workflow_for_type')->next()
            ->string('campaignId')->validate('required')->alias('campaign_id')->next()
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
        $campaignworkflow->save();

        return FullCampaignWorkflow::make($campaignworkflow->fresh());
    }
}