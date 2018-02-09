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
        'statusId' => 'intakes.intake_status_id',
        'measureRequestedId' => 'measure_requested_address.measure_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
    ];
}
