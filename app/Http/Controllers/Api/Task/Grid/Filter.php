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
        'statusId',
        'responsibleUserName',
    ];

    protected $mapping = [
        'createdAt' => 'tasks.created_at',
        'name' => 'tasks.name',
        'contactFullName' => 'contacts.full_name',
        'datePlanned' => 'tasks.date_planned',
        'dateStarted' => 'tasks.date_started',
        'statusId' => 'tasks.status_id',
        'responsibleUserName' => 'users.last_name',
    ];

    protected $joins = [
        'contactFullName' => 'contact',
        'responsibleUserName' => 'users',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];

    protected function applyResponsibleUserNameFilter($query, $type, $data)
    {
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('users.last_name', 'LIKE', '%' . $term . '%');
                $query->orWhere('users.first_name', 'LIKE', '%' . $term . '%');
                $query->orWhere('last_name_prefixes.name', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }
}
