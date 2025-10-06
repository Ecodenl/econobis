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
        'areaName',
        'measureRequestedId',
        'intakeSourceId',
        'statusId',
        'campaign',
    ];

    protected $mapping = [
        'createdAt' => 'intakes.created_at',
        'fullName' => 'contacts.full_name',
        'address' => 'addresses.street',
        'areaName' => 'addressAreaName.shared_area_name',
        'statusId' => 'intakes.intake_status_id',
        'measureRequestedId' => 'intake_measure_requested.measure_category_id',
        'intakeSourceId' => 'intake_source.source_id',
        'campaign' => 'campaigns.name',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'areaName' => 'addressAreaName',
//        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
        'intakeSourceId' => 'intakeSource',
        'campaign' => 'campaign',
    ];
}
