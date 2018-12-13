<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\Controllers\Api\Task\Grid;

use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'createdAt',
        'typeName',
        'note',
        'contactFullName',
        'datePlannedStart',
    ];

    protected $mapping = [
        'createdAt' => 'tasks.created_at',
        'typeName' => 'tasks.type_id',
        'note' => 'tasks.note',
        'contactFullName' => 'contacts.full_name',
        'datePlannedStart' => 'tasks.date_planned_start',
    ];

    protected $joins = [
        'contactFullName' => 'contact',
    ];
}
