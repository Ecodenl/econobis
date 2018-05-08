<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Invoice\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'dateRequested',
        'contact',
        'subject',
        'paymentTypeId',
        'statusId',
    ];

    protected $mapping = [
        'number' => 'invoices.number',
        'statusId' => 'invoices.status_id',
        'dateRequested' => 'invoices.date_requested',
        'subject' => 'invoices.subject',
        'contact' => 'contacts.full_name',
        'paymentTypeId' => 'invoices.payment_type_id',
    ];

    protected $joins = [
        'contact' => 'contact',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'paymentTypeId' => 'eq',
    ];

    protected function applyStatusFilter($query, $type, $data)
    {
        $extra_statusses = ['reminder', 'reminder1', 'reminder2', 'reminder3', 'exhortation'];
        $closed_statusses = ['paid' ,'irrecoverable'];

        if(in_array($data, $extra_statusses)){
            switch ($data){
                case 'reminder':
                    $query->whereNotNull('date_reminder_1')->whereNotIn('status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder1':
                    $query->whereNotNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNotIn('status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder2':
                    $query->whereNotNull('date_reminder_2')->whereNull('date_reminder_3')->whereNotIn('status_id', $closed_statusses);
                    return false;
                    break;
                case 'reminder3':
                    $query->whereNotNull('date_reminder_3')->whereNotIn('status_id', $closed_statusses);
                    return false;
                    break;
                case 'exhortation':
                    $query->whereNotNull('date_exhortation')->whereNotIn('status_id', $closed_statusses);
                    return false;
                    break;

            }

        }
        else{
            if(!in_array($data, $closed_statusses)){
                $query->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation');
            }
            return true;
        }
    }
}
