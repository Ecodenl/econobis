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
        'typeId',
        'note',
        'contactFullName',
        'datePlannedStart',
        'responsibleName',
    ];

    protected $mapping = [
        'createdAt' => 'tasks.created_at',
        'typeId' => 'tasks.type_id',
        'note' => 'tasks.note',
        'contactFullName' => 'contacts.full_name',
        'datePlannedStart' => 'tasks.date_planned_start',
    ];

    protected $joins = [
        'contactFullName' => 'contact',
        'responsibleName' => 'users',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];

    protected function applyResponsibleNameFilter($query, $type, $data)
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

        //of in de team->naam
        $query->leftJoin('teams', 'tasks.responsible_team_id', '=', 'teams.id');
        $query->orWhere('teams.name', 'LIKE', '%' . $data . '%');
        return false;
    }
}
