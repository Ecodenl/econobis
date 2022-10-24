<?php

namespace App\Http\Controllers\Portal\QuotationRequest;

use App\Eco\Contact\Contact;
use App\Eco\QuotationRequest\QuotationRequest;

class QuotationRequestController
{
    public function getByContact(Contact $contact)
    {
        return response()->json($contact->quotationRequests->map(function(QuotationRequest $qr){
            return [
                'id' => $qr->id,
                'opportunity' => [
                    'intake' => [
                        'contact' => [
                            'id' => $qr->opportunity->intake->contact->id,
                            'fullName' => $qr->opportunity->intake->contact->full_name,
                        ],
                        'address' => [
                            'id' => $qr->opportunity->intake->address->id,
                            'streetPostalCodeCity' => $qr->opportunity->intake->address->getStreetPostalCodeCityAttribute(),
                        ],
                    ],
                    'status' => [
                        'name' => $qr->opportunity->status->name,
                    ]
                ],
            ];
        }));
    }
}