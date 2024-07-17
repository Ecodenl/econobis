<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Support\Facades\Log;

class OpportunityHelper
{
    private $opportunityActionQuotationRequestId = null;
    private $opportunityActionVisitId = null;
    private $opportunityActionSubsidyRequestId = null;
    private $opportunity;
    private $quotationRequest;
    public function __construct(QuotationRequest $quotationRequest)
    {
        $this->opportunityActionQuotationRequestId = OpportunityAction::where('code_ref', 'quotation-request')->first()->id;
        $this->opportunityActionVisitId = OpportunityAction::where('code_ref', 'visit')->first()->id;
        $this->opportunityActionSubsidyRequestId = OpportunityAction::where('code_ref', 'subsidy-request')->first()->id;
        $this->opportunity = $quotationRequest->opportunity;
        $this->quotationRequest = $quotationRequest;
    }


    //TODO:
    // Nog niet getest, alleen code opgezet

    public function showUpdateOpportunityStatus() {
        $newOpportunityStatusCodeRef = $this->getNewOpportunityStatus();
        if($newOpportunityStatusCodeRef) {
            $response = $this->getOpportunityStatus($newOpportunityStatusCodeRef);
            return $response;
        }
        return 'geen wijziging';
    }

    public function updateOpportunityStatus() {
        $newOpportunityStatusCodeRef = $this->getNewOpportunityStatus();
        if($newOpportunityStatusCodeRef){
            $response = $this->setOpportunityStatus($newOpportunityStatusCodeRef);
            return $response;
        }
        return 'geen wijziging';
    }
    private function getNewOpportunityStatus() {

        $visitStatusDefaultId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'default')->first()->id;
        $visitStatusNotMadeId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'not-made')->first()->id;
        $visitStatusMadeId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'made')->first()->id;
        $visitStatusDoneId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'done')->first()->id;
        $visitStatusCancelledId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'cancelled')->first()->id;
        switch ($this->quotationRequest->opportunityAction->code_ref) {
// Geen afspraak gemaakt	    default
// Geen afspraak kunnen maken	not-made
// Afspraak gemaakt	            made
// Afspraak uitgevoerd	        done
// Afspraak afgezegd	        cancelled

            case 'visit':
                switch ($this->quotationRequest->status->code_ref) {
                    //afspraak gemaakt
                    case 'made':
                        //regel 2 en 3 Excel
                        return 'in_progress';
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        //regel 5 en 6 Excel
                        return 'pending';
                    //Afspraak uitgevoerd
                    case 'done':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $otherQuotationRequestsCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, null);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Geen afspraak gemaakt""
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

//                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gemaakt" / "made" is
//                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, 'made', 'no');
//
//                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak Uitgevoerd" / "done" is
//                        $otherVisitsHaveOtherStatusThenDoneCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, 'done', 'no');
//
//                        //zijn er binnen deze kans ook offerteverzoeken met status "Uitgevoerd" / "executed"
//                        $otherQuotationRequestsWithStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'executed');
//
//                        //zijn er binnen deze kans ook offerteverzoeken met status "Opdracht" / "mandate"
//                        $otherQuotationRequestsWithStatusMandateCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'mandate');

                        if($otherQuotationRequestsCount === 0 && $otherVisitsWithStatusDefaultCount === 0 && $otherVisitsWithStatusMadeCount === 0 ) {
                            //regel 7 Excel
                            return 'executed';
//                        } else {
//                            if ($otherVisitsWithStatusMadeCount === 0 && $otherVisitsHaveOtherStatusThenDoneCount === 0 && $otherQuotationRequestsWithStatusExecutedCount > 0 && $otherQuotationRequestsWithStatusMandateCount === 0) {
//                                //regel 8 Excel
//                                return 'executed';
//                            } else {
//                                //regel 9 Excel
//                                return 'pending';
//                            }
                        }
//                    case 'cancelled':
//                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveOtherStatusThenCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, 'cancelled', 'no');
//
//                        //zijn er binnen deze kans ook offerteverzoeken
//                        $quotationRequestsCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId);
//
//                        if($otherVisitsHaveOtherStatusThenCancelledCount === 0 && $quotationRequestsCount === 0) {
//                            //regel 10 Excel
//                            return 'no_execution';
//                        }
//                        return false;
                }
                break;
