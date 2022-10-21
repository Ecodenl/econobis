<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\QuotationRequest\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
// todo WM: opschonen
//        'organisation',
        'organisationOrCoach',
        'contact',
        'address',
        'measure',
        'campaign',
        'createdAt',
        'dateRecorded',
        'statusId',
        'dateReleased',
    ];

    protected $mapping = [
// todo WM: opschonen
//        'organisation' => 'organisation.name',
        'organisationOrCoach' => 'organisationOrCoaches.full_name',
        'contact' => 'contacts.full_name',
        'measure' => 'measure_categories.name',
        'campaign' => 'campaigns.name',
        'createdAt' => 'quotation_requests.created_at',
        'dateRecorded' => 'quotation_requests.date_recorded',
        'statusId' => 'quotation_requests.status_id',
        'dateReleased' => 'quotation_requests.date_released',
    ];

    protected $joins = [
// todo WM: opschonen
//        'organisation' => 'organisation',
        'organisationOrCoach' => 'organisationOrCoach',
        'contact' => 'contact',
        'address' => 'address',
        'measure' => 'measure',
        'campaign' => 'campaign',
    ];
}
