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
    protected $fields
        = [
            'number',
            'dateRequested',
            'contact',
            'subject',
            'paymentTypeId',
            'statusId',
            'daysLastReminder',
            'daysToExpire',
        ];

    protected $mapping
        = [
            'number' => 'invoices.number',
            'statusId' => 'invoices.status_id',
            'dateRequested' => 'invoices.date_requested',
            'subject' => 'invoices.subject',
            'contact' => 'contacts.full_name',
            'paymentTypeId' => 'invoices.payment_type_id',
            'daysLastReminder' => 'invoices.days_last_reminder',
            'daysToExpire' => 'invoices.days_to_expire',
        ];

    protected $joins
        = [
            'contact' => 'contact',
        ];

    protected $defaultTypes
        = [
            '*' => 'ct',
            'paymentTypeId' => 'eq',
            'daysLastReminder' => 'gte',
            'daysToExpire' => 'lte',
        ];

    protected function applyDateRequestedFilter($query, $type, $data)
    {
        $query->where(function ($q) use ($data) {
            $q->orWhere(function ($q1) use ($data) {
                $q1->whereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ])
                ->where('invoices.date_requested', '<=',
                    $data);})
                ->orWhere(function ($q2) use ($data) {
                    $q2->whereNotIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ])
                        ->where('invoices.date_sent', '<=',
                            $data);
                });
        });

        return false;
    }

    protected function applySubjectFilter($query, $type, $data)
    {
        $query->join('orders', 'invoices.order_id', '=', 'orders.id');

        $query->where(function ($q) use ($data) {
            $q->orWhere(function ($q1) use ($data) {
                $q1->whereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ])
                    ->where('orders.subject', 'LIKE', '%' . $data . '%');})
                ->orWhere(function ($q2) use ($data) {
                    $q2->whereNotIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ])
                        ->where('invoices.subject', 'LIKE', '%' . $data . '%');
                });
        });

        return false;
    }

    protected function applyStatusIdFilter($query, $type, $data)
    {
        $extra_statusses = ['reminder', 'to-remind', 'reminder_1', 'reminder_2', 'reminder_3', 'exhortation', 'payed-by-mollie'];
        $not_reminder_statusses = ['paid', 'irrecoverable'];

        if ($data === 'paid') {
            $query->where(function ($query){
                $query->where('invoices.status_id', 'paid')
                    ->orWhere(function ($query) {
                        $query->whereHas('molliePayments', function ($q) {
                            $q->whereNotNull('date_paid');
                        });
                    });
            });

            return false;
        }

        if (in_array($data, $extra_statusses)) {
            if($data === 'payed-by-mollie'){
                $query->whereIn('invoices.status_id', ['exported', 'sent'])
                    ->whereHas('molliePayments', function ($q) {
                    $q->whereNotNull('date_paid');
                });

                return false;
            }

            /**
             * Alle overige statussen zijn herinneringen en nota's met een mollie betaaldatum
             * willen we sowieso niet herinneren, dus dit hier standaard al filteren.
             */
            $query->whereDoesntHave('molliePayments', function ($q) {
                $q->whereNotNull('date_paid');
            });

            switch ($data) {
                case 'reminder':
                    $query->where(function ($q) {
                        $q->where(function ($q) {
                        $q->whereNotNull('invoices.date_reminder_1');
                            })
                            ->orWhere(function ($q) {

                                $q->where('invoices.status_id', 'exported')->where('invoices.payment_type_id', 'transfer')
                                    ->where('invoices.days_to_expire', '<=', '0');

                            })->orWhere(function ($q) {
                                $q->whereIn('invoices.status_id', ['sent', 'error-exporting'])->where('invoices.payment_type_id', 'transfer')
                                    ->where('invoices.days_to_expire', '<=', '0');
                            });})

                    ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable'])->whereNull('invoices.date_exhortation');

                    return false;
                    break;
                case 'to-remind':
                    $query->where(function ($q) {
                        $q->where(function ($q) {
                                $q->where('invoices.status_id', 'exported')
                                    ->where('invoices.days_to_expire', '<=', '0');
                            })->orWhere(function ($q) {
                                $q->whereIn('invoices.status_id', ['sent', 'error-exporting'])->where('invoices.payment_type_id', 'transfer')
                                    ->where('invoices.days_to_expire', '<=', '0');
                            });
                    })->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable'])
                    ->whereNull('invoices.date_reminder_1');
                    return false;
                    break;
                case 'reminder_1':
                    $query->whereNotNull('invoices.date_reminder_1')->whereNull('invoices.date_reminder_2')
                        ->whereNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation')
                        ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable']);
                    return false;
                    break;
                case 'reminder_2':
                    $query->whereNotNull('invoices.date_reminder_2')->whereNull('invoices.date_reminder_3')
                        ->whereNull('invoices.date_exhortation')->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable']);
                    return false;
                    break;
                case 'reminder_3':
                    $query->whereNotNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation')
                        ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable']);
                    return false;
                    break;
                case 'exhortation':
                    $query->whereNotNull('invoices.date_exhortation')
                        ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable']);
                    return false;
                    break;

            }

        } else {
            if (!in_array($data, $not_reminder_statusses)) {
                if ($data === 'sent') {
                    $query->whereIn('invoices.status_id', ['sent', 'error-exporting']);
                    $query->where(function ($q) {
                        $q->where(function ($q) {
                            $q->where('invoices.payment_type_id', 'transfer')
                                ->where('invoices.days_to_expire', '>',
                                    '0');
                        })->orWhere(function ($q) {
                            $q->where('invoices.payment_type_id', '!=', 'transfer');
                        });
                    });
                    return false;
                }
                if ($data === 'exported') {
                    $query->where(function ($q) {
                        $q->where(function ($q) {
                            $q->where('invoices.payment_type_id', 'transfer')
                                ->where('invoices.days_to_expire', '>',
                                    '0');
                        })->orWhere(function ($q) {
                            $q->where('invoices.payment_type_id', '!=', 'transfer');
                        });
                    });
                }
                $query->whereNull('invoices.date_reminder_1')->whereNull('invoices.date_reminder_2')
                    ->whereNull('invoices.date_reminder_3')->whereNull('invoices.date_exhortation');
            }
            return true;
        }
    }
}
