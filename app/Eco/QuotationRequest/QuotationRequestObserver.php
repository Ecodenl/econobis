<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\QuotationRequest;

use Carbon\Carbon;
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

    public function saving(QuotationRequest $quotationRequest)
    {
        if ($quotationRequest->isDirty('status_id'))
        {
            $days = $quotationRequest->status->uses_wf ? $quotationRequest->status->number_of_days_to_send_email : 0;
            $mailDate = Carbon::now()->addDays($days)->addDay(1);
            $quotationRequest->date_planned_to_send_wf_email_status = $mailDate;
        }
    }

}