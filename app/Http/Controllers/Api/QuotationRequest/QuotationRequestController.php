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
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\QuotationRequest\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\QuotationRequest\GridQuotationRequest;
use App\Http\Resources\QuotationRequest\QuotationRequestPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuotationRequestController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $quotationRequests = $requestQuery->get();

        $quotationRequests->load([
            'organisation',
            'opportunity.intake.address',
            'opportunity.measureCategory',
            'opportunity.measures',
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
            'organisation.contactPerson.person',
            'opportunity.intake.contact',
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
        ]);

        return FullOpportunity::make($opportunity);
    }

    public function store(Request $request)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationId' => 'required|exists:organisations,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'dateReleased' => 'string',
            'dateValid' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'quotationText' => 'string',
        ]);

        //basic QuotationRequest
        $quotationRequest = new QuotationRequest();

        //required
        $quotationRequest->organisation_id = $data['organisationId'];
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];

        //optional
        if ($data['dateRecorded']) {
            $quotationRequest->date_recorded = $data['dateRecorded'];
        }

        if ($data['dateReleased']) {
            $quotationRequest->date_released = $data['dateReleased'];
        }

        if ($data['dateValid']) {
            $quotationRequest->date_valid = $data['dateValid'];
        }

        if ($data['quotationText']) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        $quotationRequest->save();

        return $this->show($quotationRequest);
    }


    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        $data = $request->validate([
            'organisationId' => 'required|exists:organisations,id',
            'opportunityId' => 'required|exists:opportunities,id',
            'dateRecorded' => 'string',
            'dateReleased' => 'string',
            'dateValid' => 'string',
            'statusId' => 'required|exists:quotation_request_status,id',
            'quotationText' => 'string',
        ]);

        //required
        $quotationRequest->organisation_id = $data['organisationId'];
        $quotationRequest->opportunity_id = $data['opportunityId'];
        $quotationRequest->status_id = $data['statusId'];

        //optional
        if ($data['dateRecorded']) {
            $quotationRequest->date_recorded = $data['dateRecorded'];
        }

        if ($data['dateReleased']) {
            $quotationRequest->date_released = $data['dateReleased'];
        }

        if ($data['dateValid']) {
            $quotationRequest->date_valid = $data['dateValid'];
        }

        if ($data['quotationText']) {
            $quotationRequest->quotation_text = $data['quotationText'];
        }

        $quotationRequest->save();

        return $this->show($quotationRequest);
    }

    public function destroy(QuotationRequest $quotationRequest)
    {
        $this->authorize('manage', QuotationRequest::class);

        //delete many to many relations


        //delete one to many relations


        //delete model itself
        $quotationRequest->delete();

        return true;
    }

    public function peek()
    {
        return QuotationRequestPeek::collection(QuotationRequest::orderBy('id')->get());
    }

    public function getRelatedEmails($id, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        return Email::whereIn('mailbox_id', $mailboxIds)->where('quotation_request_id', $id)->where('folder', $folder)->get();
    }

}