<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;

class OpportunityHelper
{
    //Opportunity = Kans
    //QuotationRequest = Kansactie
    //opportunityAction = Acties

    //TODO:
    // Nog niet getest, alleen code opgezet

    public function updateOpportunityStatus(QuotationRequest $quotationRequest) {
        $opportunity = $quotationRequest->opportunity;
        switch ($quotationRequest->opportunityAction->code_ref) {
            case 'visit':
                switch ($quotationRequest->status->code_ref) {
                    //afspraak gemaakt
                    case 'made':
                        //regel 2 en 3 Excel
                        $this->setOpportunityStatus($opportunity, 'in_progress');
                        break;
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        //regel 5 en 6 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Afspraak gedaan?
                    case 'done':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $otherQuotationRequestsCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request');

                        //zijn er binnen deze kans ook offerteverzoeken met status "Uitgevoerd" / "executed"
                        $otherQuotationRequestsWithStatusExecutedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'executed');

                        //zijn er binnen deze kans ook offerteverzoeken met status "Opdracht" / "mandate"
                        $otherQuotationRequestsWithStatusMandateCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'mandate');

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gemaakt" / "made" is
                        $otherVisitsWithStatusMadeCount = $this->otherQuotationRequestsCount($opportunity, 'visit', 'made', 'no');

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gedaan" / "done" is
                        $otherVisitsHaveOtherStatusThenDoneCount = $this->otherQuotationRequestsCount($opportunity, 'visit', 'done', 'no');

                        if($otherVisitsWithStatusMadeCount === 0 && $otherQuotationRequestsCount === 0) {
                            //regel 7 Excel
                            $this->setOpportunityStatus($opportunity, 'executed');
                        } else {
                            if ($otherVisitsWithStatusMadeCount === 0 && $otherVisitsHaveOtherStatusThenDoneCount === 0 && $otherQuotationRequestsWithStatusExecutedCount > 0 && $otherQuotationRequestsWithStatusMandateCount === 0) {
                                //regel 8 Excel
                                $this->setOpportunityStatus($opportunity, 'executed');
                            } else {
                                //regel 9 Excel
                                $this->setOpportunityStatus($opportunity, 'pending');
                            }
                        }
                        break;
                    case 'cancelled':
                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveOtherStatusThenCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', 'cancelled', 'no');

                        //zijn er binnen deze kans ook offerteverzoeken
                        $quotationRequestsCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request');

                        if($otherVisitsHaveOtherStatusThenCancelledCount === 0 && $quotationRequestsCount === 0) {
                            //regel 10 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                }
                break;
            case 'quotation-request':
                switch ($quotationRequest->status->code_ref) {
                    //Offerte aangevraagd
                    case 'default':
                        //regel 14 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Offerte aanvraag in behandeling
                    case 'under-review':
                        //regel 15 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //In overweging bij bewoner
                    case 'under-review-occupant':
                        //regel 16 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Bewoner is akkoord
                    case 'approved':
                        //zijn er binnen deze kans andere offerteverzoeken waar de status "Opdracht" / "mandate" is
                        $otherQuotationRequestsHaveStatusMandateCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'mandate');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Opdracht" / "mandate", "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['mandate', 'not-approved', 'not-possible', 'pm-not-approved'], 'no');

                        if($otherQuotationRequestsHaveStatusMandateCount > 0 && $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossibleCount === 0) {
                            //regel 17 Excel
                            $this->setOpportunityStatus($opportunity, 'pending');
                        }
                        break;
                    //Bewoner heeft afgewezen
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['not-approved', 'not-possible', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApprovedCount === 0) {
                            //regel 18 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Offerte niet mogelijk
                    case 'not-possible':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved" of "Offerte niet mogelijk" / "not-possible" is
                        $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['not-approved', 'not-possible'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossibleCount === 0) {
                            //regel 19 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Geen reactie ontvangen
                    case 'no-response':
                        //regel 20 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Uitgevoerd
                    case 'executed':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['not-possible', 'not-approved', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
                            //regel 21 Excel
                            $this->setOpportunityStatus($opportunity, 'executed');
                        }
                        break;
                    //Offerteverzoek akkoord
                    case 'pm-approved':
                        //regel 22 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Offerteverzoek niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['not-possible', 'not-approved', 'pm-not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApprovedCount === 0) {
                            //regel 23 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                }
                break;
            case 'subsidy-request':
                switch ($quotationRequest->status->code_ref) {
                    //Budgetaanvraag open
                    case 'default':
                        //regel 26 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag gemaakt
                    case 'made':
                        //regel 27 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag akkoord
                    case 'pm-approved':
                        //regel 28 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere budgetaanvragen waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 29 Excel
                            $this->setOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 30 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Budgetaanvraag verstuurd naar bewoner
                    case 'under-review-occupant':
                        //regel 31 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidieaanvraag in behandeling
                    case 'under-review':
                        //regel 32 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie aanvraag beschikt
                    case 'approved':
                        //regel 33 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie aanvraag niet beschikt
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 34 Excel
                            $this->setOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 35 Excel
                            $this->setOpportunityStatus($opportunity, 'no_execution');
                        }
                    //Subsidievaststelling in behandeling
                    case 'under-review-det':
                        //regel 36 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie vastgesteld
                    case 'approved-det':
                        //regel 37 Excel
                        $this->setOpportunityStatus($opportunity, 'in_progress');
                        break;
                    //Subsidie niet vastgesteld
                    case 'not-approved-det':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelledCount = $this->otherQuotationRequestsCount($opportunity, 'visit', ['done', 'cancelled'], 'no');

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecutedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', 'executed');

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount = $this->otherQuotationRequestsCount($opportunity, 'quotation-request', ['executed', 'not-possible', 'not-approved'], 'no');

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && $otherQuotationRequestsHaveStatusExecutedCount > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount === 0) {
                            //regel 38 Excel
                            $this->setOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelledCount === 0 && ($otherQuotationRequestsHaveStatusExecutedCount === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApprovedCount > 0)) {
                            //regel 39 Excel
                            $this->setOpportunityStatus($opportunity, 'pending');
                        }
                        break;
                    //Aanvraag gekoppeld
                    case 'linked':
                        //regel 40 Excel
                        $this->setOpportunityStatus($opportunity, 'pending');
                        break;
                }
                break;
        }
    }

    private function otherQuotationRequestsCount($opportunity, $codeRef, $codeRef2 = null, $codeRef2YesOrNo = "yes") {
        $quotationRequests = $opportunity->whereHas('quotationRequests', function ($query) use ($codeRef, $codeRef2, $codeRef2YesOrNo) {
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

    private function setOpportunityStatus($opportunity, $status) {
        $statusId = $this->OpportunityStatusId($status);
        $opportunity->status_id = $statusId;
        $opportunity->save();
    }

    private function OpportunityStatusId($codeRef) {
        $status = OpportunityStatus::where('code_ref', $codeRef)->first();

        return $status->id;
    }
}