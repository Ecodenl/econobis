<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Opportunity\Opportunity;

class InvoiceHelper
{
    //Opportunity = Kans
    //QuotationRequest = Kansactie
    //opportunityAction = Acties

    //TODO:
    // Nog niet getest, alleen code opgezet
    // Kijken of alles op de meest logische plek staat of dat we bepaalde variabelen ook eerder in de boom kunnen opbouwen (eventueel als functie, zie hieronder).
    // variabelen omzetten naar functies ivm hergebruik

    public function updateOpportunityStatus(QuotationRequest $quotationRequest) {
        $opportunity = $quotationRequest->opportunity;
        switch ($quotationRequest->opportunityAction->code_ref) {
            case 'visit':
                switch ($quotationRequest->status->code_ref) {
                    //afspraak gemaakt
                    case 'made':
                        //regel 2 en 3 Excel
                        $this->SetOpportunityStatus($opportunity, 'in_progress');
                        break;
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        //regel 5 en 6 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Afspraak gedaan?
                    case 'done':
                        //zijn er binnen deze kans ook offerteverzoeken
                        $quotationRequests = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                        })->count();

                        //zijn er binnen deze kans ook offerteverzoeken met status "Uitgevoerd" / "executed"
                        $quotationRequestsWithStatusDone = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', '=', 'executed');
                            });
                        })->count();

                        //zijn er binnen deze kans ook offerteverzoeken met status "Opdracht" / "mandate"
                        $quotationRequestsWithStatusMandate = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', '=', 'mandate');
                            });
                        })->count();

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gemaakt" / "made" is
                        $otherVisitsWithStatusMade = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', '!=', 'made');
                            });
                        })->count();

                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak gedaan" / "done" is
                        $otherVisitsHaveOtherStatusThenDone = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', '!=', 'done');
                            });
                        })->count();

                        if($otherVisitsWithStatusMade === 0 && $quotationRequests === 0) {
                            //regel 7 Excel
                            $this->SetOpportunityStatus($opportunity, 'executed');
                        } else {
                            if ($otherVisitsWithStatusMade === 0 && $otherVisitsHaveOtherStatusThenDone === 0 && $quotationRequestsWithStatusDone > 0 && $quotationRequestsWithStatusMandate === 0) {
                                //regel 8 Excel
                                $this->SetOpportunityStatus($opportunity, 'executed');
                            } else {
                                //regel 9 Excel
                                $this->SetOpportunityStatus($opportunity, 'pending');
                            }
                        }
                        break;
                    case 'cancelled':
                        //zijn er binnen deze kans andere bezoekacties waar de status niet "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveOtherStatusThenCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', '!=', 'cancelled');
                            });
                        })->count();

                        //zijn er binnen deze kans ook offerteverzoeken
                        $quotationRequests = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                        })->count();

                        if($otherVisitsHaveOtherStatusThenCancelled === 0 && $quotationRequests === 0) {
                            //regel 10 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                }
                break;
            case 'quotation-request':
                switch ($quotationRequest->status->code_ref) {
                    //Offerte aangevraagd
                    case 'default':
                        //regel 14 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Offerte aanvraag in behandeling
                    case 'under-review':
                        //regel 15 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //In overweging bij bewoner
                    case 'under-review-occupant':
                        //regel 16 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Bewoner is akkoord
                    case 'approved':
                        //zijn er binnen deze kans andere offerteverzoeken waar de status "Opdracht" / "mandate" is
                        $otherQuotationRequestsHaveStatusMandate = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', 'mandate');
                            });
                        })->count();

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Opdracht" / "mandate", "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossible = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['mandate', 'not-approved', 'not-possible', 'pm-not-approved']);
                            });
                        })->count();

                        if($otherQuotationRequestsHaveStatusMandate > 0 && $otherQuotationRequestsHaveStatusOtherThenMandateNotApprovedNotPossiblePmNotPossible === 0) {
                            //regel 17 Excel
                            $this->SetOpportunityStatus($opportunity, 'pending');
                        }
                        break;
                    //Bewoner heeft afgewezen
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved", "Offerte niet mogelijk" / "not-possible" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['not-approved', 'not-possible', 'pm-not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherVisitsHaveStatusOtherThenNotApprovedNotPossiblePmNotApproved === 0) {
                            //regel 18 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Offerte niet mogelijk
                    case 'not-possible':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Bewoner heeft afgewezen" / "not-approved" of "Offerte niet mogelijk" / "not-possible" is
                        $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossible = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['not-approved', 'not-possible']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusOtherThenNotApprovedNotPossible === 0) {
                            //regel 19 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Geen reactie ontvangen
                    case 'no-response':
                        //regel 20 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Uitgevoerd
                    case 'executed':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['not-possible', 'not-approved', 'pm-not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApproved === 0) {
                            //regel 21 Excel
                            $this->SetOpportunityStatus($opportunity, 'executed');
                        }
                        break;
                    //Offerteverzoek akkoord
                    case 'pm-approved':
                        //regel 22 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Offerteverzoek niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //zijn er binnen deze kans andere offerteverzoeken waar de status niet "Offerte niet mogelijk" / "not-possible", "Bewoner heeft afgewezen" / "not-approved" of "Offerteverzoek niet akkoord" / "pm-not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['not-possible', 'not-approved', 'pm-not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusOtherThenNotPossibleNotApprovedPmNotApproved === 0) {
                            //regel 23 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                }
                break;
            case 'subsidy-request':
                switch ($quotationRequest->status->code_ref) {
                    //Budgetaanvraag open
                    case 'default':
                        //regel 26 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag gemaakt
                    case 'made':
                        //regel 27 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag akkoord
                    case 'pm-approved':
                        //regel 28 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Budgetaanvraag niet akkoord
                    case 'pm-not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //Zijn er binnen deze kans andere budgetaanvragen waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecuted = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', "executed");
                            });
                        })->count();

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['executed', 'not-possible', 'not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusExecuted > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved === 0) {
                            //regel 29 Excel
                            $this->SetOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && ($otherQuotationRequestsHaveStatusExecuted === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved > 0)) {
                            //regel 30 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                        break;
                    //Budgetaanvraag verstuurd naar bewoner
                    case 'under-review-occupant':
                        //regel 31 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidieaanvraag in behandeling
                    case 'under-review':
                        //regel 32 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie aanvraag beschikt
                    case 'approved':
                        //regel 33 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie aanvraag niet beschikt
                    case 'not-approved':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecuted = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', "executed");
                            });
                        })->count();

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['executed', 'not-possible', 'not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusExecuted > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved === 0) {
                            //regel 34 Excel
                            $this->SetOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && ($otherQuotationRequestsHaveStatusExecuted === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved > 0)) {
                            //regel 35 Excel
                            $this->SetOpportunityStatus($opportunity, 'no_execution');
                        }
                    //Subsidievaststelling in behandeling
                    case 'under-review-det':
                        //regel 36 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                    //Subsidie vastgesteld
                    case 'approved-det':
                        //regel 37 Excel
                        $this->SetOpportunityStatus($opportunity, 'in_progress');
                        break;
                    //Subsidie niet vastgesteld
                    case 'not-approved-det':
                        //zijn er binnen deze kans andere bezoeken waar de status niet "Afspraak gedaan" / "done" of "Afspraak afgezegd" / "cancelled" is
                        $otherVisitsHaveStatusOtherThenDoneCancelled = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'visit');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['done', 'cancelled']);
                            });
                        })->count();

                        //Zijn er binnen deze kans andere Offerteverzoeken waar de status "Uitgevoerd" / "executed" is
                        $otherQuotationRequestsHaveStatusExecuted = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->where('code_ref', "executed");
                            });
                        })->count();

                        //zijn er binnen deze kans andere Offerteverzoeken waar de status niet "Uitgevoerd" / "executed", "Offerte niet mogelijk" / "not-possible" of "Bewoner heeft afgewezen" / "not-approved" is
                        $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved = $opportunity->whereHas('quotationRequests', function ($query) {
                            $query->whereHas('opportunityAction', function ($query2) {
                                $query2->where('code_ref', 'quotation-request');
                            });
                            $query->whereHas('status', function ($query3) {
                                $query3->whereNotIn('code_ref', ['executed', 'not-possible', 'not-approved']);
                            });
                        })->count();

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && $otherQuotationRequestsHaveStatusExecuted > 0 && $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved === 0) {
                            //regel 38 Excel
                            $this->SetOpportunityStatus($opportunity, 'executed');
                        }

                        if($otherVisitsHaveStatusOtherThenDoneCancelled === 0 && ($otherQuotationRequestsHaveStatusExecuted === 0 || $otherQuotationRequestsHaveStatusOtherThenExecutedNotPossibleNotApproved > 0)) {
                            //regel 39 Excel
                            $this->SetOpportunityStatus($opportunity, 'pending');
                        }
                        break;
                    //Aanvraag gekoppeld
                    case 'linked':
                        //regel 40 Excel
                        $this->SetOpportunityStatus($opportunity, 'pending');
                        break;
                }
                break;
        }
    }

    private function SetOpportunityStatus($opportunity, $status) {
        $statusId = $this->OpportunityStatusId($status);
        $opportunity->status_id = $statusId;
        $opportunity->save();
    }

    private function OpportunityStatusId($codeRef) {
        $status = OpportunityStatus::where('code_ref', $codeRef)->first();

        return $status->id;
    }
}