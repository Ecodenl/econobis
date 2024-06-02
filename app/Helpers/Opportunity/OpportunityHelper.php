<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;

class OpportunityHelper
{
    private $opportunity;
    private $quotationRequestStatusCodeRef;
    private $opportunityActionCodeRef;
    public function __construct(QuotationRequest $quotationRequest)
    {
        //Opportunity = Kans
        //opportunityAction = Acties
        //QuotationRequest = Kansactie
        $this->opportunity = $quotationRequest->opportunity;
        $this->opportunityActionCodeRef = $quotationRequest->opportunityAction->code_ref;
        $this->quotationRequestStatusCodeRef = $quotationRequest->status->code_ref;
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

        switch ($this->opportunityActionCodeRef) {
            case 'visit':
                switch ($this->quotationRequestStatusCodeRef) {
                    //afspraak gemaakt
                    case 'made':
                        //regel 2 en 3 Excel
                        return 'in_progress';
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        //regel 5 en 6 Excel
                        return 'pending';
                    //Afspraak gedaan?
                    case 'done':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $otherQuotationRequestsCount = $this->otherQuotationRequestsCount('quotation-request');

                        //zijn er binnen deze kans ook offerteverzoeken met status "Uitgevoerd" / "executed"
                        $otherQuotationRequestsWithStatusExecutedCount = $this->otherQuotationRequestsCount('quotation-request', 'executed');

                        //zijn er binnen deze kans ook offerteverzoeken met status "Opdracht" / "mandate"
                        $otherQuotationRequestsWithStatusMandateCount = $this->otherQuotationRequestsCount('quotation-request', 'mandate');

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gemaakt" / "made" is
                        $otherVisitsWithStatusMadeCount = $this->otherQuotationRequestsCount('visit', 'made', 'no');

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gedaan" / "done" is
                        $otherVisitsHaveOtherStatusThenDoneCount = $this->otherQuotationRequestsCount('visit', 'done', 'no');

                        if($otherVisitsWithStatusMadeCount === 0 && $otherQuotationRequestsCount === 0) {
                            //regel 7 Excel
                            return 'executed';
                        } else {
                            if ($otherVisitsWithStatusMadeCount === 0 && $otherVisitsHaveOtherStatusThenDoneCount === 0 && $otherQuotationRequestsWithStatusExecutedCount > 0 && $otherQuotationRequestsWithStatusMandateCount === 0) {
                                //regel 8 Excel
                                return 'executed';
                            } else {
                                //regel 9 Excel
                                return 'pending';
                            }
                        }
                    case 'cancelled':
                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveOtherStatusThenCancelledCount = $this->otherQuotationRequestsCount('visit', 'cancelled', 'no');

                        //zijn er binnen deze kans ook offerteverzoeken
                        $quotationRequestsCount = $this->otherQuotationRequestsCount('quotation-request');

                        if($otherVisitsHaveOtherStatusThenCancelledCount === 0 && $quotationRequestsCount === 0) {
                            //regel 10 Excel
                            return 'no_execution';
                        }
                        return false;
                }
                break;
            case 'quotation-request':
                switch ($this->quotationRequestStatusCodeRef) {
                    //Offerte aangevraagd
                    case 'default':
                        //regel 14 Excel
                        return 'pending';
                    //Offerte aanvraag in behandeling
                    case 'under-review':
                        //regel 15 Excel
                        return 'pending';
                    //In overweging bij bewoner
                    case 'under-review-occupant':
                        //regel 16 Excel
                        return 'pending';
                    //Bewoner is akkoord
                    case 'approved':
                        //zijn er binnen deze kans andere offerteverzoeken waar de status "Opdracht" / "mandate" is
                        $otherQuotationRequestsHaveStatusMandateCount = $this->otherQuotationRequestsCount('quotation-request', 'mandate');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Opdracht" / "mandate", "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount = $this->otherQuotationRequestsCount('quotation-request', ['mandate', 'not-approved', 'not-possible', 'pm-not-approved'], 'no');

                        if($otherQuotationRequestsHaveStatusMandateCount > 0 && $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount === 0) {
                            //regel 17 Excel
                            return 'pending';
                        }
                        return false;
                    //Bewoner heeft afgewezen
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['not-approved', 'not-possible', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount === 0) {
                            //regel 18 Excel
                            return 'no_execution';
                        }
                        return false;
                    //Offerte niet mogelijk
                    case 'not-possible':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved" of "Offerte niet mogelijk" / "not-possible" is
                        $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount = $this->otherQuotationRequestsCount('quotation-request', ['not-approved', 'not-possible'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount === 0) {
                            //regel 19 Excel
                            return 'no_execution';
                        }
                        return false;
                    //Geen reactie ontvangen
                    case 'no-response':
                        //regel 20 Excel
                        return 'pending';
                    //Uitgevoerd
                    case 'executed':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['not-possible', 'not-approved', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
                            //regel 21 Excel
                            return 'executed';
                        }
                        return false;
                    //Offerteverzoek akkoord
                    case 'pm-approved':
                        //regel 22 Excel
                        return 'pending';
                    //Offerteverzoek niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['not-possible', 'not-approved', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
                            //regel 23 Excel
                            return 'no_execution';
                        }
                        return false;
                }
                break;
            case 'subsidy-request':
                switch ($this->quotationRequestStatusCodeRef) {
                    //Budgetaanvraag open
                    case 'default':
                        //regel 26 Excel
                        return 'pending';
                    //Budgetaanvraag gemaakt
                    case 'made':
                        //regel 27 Excel
                        return 'pending';
                    //Budgetaanvraag akkoord
                    case 'pm-approved':
                        //regel 28 Excel
                        return 'pending';
                    //Budgetaanvraag niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere budgetaanvragen waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount('quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 29 Excel
                            return 'executed';
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 30 Excel
                            return 'no_execution';
                        }
                        return false;
                    //Budgetaanvraag verstuurd naar bewoner
                    case 'under-review-occupant':
                        //regel 31 Excel
                        return 'pending';
                    //Subsidieaanvraag in behandeling
                    case 'under-review':
                        //regel 32 Excel
                        return 'pending';
                    //Subsidie aanvraag beschikt
                    case 'approved':
                        //regel 33 Excel
                        return 'pending';
                    //Subsidie aanvraag niet beschikt
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount('quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 34 Excel
                            return 'executed';
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 35 Excel
                            return 'no_execution';
                        }
                        return false;
                    //Subsidievaststelling in behandeling
                    case 'under-review-det':
                        //regel 36 Excel
                        return 'pending';
                    //Subsidie vastgesteld
                    case 'approved-det':
                        //regel 37 Excel
                        return 'in_progress';
                    //Subsidie niet vastgesteld
                    case 'not-approved-det':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount('visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount('quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount('quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 38 Excel
                            return 'executed';
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 39 Excel
                            return 'pending';
                        }
                        return false;
                    //Aanvraag gekoppeld
                    case 'linked':
                        //regel 40 Excel
                        return 'pending';
                }
        }
    }

