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
                        $status = $this->OpportunityStatusId('in_progress');
                        $opportunity->status_id = $status;
                        $opportunity->save();
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        //regel 5 en 6 Excel
                        $status = $this->OpportunityStatusId('pending');
                        $opportunity->status_id = $status;
                        $opportunity->save();
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
                            $status = $this->OpportunityStatusId('executed');
                            $opportunity->status_id = $status;
                            $opportunity->save();
                        } else {
                            if ($otherVisitsWithStatusMade === 0 && $otherVisitsHaveOtherStatusThenDone === 0 && $quotationRequestsWithStatusDone > 0 && $quotationRequestsWithStatusMandate === 0) {
                                //regel 8 Excel
                                $status = $this->OpportunityStatusId('executed');
                                $opportunity->status_id = $status;
                                $opportunity->save();
                            } else {
                                //regel 9 Excel
                                $status = $this->OpportunityStatusId('pending');
                                $opportunity->status_id = $status;
                                $opportunity->save();
                            }
                        }
                }
                break;
            case 'quotation-request':
                break;
            case 'subsidy-request':
                break;
        }
    }

    private function OpportunityStatusId($codeRef) {
        $status = OpportunityStatus::where('code_ref', $codeRef)->first();

        return $status->id;
    }
}