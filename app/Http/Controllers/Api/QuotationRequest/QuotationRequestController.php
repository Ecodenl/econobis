<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\QuotationRequest;


use App\Eco\Email\Email;
use App\Eco\Opportunity\Opportunity;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\CSV\QuotationRequestCSVHelper;
use App\Helpers\Delete\Models\DeleteQuotationRequest;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\QuotationRequest\Grid\RequestQuery;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\QuotationRequest\GridQuotationRequest;
use App\Http\Resources\QuotationRequest\QuotationRequestPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuotationRequestController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $quotationRequests = $requestQuery->get();

        $quotationRequests->load([
            'organisationOrCoach',
            'opportunity.intake.address',
            'opportunity.measureCategory',
            'opportunity.measures',
            'opportunity.intake.campaign',
            'opportunity.intake.contact',
            'status',
        ]);

        return GridQuotationRequest::collection($quotationRequests)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(QuotationRequest $quotationRequest)
    {
        $quotationRequest->load([
            'organisationOrCoach.contactPerson.contact',
            'opportunity.intake.contact',
            'opportunity.intake.campaign',
            'opportunity.intake.campaign.organisations',
            'opportunity.intake.campaign.coaches',
            'opportunity.measureCategory',
            'opportunity.measures',
            'documents',
            'status',
            'createdBy',
            'updatedBy'
        ]);

        $quotationRequest->relatedEmailsSent = $this->getRelatedEmails($quotationRequest->id, 'sent');

        return FullQuotationRequest::make($quotationRequest);
    }

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $quotationRequests = $requestQuery->getQueryNoPagination()->get();

        $quotationRequestCSVHelper = new QuotationRequestCSVHelper($quotationRequests);

        return $quotationRequestCSVHelper->downloadCSV();
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuw offerteverzoek
     */
    public function getStore(Opportunity $opportunity)
    {
        $opportunity->load([
            'intake.address',
            'measures',
            'measureCategory',
            'intake.contact',
            'intake.campaign.organisations',
            'intake.campaign.coaches',
        ]);

        return FullOpportunity::make($opportunity);
    }

    public function store(Request $request)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationOrCoachId' => 'required|exists:contacts,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'dateReleased' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'quotationText' => 'string',
        ]);

        //basic QuotationRequest
        $quotationRequest = new QuotationRequest();

        //required
        $quotationRequest->contact_id = $data['organisationOrCoachId'];
// todo: Deze hoeven we niet meer te bruiken toch? Nu hebben we contact_id
// todo WM: opschonen
//        $quotationRequest-organisation_id =  $data['organisationId'];
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];

        //optional
        if ($data['dateRecorded']) {
            $quotationRequest->date_recorded = $data['dateRecorded'];
        }

        if ($data['dateReleased']) {
            $quotationRequest->date_released = $data['dateReleased'];
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        $quotationRequest->save();

        return $this->show($quotationRequest);
    }


    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationOrCoachId' => 'required|exists:contacts,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'dateReleased' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'quotationText' => 'string',
        ]);

        //required
        $quotationRequest->contact_id = $data['organisationOrCoachId'];
// todo: Deze hoeven we niet meer te bruiken toch? Nu hebben we contact_id
// todo WM: opschonen
//        $quotationRequest->organisation_id = $data['organisationId'];
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];

        //optional
        if ($data['dateRecorded']) {
            $quotationRequest->date_recorded = $data['dateRecorded'];
        } else {
            $quotationRequest->date_recorded = null;
        }

        if ($data['dateReleased']) {
            $quotationRequest->date_released = $data['dateReleased'];
        } else {
            $quotationRequest->date_released = null;
        }

        if (isset($data['quotationText'])) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        $quotationRequest->save();

        return $this->show($quotationRequest);
    }

    public function destroy(QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        try {
            DB::beginTransaction();

            $deleteQuotationRequest = new DeleteQuotationRequest($quotationRequest);
            $result = $deleteQuotationRequest->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function peek()
    {
        return QuotationRequestPeek::collection(QuotationRequest::orderBy('id')->get());
    }

    public function getRelatedEmails($id, $folder)
    {
        return Email::where('quotation_request_id', $id)->where('folder', $folder)->get();
    }

    public function getAmountOfOpenQuotationRequests(){
        return QuotationRequest::where('status_id', 1)->count();
    }

}