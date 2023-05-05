<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\HousingFile\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'createdAt',
        'address',
        'fullName',
        'buildingType',
        'energyLabel',
        'buildYear',
        'isHouseForSale',
        'postalCode',
        'city'
    ];

    protected $mapping = [
        'createdAt' => 'housing_files.created_at',
        'address' => 'addresses.street',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'fullName' => 'contact.full_name',
        'buildingType' => 'building_types.name',
        'energyLabel' => 'energy_labels.name',
        'buildYear' => 'housing_files.build_year',
        'isHouseForSale' => 'housing_files.is_house_for_sale',
        'fullName' => 'contacts.full_name',
    ];

    protected $joins = [
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'fullName' => 'contact',
        'buildingType' => 'building_type',
        'energyLabel' => 'energy_label',
    ];
}
