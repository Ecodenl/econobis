<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\ContactGroup\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyContactsInGroupJoin($query)
    {
        $query->join('contact_groups_pivot', 'contact_groups.id', '=', 'contact_groups_pivot.contact_group_id');
    }
}