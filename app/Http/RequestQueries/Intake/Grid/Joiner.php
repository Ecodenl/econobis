<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Intake\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyContactJoin($query)
    {
        $query->join('addresses', 'intakes.address_id', '=', 'addresses.id');
        $query->join('contacts', 'addresses.contact_id', '=', 'contacts.id');
    }

    protected function applySourceJoin($query)
    {
        $query->join('intake_source', 'intakes.id', '=', 'intake_source.intake_id');
    }

    protected function applyMeasureRequestedJoin($query)
    {
        $query->join('addresses', 'intakes.address_id', '=', 'addresses.id');
        $query->join('measure_requested_address', 'addresses.id', '=', 'measure_requested_address.address_id');
    }


}