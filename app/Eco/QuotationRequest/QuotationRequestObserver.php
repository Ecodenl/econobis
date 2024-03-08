<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\QuotationRequest;

use App\Eco\Campaign\CampaignWorkflow;
use App\Eco\Opportunity\OpportunityAction;
use App\Helpers\Workflow\QuotationRequestWorkflowHelper;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class QuotationRequestObserver
{

    public function creating(QuotationRequest $quotationRequest)
    {
        if(!Auth::isPortalUser()) {
            $userId = Auth::id();
            $quotationRequest->created_by_id = $userId;
            $quotationRequest->updated_by_id = $userId;
        }
    }

    public function updating(QuotationRequest $quotationRequest)
    {
        if(!Auth::isPortalUser()) {
            $userId = Auth::id();
            $quotationRequest->updated_by_id = $userId;
        }
    }

    public function saving(QuotationRequest $quotationRequest)
    {
        $datePlannedAttempt3 = $quotationRequest->date_planned_attempt3;
        $datePlannedAttempt3Original = $quotationRequest->getOriginal('date_planned_attempt3');
        if($datePlannedAttempt3 != $datePlannedAttempt3Original)
        {
            if($quotationRequest->date_planned_attempt3){
                $notMadeStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'not-made')->first();
                if($notMadeStatus){
                    $quotationRequest->status_id = $notMadeStatus->id;
                }
            }
        }
        $datePlanned = $quotationRequest->date_planned;
        $datePlannedOriginal = $quotationRequest->getOriginal('date_planned');
        if($datePlanned != $datePlannedOriginal)
        {
            if($quotationRequest->date_planned){
                $madeStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'made')->first();
                if($madeStatus){
                    $quotationRequest->status_id = $madeStatus->id;
// todo WM gevolg kans status: nog even niet. Denk niet dat je dit wilt als je meerdere kansacties hebt met verschillende statussen
//  en dat kunnen ook nog eens kansacties zijn met verschillende opportunity action types (bezoek / offerteverzoek / budgetaanvraag
//  Wellicht kans status bijwerken als er een kansactie status wijzigt en als er dan nog 1 of meerder zijn met status 'made' of 'under-review' of 'under-review-occupant', dan kans status op pending zetten ???
//                    $pendingOpportunityStatus = OpportunityStatus::where('code_ref', 'pending')->first();
//                    if($quotationRequest->opportunity){
//                        $quotationRequest->opportunity->status_id = $pendingOpportunityStatus->id;
//                        $quotationRequest->opportunity->save();
//                    }
                }
            }
        }
        $dateRecorded = $quotationRequest->date_recorded;
        $dateRecordedOriginal = $quotationRequest->getOriginal('date_recorded');
        if($dateRecorded != $dateRecordedOriginal)
        {
            if($quotationRequest->date_recorded){
                $doneStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'done')->first();
                if($doneStatus){
                    $quotationRequest->status_id = $doneStatus->id;
                }
            }
        }
        $dateReleased = $quotationRequest->date_released;
        $dateReleasedOriginal = $quotationRequest->getOriginal('date_released');
        if($dateReleased != $dateReleasedOriginal)
        {
            if($quotationRequest->date_released){
                $underReviewOccupantStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'under-review-occupant')->first();
                if($underReviewOccupantStatus){
                    $quotationRequest->status_id = $underReviewOccupantStatus->id;
                }
            }
        }
        $dateUnderReview = $quotationRequest->date_under_review;
        $dateUnderReviewOriginal = $quotationRequest->getOriginal('date_under_review');
        if($dateUnderReview != $dateUnderReviewOriginal)
        {
            if($quotationRequest->date_under_review){
                $underReviewStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'under-review')->first();
                if($underReviewStatus){
                    $quotationRequest->status_id = $underReviewStatus->id;
                }
            }
        }
