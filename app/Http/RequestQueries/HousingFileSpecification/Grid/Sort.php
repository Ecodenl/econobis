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
        'createdAt',
        'typeBrand'
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'address' => 'addresses.street',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'measureCategoryName' => 'measure_categories.name',
        'status' => 'housing_file_specification_statuses.name',
        'measureDate' => 'measure_date',
        'createdAt' => 'housing_file_specifications.created_at',
        'typeBrand' => 'type_brand'
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

    protected function applyMeasureNameSort($query, $data)
    {
        $query->orderByRaw("
        CASE 
            WHEN measures.name_custom IS NOT NULL AND measures.name_custom != '' 
                THEN measures.name_custom
            ELSE measures.name 
        END
    " . ($data === 'asc' ? ' ASC' : ' DESC'));

        return false;
    }

}
