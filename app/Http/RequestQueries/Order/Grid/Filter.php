<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Order\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'dateRequested',
        'subject',
        'contact',
        'paymentTypeId',
        'statusId',
    ];

    protected $mapping = [
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

    protected $defaultTypes = [
        '*' => 'ct',
        'paymentTypeId' => 'eq',
        'statusId' => 'eq',
    ];
}
