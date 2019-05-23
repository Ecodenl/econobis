<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\PaymentInvoice\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'id',
        'number',
        'contact',
        'payout',
        'statusId',
    ];

    protected $mapping = [
        'id' => 'payment_invoices.id',
        'number' => 'payment_invoices.number',
        'contact' => 'contacts.full_name',
        'statusId' => 'payment_invoices.status_id',
        'payout' => 'pprd.payout',
    ];

    protected $joins = [
        'contact' => 'contact',
        'payout' => 'product_revenue_distribution',
    ];
}
