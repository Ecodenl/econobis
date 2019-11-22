<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Intake\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'createdAtStart',
        'createdAtEnd',
        'fullName',
        'address',
        'measureRequestedId',
        'statusId',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'statusId' => 'intakes.intake_status_id',
        'measureRequestedId' => 'intake_measure_requested.measure_category_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'measureRequestedId' => 'eq',
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
