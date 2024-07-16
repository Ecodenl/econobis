<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Task\Grid;

use App\Eco\User\User;
use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\Auth;

class Filter extends RequestFilter
{
    protected $fields = [
        'createdAt',
        'typeId',
        'note',
        'contactFullName',
        'datePlannedStart',
        'responsibleName',
        'me',
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
        'typeId' => 'eq',
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

    protected function applyMeFilter($query, $type, $data)
    {
        if(!$data) return false;

        $userId = Auth::id();

        $user = User::find($userId);

        $teamIds = [];

        foreach($user->teams as $team){
            array_push($teamIds, $team->id);
        }

        $query->where(function($query) use ($userId, $teamIds) {
            $query->where('tasks.responsible_user_id', $userId);
            $query->orWhereIn('tasks.responsible_team_id', $teamIds);
        });

        return false;
    }
}
