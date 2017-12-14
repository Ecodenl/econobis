<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Opportunity;

use Illuminate\Support\Facades\Auth;

class OpportunityQuotationObserver
{

    public function creating(OpportunityQuotation $opportunityQuotation)
    {
        $userId = Auth::id();
        $opportunityQuotation->created_by_id = $userId;
    }
}