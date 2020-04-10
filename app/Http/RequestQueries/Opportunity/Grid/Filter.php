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
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'createdAtStart',
        'createdAtEnd',
        'desiredDateStart',
        'desiredDateEnd',
        'name',
        'measureCategory',
        'campaign',
        'statusId',
        'amountOfQuotationRequests',
    ];

    protected $mapping = [
        'number' => 'opportunities.number',
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

    protected function applyCreatedAtStartFilter($query, $type, $data)
    {
        $query->where('created_at', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyCreatedAtEndFilter($query, $type, $data)
    {
        $query->where('created_at', '<=', Carbon::parse($data)->endOfDay());
        return false;
    }

    protected function applyDesiredDateStartFilter($query, $type, $data)
    {
        $query->where('desired_date', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyDesiredDateEndFilter($query, $type, $data)
    {
        $query->where('desired_date', '<=', Carbon::parse($data)->endOfDay());
        return false;
    }

    protected function applyAmountOfQuotationRequestsFilter($query, $type, $data)
    {
        $query->has('quotationRequests', '=', $data);

        return false;
    }
}
