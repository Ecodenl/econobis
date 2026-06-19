<?php

namespace App\Http\RequestQueries\Mailbox\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{
    protected $fields = [
        'name',
    ];

    protected $mapping = [
        'name' => 'mailboxes.name',
    ];

    protected $joins = [
    ];
}
