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
        'address',
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
        'address' => 'address',
    ];

    protected function applyAmountOfQuotationRequestsSort($query, $data)
    {
        $query->withCount('quotationRequests')->orderBy('quotation_requests_count', $data);

        return false;
    }

    protected function applyAddressSort($query, $data)
    {
        $query->orderBy('addresses.street', $data)->orderBy('addresses.number', $data)->orderBy('addresses.addition', $data);

        return false;
    }

    protected function applyMeasureNameSort($query, $data)
    {
        $query->orderByRaw("
        CASE 
            WHEN measures.name_custom IS NOT NULL AND measures.name_custom != '' 
                THEN measures.name_custom
            ELSE measures.name 
        END
    " . ($data === 'asc' ? ' ASC' : ' DESC'));

        return false;
    }
}
