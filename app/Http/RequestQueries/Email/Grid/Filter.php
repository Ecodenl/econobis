<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\DB;
use Zend\Diactoros\Request;

class Filter extends RequestFilter
{
    protected $fields = [
        'date',
        'mailbox',
        'sentBy',
        'to',
        'contact',
        'subject',
        'statusId',
    ];

    protected $mapping = [
        'date' => 'emails.date_sent',
        'mailbox' => 'mailboxes.name',
        'sentBy' => 'emails.from',
        'to' => 'emails.to',
        'subject' => 'emails.subject',
        'statusId'  => 'emails.status',
    ];

    protected $joins = [
        'mailbox' => 'mailboxes',
        'contact' => 'contact',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
    ];

    protected function applyStatusIdFilter($query, $type, $data)
    {
      if($data === 'null'){
          $query->whereNull('status');

          return false;
      }

        return true;
    }

    protected function applyContactFilter($query, $type, $data)
    {
        $query->whereRaw('concat(IFNULL(contacts.full_name,\'\'), IFNULL(contacts.number,\'\')) LIKE ' . DB::connection()->getPdo()->quote('%' . $data . '%'));

        return false;
    }

}
