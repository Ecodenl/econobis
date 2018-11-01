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
        'id',
        'number',
        'dateRequested',
        'contact',
        'paymentTypeId',
        'statusId',
        'daysLastReminder',
        'daysToExpire',
    ];

    protected $mapping = [
        'id' => 'invoices.id',
        'number' => 'invoices.number',
        'dateRequested' => 'invoices.date_requested',
        'contact' => 'contacts.full_name',
        'paymentTypeId' => 'invoices.payment_type_id',
        'statusId' => 'invoices.status_id',
        'daysLastReminder' => 'invoices.days_last_reminder',
        'daysToExpire' => 'invoices.days_to_expire',
    ];

    protected $joins = [
        'contact' => 'contact',
    ];

    protected function applyDateRequestedSort($query, $data)
    {
        $query->orderByRaw('IFNULL(invoices.date_sent, invoices.date_requested) ' . $data);

        return false;
    }
}
