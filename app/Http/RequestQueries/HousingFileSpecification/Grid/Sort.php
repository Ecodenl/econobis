<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\HousingFileSpecification\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'address',
        'fullName',
        'postalCode',
        'city',
        'measureCategoryName',
        'measureName',
        'statusName',
        'measureDate',
    ];

    protected $mapping = [
        'address' => 'addresses.street',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'fullName' => 'contacts.full_name',
        'measureCategoryName' => 'name',
        'measureName' => 'name',
        'statusName' => 'name',
        'measureDate' => 'measure_date',
    ];

    protected $joins = [
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'fullName' => 'contact',
    ];
}
