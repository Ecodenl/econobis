<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\PaymentInvoice\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'contact',
        'payout',
        'statusId',
    ];

    protected $mapping = [
        'number' => 'payment_invoices.number',
        'statusId' => 'payment_invoices.status_id',
        'contact' => 'contacts.full_name',
        'payout' => 'pprd.payout',
    ];

    protected $joins = [
        'contact' => 'contact',
        'payout' => 'product_revenue_distribution',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
    ];
}
