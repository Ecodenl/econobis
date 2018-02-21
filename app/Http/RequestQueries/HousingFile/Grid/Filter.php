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
        'buildingTypeId',
        'energyLabelId'
    ];

    protected $mapping = [
        'createdAt' => 'housing_files.created_at',
        'fullName' => 'contacts.full_name',
        'buildingTypeId' => 'housing_files.building_type_id',
        'energyLabelId' => 'housing_files.energy_label_id',
    ];

    protected $joins = [
        'address' => 'address',
        'fullName' => 'contact',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'buildingType' => 'eq',
        'energyLabel' => 'eq',
    ];

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
