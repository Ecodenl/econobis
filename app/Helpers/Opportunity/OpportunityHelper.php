<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;

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
            $this->setOpportunityStatus($newOpportunityStatusCodeRef);
        }
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
        $quotationRequestStatusNoResponseId = QuotationRequestStatus::where('opportunity_action_id', $this->opportunityActionQuotationRequestId)->where('code_ref', 'no-response')->first()->id;
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
            // Bezoek
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

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
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
                            return false;
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
                        return false;
                }
                break;

            // Offerteverzoek:
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
                        if ($otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                            && $otherQuotationRequestsWithStatusUnderReviewCount === 0) {
                            return 'mandate';
                        }
                        return false;
                    //Bewoner heeft afgewezen
                    case 'not-approved':
                    //Offerteverzoek niet akkoord
                    case 'pm-not-approved':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusExecutedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord' of 'Uitgevoerd' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusExecutedCount === 0
                            ) {
                                return 'no_execution';
                            }
                        }
                        return false;
                    //Offerte niet mogelijk
                    case 'not-possible':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusExecutedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusExecutedId);
                            $otherQuotationRequestsWithStatusPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord', 'Uitgevoerd' of 'Offerteverzoek niet akkoord' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusExecutedCount === 0
                                && $otherQuotationRequestsWithStatusPmNotApprovedCount === 0
                            ) {
                                return 'no_execution';
                            }
                        }
                        return false;

                    //Uitgevoerd
                    case 'executed':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord' of 'Offerteverzoek niet akkoord' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusPmNotApprovedCount === 0
                            ) {
                                return 'executed';
                            }
                        }
                        return false;
                }

            // Budgetaanvraag
            case 'subsidy-request':
                switch ($this->quotationRequest->status->code_ref) {
                    //Budgetaanvraag open
                    case 'default':
                        return 'subsidy-request_pending';
                    //Budgetaanvraag gemaakt
                    case 'made':
                        return 'subsidy-request_pending';
                    //Budgetaanvraag akkoord
                    case 'pm-approved':
                        return 'subsidy-request_pending';
                    //Aanvraag gekoppeld
                    case 'linked':
                        return 'subsidy-request_pending';
                    //Budgetaanvraag verstuurd naar bewoner
                    case 'under-review-occupant':
                        return 'subsidy-request_pending';
                    //Subsidieaanvraag in behandeling
                    case 'under-review':
                        return 'subsidy-request_pending';
                    //Subsidie aanvraag beschikt
                    case 'approved':
                        return 'subsidy-request_pending';
                    //Subsidievaststelling in behandeling
                    case 'under-review-det':
                        return 'subsidy-request_pending';
                    //Subsidie vastgesteld
                    case 'approved-det':
                        return 'subsidy-request_granted';

                    //Budgetaanvraag niet akkoord
                    case 'pm-not-approved':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord' of 'Offerteverzoek niet akkoord' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusPmNotApprovedCount === 0
                            ) {
                                return 'executed';
                            // Anders: Subsidie aanvraag afgewezen
                            } else {
                                return 'subsidy-request_rejected';
                            }
                        }
                        return false;

                    //Subsidie aanvraag niet beschikt
                    case 'not-approved':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord' of 'Offerteverzoek niet akkoord' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusPmNotApprovedCount === 0
                            ) {
                                return 'executed';
                                // Anders: Subsidie aanvraag afgewezen
                            } else {
                                return 'subsidy-request_rejected';
                            }
                        }
                        return false;

                    //Subsidie niet vastgesteld
                    case 'not-approved-det':

                        //zijn er binnen deze kans ook bezoeken met status "Geen afspraak gemaakt"
                        $otherVisitsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusDefaultId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusNotMadeId);

                        //zijn er binnen deze kans ook bezoeken met status "Afspraak gemaakt"
                        $otherVisitsWithStatusMadeCount = $this->otherOpportunityActionCount($this->opportunityActionVisitId, $visitStatusMadeId);

                        // als alle afspraken status niet status 'Geen afspraak gemaakt', 'Geen afspraak kunnen maken' of 'Afspraak gemaakt' hebben.
                        if($otherVisitsWithStatusDefaultCount === 0
                            && $otherVisitsWithStatusNotMadeCount === 0
                            && $otherVisitsWithStatusMadeCount === 0)
                        {
                            $otherQuotationRequestsWithStatusDefaultCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusDefaultId);
                            $otherQuotationRequestsWithStatusUnderReviewCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewId);
                            $otherQuotationRequestsWithStatusUnderReviewOccupantCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusUnderReviewOccupantId);
                            $otherQuotationRequestsWithStatusNoResponseCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNoResponseId);
                            $otherQuotationRequestsWithStatusPmApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmApprovedId);
                            $otherQuotationRequestsWithStatusNotMadeCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusNotMadeId);
                            $otherQuotationRequestsWithStatusApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusApprovedId);
                            $otherQuotationRequestsWithStatusPmNotApprovedCount = $this->otherOpportunityActionCount($this->opportunityActionQuotationRequestId, $quotationRequestStatusPmNotApprovedId);

                            // als alle offerteverzoeken niet status 'Offerte aangevraagd', 'Offerte aanvraag in behandeling', 'In overweging bij bewoner', "Geen reactie ontvangen',
                            // 'Offerteverzoek akkoord', 'Offerte nog niet aangevraagd', 'Bewoner is akkoord' of 'Offerteverzoek niet akkoord' hebben:
                            // Nieuwe Kansstatus wordt: Geen uitvoering.
                            if( $otherQuotationRequestsWithStatusDefaultCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewCount === 0
                                && $otherQuotationRequestsWithStatusUnderReviewOccupantCount === 0
                                && $otherQuotationRequestsWithStatusNoResponseCount === 0
                                && $otherQuotationRequestsWithStatusPmApprovedCount === 0
                                && $otherQuotationRequestsWithStatusNotMadeCount === 0
                                && $otherQuotationRequestsWithStatusApprovedCount === 0
                                && $otherQuotationRequestsWithStatusPmNotApprovedCount === 0
                            ) {
                                return 'executed';
                                // Anders: Subsidie aanvraag afgewezen
                            } else {
                                return 'subsidy-request_pending';
                            }
                        }
                        return false;
                }
        }
    }

    private function otherOpportunityActionCount($opportunityActionId, $statusId = null) {

        // Fetch all records from the database
        if($statusId){
            $records = $this->opportunity->quotationRequests->where('opportunity_action_id', $opportunityActionId)->where('status_id', $statusId);
        } else {
            $records = $this->opportunity->quotationRequests->where('opportunity_action_id', $opportunityActionId);

        }
        $changeId = $this->quotationRequest->id ;

        // Filter the records zonder huidige
        $filteredRecords = $records->filter(function ($record) use ($changeId){
            return $record->id != (int) $changeId;
        });

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
        }
    }

}