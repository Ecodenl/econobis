<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\HousingFile\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyAddressJoin($query)
    {
        $query->join('addresses', 'housing_files.address_id', '=', 'addresses.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('addresses', 'housing_files.address_id', '=', 'addresses.id');
        $query->join('contacts', 'addresses.contact_id', '=', 'contacts.id');
    }
}