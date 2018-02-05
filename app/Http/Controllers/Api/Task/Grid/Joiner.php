<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\Controllers\Api\Task\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyContactJoin($query)
    {
        $query->join('contacts', 'tasks.contact_id', '=', 'contacts.id');
    }

    protected function applyUsersJoin($query)
    {
        $query->join('users', 'tasks.responsible_user_id', '=', 'users.id');
    }


}