<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\HousingFile\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'createdAt',
        'address',
        'fullName',
        'postalCode',
        'city',
        'buildingTypeId',
        'energyLabelId',
        'buildYear',
        'isHouseForSale'
    ];

    protected $mapping = [
        'createdAt' => 'housing_files.created_at',
        'fullName' => 'full_name',
        'buildingTypeId' => 'building_type_id',
        'energyLabelId' => 'energy_label_id',
        'buildYear' => 'build_year',
        'isHouseForSale' => 'is_house_for_sale',
    ];

    protected $joins = [
        'address' => 'address',
        'fullName' => 'contact',
        'postalCode' => 'address',
        'city' => 'address',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'buildingType' => 'eq',
        'energyLabel' => 'eq',
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
}
