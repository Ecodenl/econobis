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
        'createdAt',
        'dateRecorded',
        'statusId',
        'dateReleased',
        'dateValid'
    ];

    protected $mapping = [
        'organisation' => 'organisations.name',
        'contact' => 'contacts.full_name',
        'measure' => 'measure_categories.name',
        'createdAt' => 'quotation_requests.created_at',
        'dateRecorded' => 'quotation_requests.date_recorded',
        'statusId' => 'quotation_requests.status_id',
        'dateReleased' => 'quotation_requests.date_released',
        'dateValid' => 'quotation_requests.date_valid',
    ];

    protected $joins = [
        'organisation' => 'organisation',
        'contact' => 'contact',
        'address' => 'address',
        'measure' => 'measure',
    ];
}
