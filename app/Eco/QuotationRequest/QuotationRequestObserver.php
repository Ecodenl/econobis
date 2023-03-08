<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\QuotationRequest;

use App\Helpers\Workflow\QuotationRequestWorkflowHelper;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        if ($quotationRequest->isDirty('date_planned'))
        {
            Log::info('dirty date_planned');
            Log::info('old: ' . $quotationRequest->getOriginal('date_planned') ?: Carbon::parse($quotationRequest->getOriginal('date_planned'))->format('d-m-Y'));
            Log::info('new: ' . $quotationRequest->date_planned ?: Carbon::parse($quotationRequest->date_planned)->format('d-m-Y'));
            if($quotationRequest->date_planned){
                $madeStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'made')->first();
                Log::info($madeStatus);
                if($madeStatus){
                    $quotationRequest->status_id = $madeStatus->id;
                    Log::info('Kansactie status naar : ' . $madeStatus->id);
                }
            }
        }
        if ($quotationRequest->isDirty('date_recorded'))
        {
            Log::info('dirty date_recorded');
            Log::info('old: ' . $quotationRequest->getOriginal('date_recorded') ?: Carbon::parse($quotationRequest->getOriginal('date_recorded'))->format('d-m-Y'));
            Log::info('new: ' . $quotationRequest->date_recorded ?: Carbon::parse($quotationRequest->date_recorded)->format('d-m-Y'));
            if($quotationRequest->date_recorded){
                $doneStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'done')->first();
                Log::info($doneStatus);
                if($doneStatus){
                    $quotationRequest->status_id = $doneStatus->id;
                    Log::info('Kansactie status naar : ' . $doneStatus->id);
                }
            }
        }
        if ($quotationRequest->isDirty('date_under_review'))
        {
            Log::info('dirty date_under_review');
            Log::info('old: ' . $quotationRequest->getOriginal('date_under_review') ?: Carbon::parse($quotationRequest->getOriginal('date_under_review'))->format('d-m-Y'));
            Log::info('new: ' . $quotationRequest->date_under_review ?: Carbon::parse($quotationRequest->date_under_review)->format('d-m-Y'));
            if($quotationRequest->date_under_review){
                $underReviewStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'under-review')->first();
                Log::info($underReviewStatus);
                if($underReviewStatus){
                    $quotationRequest->status_id = $underReviewStatus->id;
                    Log::info('Kansactie status naar : ' . $underReviewStatus->id);
                }
            }
        }
        if ($quotationRequest->isDirty('date_approved_external'))
        {
            Log::info('dirty date_approved_external');
            Log::info('old: ' . $quotationRequest->getOriginal('date_approved_external') ?: Carbon::parse($quotationRequest->getOriginal('date_approved_external'))->format('d-m-Y'));
            Log::info('new: ' . $quotationRequest->date_approved_external ?: Carbon::parse($quotationRequest->date_approved_external)->format('d-m-Y'));
            Log::info('Opportunity action id: ' . $quotationRequest->opportunity_action_id);
            if($quotationRequest->date_approved_external){
                $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'approved')->first();
                Log::info($approvedStatus);
                if($approvedStatus){
                    $quotationRequest->status_id = $approvedStatus->id;
                    Log::info('Kansactie status naar : ' . $approvedStatus->id);
                }
            } else {
                $notApprovedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'not-approved')->first();
                Log::info($notApprovedStatus);
                if($notApprovedStatus){
                    $quotationRequest->status_id = $notApprovedStatus->id;
                    Log::info('Kansactie status naar : ' . $notApprovedStatus->id);
                }
            }
        }
        if ($quotationRequest->isDirty('date_approved_project_manager'))
        {
            Log::info('dirty date_approved_project_manager');
            Log::info('old: ' . $quotationRequest->getOriginal('date_approved_project_manager') ?: Carbon::parse($quotationRequest->getOriginal('date_approved_project_manager'))->format('d-m-Y'));
            Log::info('new: ' . $quotationRequest->date_approved_project_manager ?: Carbon::parse($quotationRequest->date_approved_project_manager)->format('d-m-Y'));
            if($quotationRequest->date_approved_project_manager){
                $approvedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'pm-approved')->first();
                Log::info($approvedStatus);
                if($approvedStatus){
                    $quotationRequest->status_id = $approvedStatus->id;
                    Log::info('Kansactie status naar : ' . $approvedStatus->id);
                }
            } else {
                $notApprovedStatus = QuotationRequestStatus::where('opportunity_action_id', $quotationRequest->opportunity_action_id)->where('code_ref', 'pm-not-approved')->first();
                Log::info($notApprovedStatus);
                if($notApprovedStatus){
                    $quotationRequest->status_id = $notApprovedStatus->id;
                    Log::info('Kansactie status naar : ' . $notApprovedStatus->id);
                }
            }
        }

        if ($quotationRequest->isDirty('status_id'))
        {
            Log::info('dirty status_id');
            Log::info('old: ' . $quotationRequest->getOriginal('status_id'));
            Log::info('new: ' . $quotationRequest->status_id);
            $days = $quotationRequest->status->uses_wf ? $quotationRequest->status->number_of_days_to_send_email : 0;
//            $mailDate = Carbon::now()->addDays($days)->addDay(1);
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

            if ($quotationRequest->status->uses_wf && $quotationRequest->status->number_of_days_to_send_email === 0){
                $quotationRequestflowHelper = new QuotationRequestWorkflowHelper($quotationRequest);
                $quotationRequestflowHelper->processWorkflowEmail();
            }
        }
    }

}