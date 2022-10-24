<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Contact\Contact;
use App\Eco\QuotationRequest\QuotationRequest;
use Illuminate\Http\Request;

class QuotationRequestController
{
    public function getByContact(Contact $contact)
    {
        return response()->json($contact->quotationRequests->map(function(QuotationRequest $quotationRequest){
            return $this->getJson($quotationRequest);
        }));
    }

    public function view(QuotationRequest $quotationRequest)
    {
        return response()->json($this->getJson($quotationRequest));
    }

    public function update(Request $request, QuotationRequest $quotationRequest)
    {
        $request->validate([
            'datePlanned' => ['nullable', 'date'],
            'dateRecorded' => ['nullable', 'date'],
            'dateApprovedExternal' => ['nullable', 'date'],
            'dateReleased' => ['nullable', 'date'],
        ]);

        $quotationRequest->date_planned = $request->input('datePlanned');
        $quotationRequest->date_recorded = $request->input('dateRecorded');
        $quotationRequest->date_approved_external = $request->input('dateApprovedExternal');
        $quotationRequest->date_released = $request->input('dateReleased');
        $quotationRequest->save();
    }

    protected function getJson(QuotationRequest $quotationRequest)
    {
        return [
            'id' => $quotationRequest->id,
            'opportunity' => [
                'intake' => [
                    'contact' => [
                        'id' => $quotationRequest->opportunity->intake->contact->id,
                        'fullName' => $quotationRequest->opportunity->intake->contact->full_name,
                    ],
                    'address' => [
                        'id' => $quotationRequest->opportunity->intake->address->id,
                        'streetPostalCodeCity' => $quotationRequest->opportunity->intake->address->getStreetPostalCodeCityAttribute(),
                    ],
                ],
                'status' => [
                    'name' => $quotationRequest->opportunity->status->name,
                ]
            ],
            'dateRecorded' => $quotationRequest->date_recorded,
            'dateReleased' => $quotationRequest->date_released,
            'datePlanned' => $quotationRequest->date_planned,
            'dateApprovedExternal' => $quotationRequest->date_approved_external,
            'approvedProjectManager' => $quotationRequest->approved_project_manager,
            'approvedClient' => $quotationRequest->approved_client,
        ];
    }
}