// todo WM : Wellicht anders in de toekomst. Voor nu alleen doen bij offerteverzoek.  Bij budgetaanvraag wordt kansactie status namelijk ook op approved gezet als datum akkoord toekenning is gezet.
//  wellicht aparte code_ref approved_client maken om kansactie op juiste status te zetten ?
        $dateApprovedClient = $quotationRequest->date_approved_client;
        $dateApprovedClientOriginal = $quotationRequest->getOriginal('date_approved_client');
        if($dateApprovedClient != $dateApprovedClientOriginal)
        {
            $offerteverzoekAction = OpportunityAction::where('code_ref', 'quotation-request')->first();
            if($quotationRequest->opportunity_action_id == $offerteverzoekAction->id){
                if($quotationRequest->date_approved_client){
                    $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'approved')->first();
                    if($approvedStatus){
                        $quotationRequest->status_id = $approvedStatus->id;
                    }
                }
            }
        }
        $dateApprovedExternal = $quotationRequest->date_approved_external;
        $dateApprovedExternalOriginal = $quotationRequest->getOriginal('date_approved_external');
        if($dateApprovedExternal != $dateApprovedExternalOriginal)
        {
            if($quotationRequest->date_approved_external){
                $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'approved')->first();
                if($approvedStatus){
                    $quotationRequest->status_id = $approvedStatus->id;
                }
            } else {
                $notApprovedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'not-approved')->first();
                if($notApprovedStatus){
                    $quotationRequest->status_id = $notApprovedStatus->id;
                }
            }
        }
        $dateApprovedProjectManager = $quotationRequest->date_approved_project_manager;
        $dateApprovedProjectManagerOriginal = $quotationRequest->getOriginal('date_approved_project_manager');
        if($dateApprovedProjectManager != $dateApprovedProjectManagerOriginal)
        {
            if($quotationRequest->date_approved_project_manager){
                $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'pm-approved')->first();
                if($approvedStatus){
                    $quotationRequest->status_id = $approvedStatus->id;
                }
            } else {
                $notApprovedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'pm-not-approved')->first();
                if($notApprovedStatus){
                    $quotationRequest->status_id = $notApprovedStatus->id;
                }
            }
        }
        $dateExecuted = $quotationRequest->date_executed;
        $dateExecutedOriginal = $quotationRequest->getOriginal('date_executed');
        if($dateExecuted != $dateExecutedOriginal)
        {
            if($quotationRequest->date_executed){
                $executedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'executed')->first();
                if($executedStatus){
                    $quotationRequest->status_id = $executedStatus->id;
// todo WM gevolg kans status: nog even niet. Denk niet dat je dit wilt als je meerdere kansacties hebt met verschillende statussen
//  en dat kunnen ook nog eens kansacties zijn met verschillende opportunity action types (bezoek / offerteverzoek / budgetaanvraag
//  Wellicht kans status bijwerken als er een kansactie status wijzigt en als alle kansactie statsus op 'executed' staan dan kans status ook op executed zetten ?????
//                    $executedOpportunityStatus = OpportunityStatus::where('code_ref', 'executed')->first();
//                    if($quotationRequest->opportunity) {
//                        $quotationRequest->opportunity->status_id = $executedOpportunityStatus->id;
//                        $quotationRequest->opportunity->save();
//                    }
                }
            }
        }
        $dateUnderReviewDetermination = $quotationRequest->date_under_review_determination;
        $dateUnderReviewDeterminationOriginal = $quotationRequest->getOriginal('date_under_review_determination');
        if($dateUnderReviewDetermination != $dateUnderReviewDeterminationOriginal)
        {
            if($quotationRequest->date_under_review_determination){
                $underReviewDeterminationStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'under-review-det')->first();
                if($underReviewDeterminationStatus){
                    $quotationRequest->status_id = $underReviewDeterminationStatus->id;
                }
            }
        }
        $dateApprovedDetermination = $quotationRequest->date_approved_determination;
        $dateApprovedDeterminationOriginal = $quotationRequest->getOriginal('date_approved_determination');
        if($dateApprovedDetermination != $dateApprovedDeterminationOriginal)
        {
            if($quotationRequest->date_approved_determination){
                $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'approved-det')->first();
                if($approvedStatus){
                    $quotationRequest->status_id = $approvedStatus->id;
                }
            } else {
                $notApprovedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'not-approved-det')->first();
                if($notApprovedStatus){
                    $quotationRequest->status_id = $notApprovedStatus->id;
                }
            }
        }

        if ($quotationRequest->isDirty('status_id'))
        {
            $campaignWorkflow = CampaignWorkflow::where('workflow_for_type', 'quotationrequest')->where('campaign_id', $quotationRequest->opportunity->intake->campaign_id)->where('quotation_request_status_id', $quotationRequest->status_id)->first();
            if($quotationRequest->status->uses_wf && $campaignWorkflow && $campaignWorkflow->is_active){
                $days = $campaignWorkflow->number_of_days_to_send_email;
            } else {
                $days = 0;
            }
            $mailDate = Carbon::now()->addDays($days);
            $quotationRequest->date_planned_to_send_wf_email_status = $mailDate;
        }
    }

    public function saved(QuotationRequest $quotationRequest)
    {
        if ($quotationRequest->isDirty('status_id'))
        {
            $quotationRequestActionsLog = new QuotationRequestActionsLog();
            $user = Auth::user();
            if (Auth::isPortalUser() && $user->contact) {
                $quotationRequestActionsLog->contact_id = $user->contact->id;
                $quotationRequestActionsLog->updated_with = 'portal';
            } else {
                $quotationRequestActionsLog->user_id = Auth::id();
                $quotationRequestActionsLog->updated_with = 'econobis';
            }
            $quotationRequestActionsLog->quotation_request_id = $quotationRequest->id;
            $quotationRequestActionsLog->old_status_id = $quotationRequest->getOriginal('status_id');
            $quotationRequestActionsLog->new_status_id = $quotationRequest->status_id;
            $quotationRequestActionsLog->save();

            // ProcesWorkflowEmail doen we alleen vanuit econobis. Indien deze status wijziging dus voorkomt uit portal, dan niet.
            // In dat geval is er namelijk al een ander proces die email verstuurd bij bepaalde datum zetting die dan weer auutomatisch een status wijziging tot gevolg heeft.
            if (!Auth::isPortalUser()) {
                $campaignWorkflow = CampaignWorkflow::where('workflow_for_type', 'quotationrequest')->where('campaign_id', $quotationRequest->opportunity->intake->campaign_id)->where('quotation_request_status_id', $quotationRequest->status_id)->first();
                if ($quotationRequest->status->uses_wf && $campaignWorkflow && $campaignWorkflow->is_active && $campaignWorkflow->number_of_days_to_send_email === 0){
                    $quotationRequestflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
                    $quotationRequestflowHelper->processWorkflowEmail($campaignWorkflow);
                }
            }
        }
    }

}