    private function otherQuotationRequestsCount($codeRef, $codeRef2 = null, $codeRef2YesOrNo = "yes") {
        $quotationRequests = $this->opportunity->whereHas('quotationRequests', function ($query) use ($codeRef, $codeRef2, $codeRef2YesOrNo) {
            $query->whereHas('opportunityAction', function ($query2) use ($codeRef) {
                $query2->where('code_ref', $codeRef);
            });

            if($codeRef2 !== null) {
                if(is_array($codeRef2)) {
                    if ($codeRef2YesOrNo === "no") {
                        $query->whereHas('status', function ($query3) use ($codeRef2) {
                            $query3->whereNotIn('code_ref', $codeRef2);
                        });
                    } else {
                        $query->whereHas('status', function ($query3) use ($codeRef2) {
                            $query3->whereIn('code_ref', $codeRef2);
                        });
                    }
                } else {
                    if ($codeRef2YesOrNo === "no") {
                        $query->whereHas('status', function ($query3) use ($codeRef2) {
                            $query3->where('code_ref', '!=', $codeRef2);
                        });
                    } else {
                        $query->whereHas('status', function ($query3) use ($codeRef2) {
                            $query3->where('code_ref', '=', $codeRef2);
                        });
                    }
                }
            }
        })->count();

        return $quotationRequests;
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