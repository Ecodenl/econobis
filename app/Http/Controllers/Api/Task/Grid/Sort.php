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
        'name',
        'contactName',
        'datePlanned',
        'dateStarted',
        'statusId',
        'responsibleUserName',
    ];

    protected $mapping = [
        'createdAt' => 'tasks.created_at',
        'name' => 'tasks.name',
        'contactName' => 'contacts.full_name',
        'datePlanned' => 'tasks.date_planned',
        'dateStarted' => 'tasks.date_started',
        'statusId' => 'tasks.status_id',
        'responsibleUserName' => 'users.last_name',
    ];

    protected $joins = [
        'contactName' => 'contact',
        'responsibleUserName' => 'responsibleUser',
    ];
}
