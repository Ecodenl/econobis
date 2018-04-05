<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Opportunity\Grid;


use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'createdAt',
        'name',
        'measureCategory',
        'campaign',
        'statusId',
    ];

    protected $mapping = [
        'number' => 'opportunities.number',
        'createdAt' => 'opportunities.created_at',
        'name' => 'contacts.full_name',
        'measureCategory' => 'measure_categories.name',
        'campaign' => 'campaigns.name',
        'statusId'  => 'opportunities.status_id',
    ];

    protected $joins = [
        'measureCategory' => 'measure_categories',
        'campaign' => 'campaigns',
        'name' => 'contacts',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];
}
