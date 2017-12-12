<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\Controllers\Api\Task\Grid;

use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'createdAt',
        'name',
        'contactFullName',
        'datePlanned',
        'dateStarted',
        'statusName',
        'responsibleUserName',
    ];

    protected $mapping = [
        'createdAt' => 'tasks.created_at',
        'name' => 'tasks.name',
        'contactName' => 'contacts.full_name',
        'datePlanned' => 'tasks.date_planned',
        'dateStarted' => 'tasks.date_started',
        'statusId' => 'tasks.status_id',
        'responsibleUserName' => 'responsible_user.name',
    ];

    protected $joins = [
        'contactName' => 'contact',
        'responsibleUserName' => 'responsibleUser',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];
}
