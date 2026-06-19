<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Order\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'dateNextInvoice',
        'subject',
        'contact',
        'paymentTypeId',
        'statusId',
    ];

    protected $mapping = [
        'number' => 'orders.number',
        'dateNextInvoice' => 'orders.date_next_invoice',
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

    protected function applyStatusIdFilter($query, $type, $data)
    {
            switch ($data){
                case 'upcoming':
                    $query->where('orders.status_id', 'active')
                        ->whereDoesntHave('invoices', function ($q) {
                            $q->where(function ($q2) {
                                $q2->where('orders.collection_frequency_id', 'once')
                                    ->orWhereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ]);
                            });
                        })
                        ->where(function ($q) {
                            $q->whereNull('orders.date_next_invoice')
                                ->orWhere('orders.date_next_invoice', '>', Carbon::today()->addDays(14));
                        });
                    return false;
                    break;
                case 'create':
                    $query->where('orders.status_id', 'active')
                    ->where('orders.date_next_invoice', '<=', Carbon::today()->addDays(14))
                    ->whereDoesntHave('invoices', function ($q) {
                        $q->where(function ($q2) {
                            $q2->where('orders.collection_frequency_id', 'once')
                                ->orWhereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ]);
                        });
                    });
                    return false;
                    break;
                // WM: beetje verwarrend, maar 'send' is voor 'to-send'
                case 'send':
                    $query->where('orders.status_id', 'active')
                        ->whereHas('invoices', function ($q) {
                            $q->whereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending' ]);
                        });
                    return false;
                    break;
                default:
                    return true;
                    break;
            }

    }
}
