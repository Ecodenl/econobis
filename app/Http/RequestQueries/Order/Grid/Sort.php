<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Order\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'id',
        'number',
        'dateRequested',
        'subject',
        'contact',
        'paymentTypeId',
        'statusId',
    ];

    protected $mapping = [
        'id' => 'orders.id',
        'number' => 'orders.number',
        'dateRequested' => 'orders.date_requested',
        'subject' => 'orders.subject',
        'contact' => 'contacts.full_name',
        'paymentTypeId' => 'orders.payment_type_id',
        'statusId' => 'orders.status_id',
    ];

    protected $joins = [
        'contact' => 'contact',
    ];
}
