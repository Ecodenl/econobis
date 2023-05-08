<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\HousingFileSpecification\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'address',
        'fullName',
        'postalCode',
        'city',
        'measureCategoryName',
        'measureName',
        'statusName',
        'measureDateStart',
        'measureDateEnd',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'measureCategoryName' => 'measure_categories.name',
        'measureName' => 'measures.name',
        'statusName' => 'housing_file_specification_statuses.name',
//        'measureDateStart' => 'measure_date',
//        'measureDateEnd' => 'measure_date',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'measureCategoryName' => 'measureCategory',
        'measureName' => 'measure',
        'statusName' => 'housingFileSpecificationStatus',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
    ];

    protected function applyAddressFilter($query, $type, $data) {
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

    protected function applyPostalCodeFilter($query, $type, $data) {
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.postal_code', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyCityFilter($query, $type, $data) {
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.city', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyMeasureDateStartFilter($query, $type, $data)
    {
        $query->where('measure_date', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyMeasureDateEndFilter($query, $type, $data)
    {
        $query->where('measure_date', '<=', Carbon::parse($data)->endOfDay());
        return false;
    }
}
