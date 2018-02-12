<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Intake\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'createdAt',
        'fullName',
        'address',
        'measureRequestedId',
        'statusId',
    ];

    protected $mapping = [
        'createdAt' => 'intakes.created_at',
        'fullName' => 'contacts.full_name',
        'address' => 'addresses.street',
        'statusId' => 'intakes.intake_status_id',
        'measureRequestedId' => 'intake_measure_requested.measure_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
    ];
}
