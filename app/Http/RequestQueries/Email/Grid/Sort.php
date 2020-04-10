<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'date',
        'mailbox',
        'sentBy',
        'to',
        'subject',
        'statusId',
        'sentByUserId',
    ];

    protected $mapping = [
        'date' => 'emails.date_sent',
        'mailbox' => 'mailboxes.name',
        'sentBy' => 'emails.from',
        'to' => 'emails.to',
        'subject' => 'emails.subject',
        'statusId'  => 'emails.status',
        'sentByUserId' => 'emails.sent_by_user_id',
    ];

    protected $joins = [
        'mailbox' => 'mailboxes',
    ];

}
