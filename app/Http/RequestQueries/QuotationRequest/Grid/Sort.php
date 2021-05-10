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
        'organisation',
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
        'organisation' => 'organisations.name',
        'contact' => 'contacts.full_name',
        'measure' => 'measure_categories.name',
        'campaign' => 'campaigns.name',
        'createdAt' => 'quotation_requests.created_at',
        'dateRecorded' => 'quotation_requests.date_recorded',
        'statusId' => 'quotation_requests.status_id',
        'dateReleased' => 'quotation_requests.date_released',
    ];

    protected $joins = [
        'organisation' => 'organisation',
        'contact' => 'contact',
        'address' => 'address',
        'measure' => 'measure',
        'campaign' => 'campaign',
    ];
}
