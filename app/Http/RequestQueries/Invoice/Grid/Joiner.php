<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Invoice\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyContactJoin($query)
    {
        $query->join('orders as orders2', 'invoices.order_id', '=', 'orders2.id');
        $query->join('contacts', 'orders2.contact_id', '=', 'contacts.id');
    }
}