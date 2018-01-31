<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'date',
        'mailbox',
        'sentBy',
        'subject',
        'statusId',
    ];

    protected $mapping = [
        'date' => 'emails.date_sent',
        'mailbox' => 'mailboxes.name',
        'sentBy' => 'emails.from',
        'subject' => 'emails.subject',
        'statusId'  => 'emails.status',
    ];

    protected $joins = [
        'mailbox' => 'mailboxes',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
    ];

}
