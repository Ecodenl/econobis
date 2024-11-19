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
        'statusId',
        'measureDateStart',
        'measureDateEnd',
        'answer',
        'floorId',
        'sideId',
        'typeBrand',
        'typeOfExecutionId',
        'savingsGasFrom',
        'savingsGasTo',
        'savingsElectricityFrom',
        'savingsElectricityTill',
        'co2SavingsFrom',
        'co2SavingsTill',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'measureCategoryName' => 'measure_categories.name',
        'statusId' => 'status_id',
        'floorId' => 'floor_id',
        'sideId' => 'side_id',
        'typeBrand' => 'type_brand',
        'typeOfExecutionId' => 'type_of_execution',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'measureCategoryName' => 'measureCategory',
        'measureName' => 'measure',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'status' => 'eq',
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

    protected function applyMeasureNameFilter($query, $type, $data)
    {
        $query->where(function($query) use ($data) {
            $query
                ->where(function($query) use ($data) {
                    $query->whereNotNull('measures.name_custom')
                        ->where('measures.name_custom', '!=', '')
                        ->where('measures.name_custom', 'LIKE', '%' . $data . '%');
                })
                ->orWhere(function($query) use ($data) {
                    $query->where(function($query) {
                        $query->whereNull('measures.name_custom')
                            ->orWhere('measures.name_custom', '=', '');
                    })
                        ->where('measures.name', 'LIKE', '%' . $data . '%');
                });
        });
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
    protected function applySavingsGasFromFilter($query, $type, $data)
    {
        $query->where('savings_gas', '>=', (float)$data);
        return false;
    }
    protected function applySavingsGasTillFilter($query, $type, $data)
    {
        $query->where('savings_gas', '<=', (float)$data);
        return false;
    }
    protected function applySavingsElectricityFromFilter($query, $type, $data)
    {
        $query->where('savings_electricity', '>=', (float)$data);
        return false;
    }
    protected function applySavingsElectricityTillFilter($query, $type, $data)
    {
        $query->where('savings_electricity', '<=', (float)$data);
        return false;
    }
    protected function applyCo2SavingsFromFilter($query, $type, $data)
    {
        $query->where('co2_savings', '>=', (float)$data);
        return false;
    }
    protected function applyCo2SavingsTillFilter($query, $type, $data)
    {
        $query->where('co2_savings', '<=', (float)$data);
        return false;
    }
}
