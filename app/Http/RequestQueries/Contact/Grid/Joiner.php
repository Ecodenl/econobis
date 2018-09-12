<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestJoiner;
use Carbon\Carbon;

class Joiner extends RequestJoiner
{

    protected function applyEmailAddressJoin($query)
    {
        $query->leftJoin('email_addresses', function ($join) {
            $join->on('email_addresses.contact_id', '=', 'contacts.id')
                ->where('email_addresses.primary', '=', 1);
        });
    }

    protected function applyPhoneNumberJoin($query)
    {
        $query->leftJoin('phone_numbers', function ($join) {
            $join->on('phone_numbers.contact_id', '=', 'contacts.id')
                ->where('phone_numbers.primary', '=', 1);
        });
    }

    protected function applyAddressJoin($query)
    {
        $query->leftJoin('addresses', function ($join) {
            $join->on('addresses.contact_id', '=', 'contacts.id')
                ->where('addresses.primary', '=', 1);
        });
    }

    protected function applyParticipationsJoin($query)
    {
        $query->leftJoin('participation_production_project', function ($join) {
            $join->on('participation_production_project.contact_id', '=',
                'contacts.id');
        });
    }

}