//            case 'quotation-request':
//                switch ($this->quotationRequest->status->code_ref) {
//                    //Offerte aangevraagd
//                    case 'default':
//                        //regel 14 Excel
//                        return 'pending';
//                    //Offerte aanvraag in behandeling
//                    case 'under-review':
//                        //regel 15 Excel
//                        return 'pending';
//                    //In overweging bij bewoner
//                    case 'under-review-occupant':
//                        //regel 16 Excel
//                        return 'pending';
//                    //Bewoner is akkoord
//                    case 'approved':
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status "Opdracht" / "mandate" is
//                        $otherQuotationRequestsHaveStatusMandateCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'mandate');
//
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Opdracht" / "mandate", "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['mandate', 'not-approved', 'not-possible', 'pm-not-approved'], 'no');
//
//                        if($otherQuotationRequestsHaveStatusMandateCount > 0 && $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount === 0) {
//                            //regel 17 Excel
//                            return 'pending';
//                        }
//                        return false;
//                    //Bewoner heeft afgewezen
//                    case 'not-approved':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
//                        $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['not-approved', 'not-possible', 'pm-not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount === 0) {
//                            //regel 18 Excel
//                            return 'no_execution';
//                        }
//                        return false;
//                    //Offerte niet mogelijk
//                    case 'not-possible':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved" of "Offerte niet mogelijk" / "not-possible" is
//                        $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['not-approved', 'not-possible'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount === 0) {
//                            //regel 19 Excel
//                            return 'no_execution';
//                        }
//                        return false;
//                    //Geen reactie ontvangen
//                    case 'no-response':
//                        //regel 20 Excel
//                        return 'pending';
//                    //Uitgevoerd
//                    case 'executed':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['not-possible', 'not-approved', 'pm-not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
//                            //regel 21 Excel
//                            return 'executed';
//                        }
//                        return false;
//                    //Offerteverzoek akkoord
//                    case 'pm-approved':
//                        //regel 22 Excel
//                        return 'pending';
//                    //Offerteverzoek niet akkoord
//                    case 'pm-not-approved':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['not-possible', 'not-approved', 'pm-not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
//                            //regel 23 Excel
//                            return 'no_execution';
//                        }
//                        return false;
//                }
//                break;
//            case 'subsidy-request':
//                switch ($this->quotationRequest->status->code_ref) {
//                    //Budgetaanvraag open
//                    case 'default':
//                        //regel 26 Excel
//                        return 'pending';
//                    //Budgetaanvraag gemaakt
//                    case 'made':
//                        //regel 27 Excel
//                        return 'pending';
//                    //Budgetaanvraag akkoord
//                    case 'pm-approved':
//                        //regel 28 Excel
//                        return 'pending';
//                    //Budgetaanvraag niet akkoord
//                    case 'pm-not-approved':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //Zijn er binnen deze kans andere budgetaanvragen waar de status "Uitgevoerd" / "executed" is
//                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'executed');
//
//                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['executed', 'not-possible', 'not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
//                            //regel 29 Excel
//                            return 'executed';
//                        }
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
//                            //regel 30 Excel
//                            return 'no_execution';
//                        }
//                        return false;
//                    //Budgetaanvraag verstuurd naar bewoner
//                    case 'under-review-occupant':
//                        //regel 31 Excel
//                        return 'pending';
//                    //Subsidieaanvraag in behandeling
//                    case 'under-review':
//                        //regel 32 Excel
//                        return 'pending';
//                    //Subsidie aanvraag beschikt
//                    case 'approved':
//                        //regel 33 Excel
//                        return 'pending';
//                    //Subsidie aanvraag niet beschikt
//                    case 'not-approved':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
//                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'executed');
//
//                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['executed', 'not-possible', 'not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
//                            //regel 34 Excel
//                            return 'executed';
//                        }
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
//                            //regel 35 Excel
//                            return 'no_execution';
//                        }
//                        return false;
//                    //Subsidievaststelling in behandeling
//                    case 'under-review-det':
//                        //regel 36 Excel
//                        return 'pending';
//                    //Subsidie vastgesteld
//                    case 'approved-det':
//                        //regel 37 Excel
//                        return 'in_progress';
//                    //Subsidie niet vastgesteld
//                    case 'not-approved-det':
//                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
//                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, ['done', 'cancelled'], 'no');
//
//                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
//                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, 'executed');
//
//                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
//                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, ['executed', 'not-possible', 'not-approved'], 'no');
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
//                            //regel 38 Excel
//                            return 'executed';
//                        }
//
//                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
//                            //regel 39 Excel
//                            return 'pending';
//                        }
//                        return false;
//                    //Aanvraag gekoppeld
//                    case 'linked':
//                        //regel 40 Excel
//                        return 'pending';
//                }
        }
    }

    private function otherOpportunityActionCount($opportunityActionId, $statusId = null, $codeRef2YesOrNo = "yes") {

        Log::info("opportunityActionId: " . $opportunityActionId);
        Log::info("quotationRequestStatusId: " . $statusId);
        Log::info("opportunity id: " . $this->opportunity->id);
//        Log::info($this->opportunity);
        Log::info("change quotationRequestId: " . $this->quotationRequest->id);

        // Fetch all records from the database
        if($statusId){
            $records = $this->opportunity->quotationRequests->where('opportunity_action_id', $opportunityActionId)->where('status_id', $statusId);
        } else {
            $records = $this->opportunity->quotationRequests->where('opportunity_action_id', $opportunityActionId);

        }
        $changeId = $this->quotationRequest->id ;
        $changeStatusId = $this->quotationRequest->status_id ;

        Log::info('vooraf');
        Log::info($records);

//        // Find the record with the specific ID and change its status_id
//        $records = $records->map(function ($record) use ($changeId, $changeStatusId) {
//            if ($record->id == $changeId) {
////                Log::info("changeId: " . $changeId);
////                Log::info("Huidig status id: " . $record->status_id);
////                Log::info("Nieuwe status id: " . $changeStatusId);
//
//                $record->status_id = $changeStatusId;
//            }
//            return $record;
//        });
        // Filter the records zonder huidige
        $filteredRecords = $records->filter(function ($record) use ($changeId){
//            Log::info("Record id: " . $record->id);
//            Log::info("Change id: " . $changeId);
//            if($record->id != $changeId){
//                Log::info('ander id niet overlaan');
//                return $record;
//            } else {
//                Log::info('zelfde id overslaan');
//            }
            return $record->id != (int) $changeId;
        });

        Log::info('achteraf');
        Log::info($filteredRecords);
        Log::info("count: " . $filteredRecords->count() );

//        $quotationRequests = $this->opportunity->whereHas('quotationRequests', function ($query) use ($codeRef, $codeRef2, $codeRef2YesOrNo) {
//            $query->whereHas('opportunityAction', function ($query2) use ($codeRef) {
//                $query2->where('code_ref', $codeRef);
//            });
//
//            if($codeRef2 !== null) {
//                if(is_array($codeRef2)) {
//                    if ($codeRef2YesOrNo === "no") {
//                        $query->whereHas('status', function ($query3) use ($codeRef2) {
//                            $query3->whereNotIn('code_ref', $codeRef2);
//                        });
//                    } else {
//                        $query->whereHas('status', function ($query3) use ($codeRef2) {
//                            $query3->whereIn('code_ref', $codeRef2);
//                        });
//                    }
//                } else {
//                    if ($codeRef2YesOrNo === "no") {
//                        $query->whereHas('status', function ($query3) use ($codeRef2) {
//                            $query3->where('code_ref', '!=', $codeRef2);
//                        });
//                    } else {
//                        $query->whereHas('status', function ($query3) use ($codeRef2) {
//                            $query3->where('code_ref', '=', $codeRef2);
//                        });
//                    }
//                }
//            }
//        });
//        Log::info("debug query");
//        $sql = str_replace(array('?'), array('\'%s\''), $quotationRequests->toSql());
//        $sql = vsprintf($sql, $quotationRequests->getBindings());
//        Log::info($sql);

        return $filteredRecords->count();
    }

    private function getOpportunityStatus($newOpportunityStatusCodeRef) {
        $opportunityStatus = OpportunityStatus::where('code_ref', $newOpportunityStatusCodeRef)->first();
        if($opportunityStatus){
            return $opportunityStatus->name;
        }
        return 'Onbekende kansstatus "' . $newOpportunityStatusCodeRef . '"';
    }
    private function setOpportunityStatus($newOpportunityStatusCodeRef) {
        $opportunityStatus = OpportunityStatus::where('code_ref', $newOpportunityStatusCodeRef)->first();
        if($opportunityStatus){
            $this->opportunity->status_id = $opportunityStatus->id;
            $this->opportunity->save();
            return $opportunityStatus->name;
        }
        return 'Onbekende kansstatus "' . $newOpportunityStatusCodeRef . '"';
    }

}