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


    public function showUpdateOpportunityStatus() {
        $newOpportunityStatusCodeRef = $this->getNewOpportunityStatus();
        if($newOpportunityStatusCodeRef) {
            $response = $this->getOpportunityStatus($newOpportunityStatusCodeRef);
            return $response;
        }
        return 'blijft ongewijzigd';
    }

    public function updateOpportunityStatus() {
        $newOpportunityStatusCodeRef = $this->getNewOpportunityStatus();
        if($newOpportunityStatusCodeRef){
            $response = $this->setOpportunityStatus($newOpportunityStatusCodeRef);
            return $response;
        }
        return 'blijft ongewijzigd';
    }
    private function getNewOpportunityStatus() {

// Offerteverzoek statussen:
// Offerte nog niet aangevraagd	    not-made
// Offerte aangevraagd	            default
// Offerte aanvraag in behandeling	under-review
// In overweging bij bewoner	    under-review-occupant
// Bewoner is akkoord	            approved
// Bewoner heeft afgewezen	        not-approved
// Offerte niet mogelijk	        not-possible
// Geen reactie ontvangen	        no-response
// Uitgevoerd	                    executed
// Offerteverzoek akkoord	        pm-approved
// Offerteverzoek niet akkoord	    pm-not-approved

        $quotationRequestStatusNotMadeId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'not-made')->first()->id;
        $quotationRequestStatusDefaultId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'default')->first()->id;
        $quotationRequestStatusUnderReviewId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'under-review')->first()->id;
        $quotationRequestStatusUnderReviewOccupantId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'under-review-occupant')->first()->id;
        $quotationRequestStatusApprovedId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'approved')->first()->id;
//        $quotationRequestStatusNotApprovedId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'not-approved')->first()->id;
//        $quotationRequestStatusNotPossibleId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'not-possible')->first()->id;
//        $quotationRequestStatusNoResponseId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'no-response')->first()->id;
        $quotationRequestStatusExecutedId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'executed')->first()->id;
        $quotationRequestStatusPmApprovedId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'pm-approved')->first()->id;
        $quotationRequestStatusPmNotApprovedId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'pm-not-approved')->first()->id;


// Bezoek statussen:
// Geen afspraak gemaakt	    default
// Geen afspraak kunnen maken	not-made
// Afspraak gemaakt	            made
// Afspraak uitgevoerd	        done
// Afspraak afgezegd	        cancelled

        $visitStatusDefaultId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'default')->first()->id;
        $visitStatusNotMadeId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'not-made')->first()->id;
        $visitStatusMadeId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'made')->first()->id;
        $visitStatusDoneId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'done')->first()->id;
//        $visitStatusCancelledId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionVisitId)->where('code_ref', 'cancelled')->first()->id;

