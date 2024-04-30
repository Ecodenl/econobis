<?php

namespace App\Helpers\Opportunity;

use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Opportunity\Opportunity;

class InvoiceHelper
{
    public static function updateOpportunityStatus(QuotationRequest $quotationRequest) {
        $opportunity = $quotationRequest->opportunity;
        switch ($quotationRequest->opportunityAction->code_ref) {
            case 'quotation-request':
                switch ($quotationRequest->status->code_ref) {
                    //afspraak gemaakt
                    case 'made':
                        $status = OpportunityStatus::where('code_ref', 'in_progress')->first();
                        $opportunity->status_id = $status->id;
                        $opportunity->save();
                    //Geen afspraak kunnen maken
                    case 'not-made':
                        $status = OpportunityStatus::where('code_ref', 'in_progress')->first();
                        $opportunity->status_id = $status->id;
                        $opportunity->save();
                    //Afspraak gedaan?
                    case 'done':
                }
                break;
            case 'visit':
                break;
            case 'subsidy-request':
                break;
        }
    }
}