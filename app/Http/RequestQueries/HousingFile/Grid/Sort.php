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
        'contact',
        'buildingType',
        'energyLabel'
    ];

    protected $mapping = [
        'createdAt' => 'housing_files.created_at',
        'address' => 'address.?',
        'contact' => 'contact.full_name',
        'buildingType' => 'building_type.name',
        'energyLabel' => 'energy_label.name',
    ];

    protected $joins = [
        'address' => 'address',
        'contact' => 'contact',
        'buildingType' => 'building_type',
        'energyLabel' => 'energy_label',
    ];
}
