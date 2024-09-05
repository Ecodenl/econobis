<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Opportunity\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'address',
        'createdAtStart',
        'createdAtEnd',
        'desiredDateStart',
        'desiredDateEnd',
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
        'name' => 'contacts.full_name',
        'measureCategory' => 'measure_categories.name',
        'measureName' => 'measures.name',
        'campaign' => 'campaigns.name',
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

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];

    protected function applyCreatedAtStartFilter($query, $type, $data)
    {
        $query->where('opportunities.created_at', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyCreatedAtEndFilter($query, $type, $data)
    {
        $query->where('opportunities.created_at', '<=', Carbon::parse($data)->endOfDay());
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

    protected function applyAreaNameFilter($query, $type, $data)
    {
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addressAreaName.shared_area_name', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyAddressFilter($query, $type, $data)
    {
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.street', 'LIKE', '%' . $term . '%');
                $query->orWhere('addresses.number', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }
}
