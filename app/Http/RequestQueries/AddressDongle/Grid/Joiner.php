<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\AddressDongle\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyAddressJoin($query)
    {
        $query->join('addresses', 'address_id', '=', 'addresses.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('addresses as contactAddress', 'address_id', '=', 'contactAddress.id');
        $query->join('contacts', 'contactAddress.contact_id', '=', 'contacts.id');
    }

    protected function applyTypeDongleReadOutJoin($query)
    {
        $query->join('address_dongle_read_out_types', 'type_read_out_id', '=', 'address_read_out_types.id');
    }

    protected function applyTypeDongleJoin($query)
    {
        $query->join('address_dongle_types', 'type_dongle_id', '=', 'address_dongle_types.id');
    }

}