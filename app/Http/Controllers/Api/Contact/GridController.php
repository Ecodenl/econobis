<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\DynamicContactGroupFilter;
use App\Helpers\CSV\ContactCSVHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\Contact\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactCollection;
use App\Http\Resources\ContactGroup\FullContactGroup;
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

    public function saveAsGroup(Request $request)
    {
        $filters = json_decode($request->input('filters'));
        $extraFilters = json_decode($request->input('extraFilters'));

        $contactGroup = new ContactGroup();
        $contactGroup->type_id = 'dynamic';
        $contactGroup->name = 'Dynamische groep ' . (ContactGroup::max('id') + 1);
        $contactGroup->description = 'Dynamisch aangemaakte groep';
        $contactGroup->save();

        if($filters) {
            foreach ($filters as $filter) {
                $dynamicFilter = new DynamicContactGroupFilter();
                $dynamicFilter->contact_group_id = $contactGroup->id;
                $dynamicFilter->field = $filter->field;
                $dynamicFilter->comperator = '';
                $dynamicFilter->data = $filter->data;
                $dynamicFilter->type = 'filter';
                $dynamicFilter->save();
            }
        }

        if($extraFilters) {
            foreach ($extraFilters as $extraFilter) {
                $dynamicFilter = new DynamicContactGroupFilter();
                $dynamicFilter->contact_group_id = $contactGroup->id;
                $dynamicFilter->field = $extraFilter->field;
                $dynamicFilter->comperator = $extraFilter->type;
                $dynamicFilter->data = $extraFilter->data;
                $dynamicFilter->type = 'extraFilter';
                $dynamicFilter->save();
            }
        }
        return FullContactGroup::make($contactGroup);
    }



}
