<?php

namespace App\Http\Controllers\Api\Contact;

use App\Helpers\CSV\ContactCSVHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\Contact\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactCollection;
use Illuminate\Http\Request;

class GridController extends Controller
{

    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contacts = $requestQuery->get();
        $contacts->load('primaryAddress');
        $contacts->load('primaryEmailAddress');
        $contacts->load('primaryPhoneNumber');

        return (new GridContactCollection($contacts))
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        $contacts = $requestQuery->getQueryNoPagination()->get();

        $contactCSVHelper = new ContactCSVHelper($contacts);

        $csv = $contactCSVHelper->downloadCSV();

        return $csv;
    }

}
