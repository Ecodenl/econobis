<?php

namespace App\Http\RequestQueries\Mailbox\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'name',
        'isActive',
    ];

    protected $mapping = [
        'name' => 'mailboxes.name',
        'isActive' => 'mailboxes.is_active',
    ];

    protected $joins = [
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'isActive' => 'eq',
    ];

}
