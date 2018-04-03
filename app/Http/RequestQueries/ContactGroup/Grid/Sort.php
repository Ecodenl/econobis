<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ContactGroup\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'name',
        'status',
    ];

    protected $mapping = [
        'name' => 'contact_groups.name',
        'status' => 'contact_groups.closed',
    ];

    protected $joins = [];
}
