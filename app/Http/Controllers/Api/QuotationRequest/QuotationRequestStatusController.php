<?php

namespace App\Http\Controllers\Api\QuotationRequest;

use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class QuotationRequestStatusController extends Controller
{

    public function jory(Request $request)
    {
        return Jory::on(QuotationRequestStatus::class);
    }

    public function update(RequestInput $input, QuotationRequestStatus $quotationRequestStatus, Request $request)
    {
        $this->authorize('update', QuotationRequestStatus::class);
        // todo WM: opschonen velden email_template_id_wf, mail_cc_to_coach_wf en number_of_days_to_send_email
        $data = $input->boolean('usesWf')->alias('uses_wf')->next()
            ->integer('emailTemplateIdWf')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_wf')->next()
            ->boolean('mailCcToCoachWf')->alias('mail_cc_to_coach_wf')->next()
            ->integer('numberOfDaysToSendEmail')->alias('number_of_days_to_send_email')->next()
            ->get();

        $quotationRequestStatus->fill($data);
        $quotationRequestStatus->save();

        return Jory::on($quotationRequestStatus);
    }

}