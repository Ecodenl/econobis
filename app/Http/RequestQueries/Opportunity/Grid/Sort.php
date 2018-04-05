<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Opportunity\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'number',
        'createdAt',
        'name',
        'measureCategory',
        'campaign',
        'statusId',
        'amountOfQuotationRequests',
    ];

    protected $mapping = [
        'number' => 'opportunities.number',
        'createdAt' => 'opportunities.createdAt',
        'name' => 'opportunities.name',
        'measureCategory' => 'measure_categories.name',
        'campaign' => 'campaigns.name',
        'statusId'  => 'opportunities.status_id',
        'amountOfQuotationRequests'  => 'quotation_requests.amount_of_quotation_requests',
    ];

    protected $joins = [
        'measureCategory' => 'measure_categories',
        'campaign' => 'campaigns',
        'amountOfQuotationRequests' => 'quotation_requests',
    ];
}
