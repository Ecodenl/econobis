<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\ContactGroup\GridContacts;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyEmailAddressJoin($query)
    {
        $query->leftJoin('email_addresses', function ($join) {
            $join->on('email_addresses.contact_id', '=', 'contacts.id')
                ->where('email_addresses.primary', '=', 1)
                ->whereNull('email_addresses.deleted_at');
        });
    }
}