// Budgetaanvraag statussen:
// Budgetaanvraag open	                    default
// Budgetaanvraag gemaakt	                made
// Budgetaanvraag akkoord	                pm-approved
// Budgetaanvraag niet akkoord	            pm-not-approved
// Aanvraag gekoppeld	                    linked
// Budgetaanvraag verstuurd naar bewoner	under-review-occupant
// Subsidieaanvraag in behandeling      	under-review
// Subsidie aanvraag beschikt	            approved
// Subsidie aanvraag niet beschikt	        not-approved
// Subsidievaststelling in behandeling	    under-review-det
// Subsidie vastgesteld	                    approved-det
// Subsidie niet vastgesteld	            not-approved-det

        switch ($this->quotationRequest->opportunityAction->code_ref) {
            case 'visit':
                switch ($this->quotationRequest->status->code_ref) {
                    //afspraak gemaakt
                    case 'made':
                        return 'in_progress';
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        return 'pending';
                    //Afspraak uitgevoerd
                    case 'done':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $otherQuotationRequestsCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, null);

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt""
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // zijn er binnen deze kans geen offerteverzoeken en andere bezoeken niet status "Geen afspraak gemaakt" of "Afspraak gemaakt"
                        // Nieuwe Kansstatus wordt: Uitgevoerd.
                        if($otherQuotationRequestsCount === 0 && $otherVisitsWithStatusDefaultCount === 0 && $otherVisitsWithStatusMadeCount === 0 ) {
                            return 'executed';
                        }

                        //zijn er binnen deze kans ook offerteverzoeken met status "Uitgevoerd"
                        $otherQuotationRequestsExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusExecutedId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Offerte nog niet aangevraagd"
                        $otherQuotationRequestsNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Offerte aangevraagd"
                        $otherQuotationRequestsDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Offerte aanvraag in behandeling"
                        $otherQuotationRequestsUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "In overweging bij bewoner"
                        $otherQuotationRequestsUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Bewoner is akkoord"
                        $otherQuotationRequestsApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Offerteverzoek akkoord"
                        $otherQuotationRequestsPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);

                        //zijn er binnen deze kans ook offerteverzoeken met status "Offerteverzoek niet akkoord"
                        $otherQuotationRequestsPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                        // zijn er binnen deze kans wel offerteverzoeken
                        if($otherQuotationRequestsCount !== 0){
                            // is er minstens 1 offertverzoek met status "Uitgevoerd" en andere niet de status "Offerte nog niet aangevraagd", "Offerte aangevraagd",
                            // "Offerte aanvraag in behandeling", "In overweging bij bewoner" of "Bewoner is akkoord", "Offerteverzoek akkoord" of "Offerteverzoek niet akkoord" hebben.
                            // Nieuwe Kansstatus wordt: Uitgevoerd.
                            if($otherQuotationRequestsExecutedCount !== 0
                                && $otherQuotationRequestsNotMadeCount === 0
                                && $otherQuotationRequestsDefaultCount === 0
                                && $otherQuotationRequestsUnderReviewCount === 0
                                && $otherQuotationRequestsUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsApprovedCount === 0
                                && $otherQuotationRequestsPmApprovedCount === 0
                                && $otherQuotationRequestsPmNotApprovedCount === 0)  {
                                return 'executed';
                            }
                            // Als 1 van de andere status "Offerte nog niet aangevraagd", "Offerte aangevraagd",
                            // "Offerte aanvraag in behandeling", "In overweging bij bewoner" of "Bewoner is akkoord", "Offerteverzoek akkoord" of "Offerteverzoek niet akkoord" hebben.
                            // Nieuwe Kansstatus wordt: In afwachting.
                            if($otherQuotationRequestsNotMadeCount !== 0
                                || $otherQuotationRequestsDefaultCount !== 0
                                || $otherQuotationRequestsUnderReviewCount !== 0
                                || $otherQuotationRequestsUnderReviewOccupantCount !== 0
                                || $otherQuotationRequestsApprovedCount !== 0
                                || $otherQuotationRequestsPmApprovedCount !== 0
                                || $otherQuotationRequestsPmNotApprovedCount !== 0)  {
                                return 'pending';
                            }
                        }
                    // Afspraak afgezegd
                    case 'cancelled':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $otherQuotationRequestsCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, null);

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak kunnen maken"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak uitgevoerd"
                        $otherVisitsWithStatusDoneCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDoneId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak afgezegd"
//                        $otherVisitsWithStatusCancelledCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusCancelledId);

                        // zijn er binnen deze kans geen offerteverzoeken en andere bezoeken allemaal status "Afspraak afgezegd"
                        // Nieuwe Kansstatus wordt: Geen uitvoering
                        if($otherQuotationRequestsCount === 0
                            && $otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0
                            && $otherVisitsWithStatusDoneCount === 0 ) {
                            return 'no_execution';
                        }
                }
                break;
// Offerteverzoek statussen:
// Offerte aangevraagd	            default
// Offerte aanvraag in behandeling	under-review
// In overweging bij bewoner	    under-review-occupant
// Geen reactie ontvangen	        no-response
// Offerteverzoek akkoord	        pm-approved

// Offerte nog niet aangevraagd	    not-made
// Bewoner is akkoord	            approved
// Bewoner heeft afgewezen	        not-approved
// Offerte niet mogelijk	        not-possible
// Uitgevoerd	                    executed
// Offerteverzoek niet akkoord	    pm-not-approved
            case 'quotation-request':
                switch ($this->quotationRequest->status->code_ref) {
                    // Offerte aangevraagd
                    case 'default':
                        return 'pending';
                    //Offerte aanvraag in behandeling
                    case 'under-review':
                        return 'pending';
                    //In overweging bij bewoner
                    case 'under-review-occupant':
                        return 'pending';
                    //Geen reactie ontvangen
                    case 'no-response':
                        return 'pending';
                    //Offerteverzoek akkoord
                    case 'pm-approved':
                        return 'pending';

                    //Bewoner is akkoord
                    case 'approved':
                        //zijn er binnen deze kans andere offerteverzoeken waar de status "Bewoner is akkoord" is
//                        $otherQuotationRequestsHaveStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);

                        //zijn er binnen deze kans ook bezoeken met status "In overweging bij bewoner"
                        $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);

                        //zijn er binnen deze kans ook bezoeken met status "Offerte aanvraag in behandeling"
                        $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);

                        // is er minstens 1 offertverzoek met status "Bewoner is akkoord" en andere niet de status "In overweging bij bewoner" of "Offerte aanvraag in behandeling" hebben.
                        // Nieuwe Kansstatus wordt: Opdracht.
//                        if($otherQuotationRequestsHaveStatusApprovedCount > 0
                        if($otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                            && $otherQuotationRequestsWithStatusUnderReviewCount === 0  ) {
                            return 'mandate';
                        }
                        return false;
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
                }
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