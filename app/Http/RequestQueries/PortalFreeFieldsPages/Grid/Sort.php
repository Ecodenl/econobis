<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\PortalFreeFieldsPages\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{
    protected $fields = [
        'name',
    ];

    protected $mapping = [
        'name' => 'portal_free_fields_pages.name',
    ];

    protected $joins = [
    ];
}
