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
        'organisationOrCoach',
        'contact',
        'address',
        'measure',
        'campaign',
        'createdAt',
        'datePlanned',
        'dateRecorded',
        'statusId',
        'dateReleased',
    ];

    protected $mapping = [
        'organisationOrCoach' => 'organisationOrCoaches.full_name',
        'contact' => 'contacts.full_name',
        'measure' => 'measure_categories.name',
        'campaign' => 'campaigns.name',
        'createdAt' => 'quotation_requests.created_at',
        'datePlanned' => 'quotation_requests.date_planned',
        'dateRecorded' => 'quotation_requests.date_recorded',
        'statusId' => 'quotation_requests.status_id',
        'dateReleased' => 'quotation_requests.date_released',
    ];

    protected $joins = [
        'organisationOrCoach' => 'organisationOrCoach',
        'contact' => 'contact',
        'address' => 'address',
        'measure' => 'measure',
        'campaign' => 'campaign',
    ];
}
