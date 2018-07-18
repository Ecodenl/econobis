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
        'typeId',
    ];

    protected $mapping = [
        'name' => 'contact_groups.name',
        'status' => 'contact_groups.closed',
        'typeId' => 'contact_groups.type_id',
    ];

    protected $joins = [];
}
