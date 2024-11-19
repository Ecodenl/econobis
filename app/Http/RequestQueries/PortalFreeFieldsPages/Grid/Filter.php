<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\PortalFreeFieldsPages\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'name',
        'isActive',
    ];

    protected $mapping = [
        'name' => 'portal_free_fields_pages.name',
        'isActive' => 'portal_free_fields_pages.is_active',
    ];

    protected $joins = [
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'isActive' => 'eq',
    ];

}
