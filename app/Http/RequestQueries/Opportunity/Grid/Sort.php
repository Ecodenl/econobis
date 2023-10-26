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
        'desiredDate',
        'name',
        'measureCategory',
        'measureName',
        'campaign',
        'areaName',
        'statusId',
        'amountOfQuotationRequests',
    ];

    protected $mapping = [
        'number' => 'opportunities.number',
        'createdAt' => 'opportunities.created_at',
        'desiredDate' => 'opportunities.desired_date',
        'name' => 'contacts.full_name',
        'measureCategory' => 'measure_categories.name',
        'measureName' => 'measures.name',
        'campaign' => 'campaigns.name',
        'areaName' => 'addressAreaName.shared_area_name',
        'statusId'  => 'opportunities.status_id',
    ];

    protected $joins = [
        'measureCategory' => 'measure_categories',
        'measureName' => 'measures',
        'campaign' => 'campaigns',
        'areaName' => 'addressAreaName',
        'name' => 'contacts',
    ];

    protected function applyAmountOfQuotationRequestsSort($query, $data)
    {
        $query->withCount('quotationRequests')->orderBy('quotation_requests_count', $data);

        return false;
    }
}
