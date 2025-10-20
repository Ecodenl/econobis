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
        'areaName',
        'campaign',
        'measureRequestedId',
        'intakeSourceId',
        'statusId',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'campaign' => 'campaigns.name',
        'measureRequestedId' => 'intake_measure_requested.measure_category_id',
        'intakeSourceId' => 'intake_source.source_id',
        'statusId' => 'intakes.intake_status_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'areaName' => 'addressAreaName',
        'campaign' => 'campaign',
//        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
        'intakeSourceId' => 'intakeSource',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'measureRequestedId' => 'eq',
        'intakeSourceId' => 'eq',
        'statusId' => 'eq',
    ];

    protected function applyCreatedAtStartFilter($query, $type, $data)
    {
        $query->where('intakes.created_at', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyCreatedAtEndFilter($query, $type, $data)
    {
        $query->where('intakes.created_at', '<=', Carbon::parse($data)->endOfDay());
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
}
