<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Eco\User\User;
use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Zend\Diactoros\Request;

class Filter extends RequestFilter
{
    protected $fields = [
        'date',
        'mailbox',
        'sentBy',
        'to',
        'contact',
        'subject',
        'statusId',
        'responsibleName',
        'me',
    ];

    protected $mapping = [
        'date' => 'emails.date_sent',
        'mailbox' => 'mailboxes.name',
        'sentBy' => 'emails.from',
        'to' => 'emails.to',
        'subject' => 'emails.subject',
        'statusId'  => 'emails.status',
    ];

    protected $joins = [
        'mailbox' => 'mailboxes',
        'contact' => 'contact',
        'responsibleName' => 'users',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];

    protected function applyStatusIdFilter($query, $type, $data)
    {
      if($data === 'null'){
          $query->whereNull('status');

          return false;
      }

        return true;
    }

    protected function applyContactFilter($query, $type, $data)
    {
        $query->whereRaw('concat(IFNULL(contacts.full_name,\'\'), IFNULL(contacts.number,\'\')) LIKE ' . DB::connection()->getPdo()->quote('%' . $data . '%'));

        return false;
    }

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
        $query->leftJoin('teams', 'emails.responsible_team_id', '=', 'teams.id');
        $query->orWhere('teams.name', 'LIKE', '%' . $data . '%');

        return false;
    }

    protected function applyMeFilter($query, $type, $data)
    {
        $userId = Auth::id();

        $user = User::find($userId);

        $teamIds = [];

        foreach($user->teams as $team){
            array_push($teamIds, $team->id);
        }

        $query->where(function($query) use ($userId, $teamIds) {
            $query->where('emails.responsible_user_id', $userId);
            $query->orWhereIn('emails.responsible_team_id', $teamIds);
        });

        return false;
    }

}
