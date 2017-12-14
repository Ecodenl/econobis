<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Opportunity;



use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityQuotation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Opportunity\FullOpportunityQuotation;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Opportunity\FullOpportunity;

class OpportunityQuotationController extends ApiController
{

    public function store(RequestInput $requestInput, Opportunity $opportunity)
    {
        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('organisationId')->validate('required|exists:contacts,id')->alias('organisation_id')->next()
            ->date('dateRequested')->validate('nullable|date')->onEmpty(null)->alias('date_requested')->next()
            ->date('dateTaken')->validate('nullable|date')->onEmpty(null)->alias('date_taken')->next()
            ->date('dateValidTill')->validate('nullable|date')->onEmpty(null)->alias('date_valid_till')->next()
            ->date('dateRealised')->validate('nullable|date')->onEmpty(null)->alias('date_realised')->next()
            ->get();

        $opportunityQuotation = new OpportunityQuotation();
        $opportunityQuotation->fill($data);
        $opportunity->quotations()->save($opportunityQuotation);

        return FullOpportunityQuotation::make($opportunityQuotation);
    }

    public function update(RequestInput $requestInput, OpportunityQuotation $opportunityQuotation) {

        $this->authorize('manage', Opportunity::class);

        $data = $requestInput
            ->integer('organisationId')->validate('required|exists:contacts,id')->alias('organisation_id')->next()
            ->string('dateRequested')->validate('nullable|date')->onEmpty(null)->alias('date_requested')->next()
            ->string('dateTaken')->validate('nullable|date')->onEmpty(null)->alias('date_taken')->next()
            ->string('dateValidTill')->validate('nullable|date')->onEmpty(null)->alias('date_valid_till')->next()
            ->string('dateRealised')->validate('nullable|date')->onEmpty(null)->alias('date_realised')->next()
            ->get();

        $opportunityQuotation->fill($data);
        $opportunityQuotation->save();

        return FullOpportunityQuotation::make($opportunityQuotation);
    }

    public function destroy(OpportunityQuotation $opportunityQuotation)
    {
        $this->authorize('manage', Opportunity::class);

        $opportunityQuotation->delete();
    }
}