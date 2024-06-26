<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\RequestQueries\ContactToImport\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactToImport;
use Illuminate\Http\Request;

class ContactToImportController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contactsToImport = $requestQuery->get();
        return GridContactToImport::collection($contactsToImport)
            ->additional(
                ['meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }


}
