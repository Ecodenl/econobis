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
        'status',
        'measureDate',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'address' => 'addresses.street',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'measureCategoryName' => 'measure_categories.name',
        'measureName' => 'measures.name',
        'status' => 'housing_file_specification_statuses.name',
        'measureDate' => 'measure_date',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'measureCategoryName' => 'measureCategory',
        'measureName' => 'measure',
        'status' => 'housingFileSpecificationStatus',
    ];
}
