<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Invoice\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
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
        'number' => 'invoices.number',
        'dateRequested' => 'invoices.date_requested',
        'subject' => 'invoices.subject',
        'contact' => 'contacts.full_name',
        'paymentTypeId' => 'invoices.payment_type_id',
        'statusId' => 'invoices.status_id',
    ];

    protected $joins = [
        'contact' => 'contact',
    ];
}
