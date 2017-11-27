<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Registration\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'fullName',
        'createdAt',
        'sourceId',
        'statusId',
        'measureRequestedId'
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'createdAt' => 'registrations.created_at',
        'sourceId' => 'registration_source.source_id',
        'statusId' => 'registrations.registration_status.id',
        'measureRequestedId' => 'measure_requested_address.measure_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'sourceId' => 'eq',
        'statusId' => 'eq',
        'measureRequestedId' => 'eq',
    ];
}
