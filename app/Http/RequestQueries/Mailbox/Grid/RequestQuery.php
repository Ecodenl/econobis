<?php

namespace App\Http\RequestQueries\Mailbox\Grid;

use App\Eco\Mailbox\Mailbox;
use Illuminate\Http\Request;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(
        Request $request,
        Filter $filter,
        Sort $sort,
        Joiner $joiner
    ) {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        return Mailbox::query()
            ->select('mailboxes.*');
    }
}