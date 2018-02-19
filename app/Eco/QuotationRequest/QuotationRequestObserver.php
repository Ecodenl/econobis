<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\QuotationRequest;

use Illuminate\Support\Facades\Auth;

class QuotationRequestObserver
{

    public function creating(QuotationRequest $quotationRequest)
    {
        $userId = Auth::id();
        $quotationRequest->created_by_id = $userId;
        $quotationRequest->updated_by_id = $userId;
    }

    public function updating(QuotationRequest $quotationRequest)
    {
        $userId = Auth::id();
        $quotationRequest->updated_by_id = $userId;
    }

}