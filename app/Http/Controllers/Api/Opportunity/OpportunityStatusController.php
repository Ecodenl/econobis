<?php

namespace App\Http\Controllers\Api\Opportunity;

use App\Eco\Opportunity\OpportunityStatus;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class OpportunityStatusController extends Controller
{

    public function jory(Request $request)
    {
        return Jory::on(OpportunityStatus::class);
    }

    public function update(RequestInput $input, OpportunityStatus $opportunityStatus, Request $request)
    {
        $this->authorize('update', OpportunityStatus::class);
        // todo WM: opschonen velden email_template_id_wf en number_of_days_to_send_email
        $data = $input->boolean('usesWf')->alias('uses_wf')->next()
            ->integer('emailTemplateIdWf')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_wf')->next()
            ->integer('numberOfDaysToSendEmail')->alias('number_of_days_to_send_email')->next()
            ->get();

        $opportunityStatus->fill($data);
        $opportunityStatus->save();

        return Jory::on($opportunityStatus);
    }

}