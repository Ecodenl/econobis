<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\User\Grid;

use App\Eco\User\User;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(Filter $filter,
                                Sort $sort,
                                Joiner $joiner)
    {
        parent::__construct($filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        return User::query()
            ->select('users.*');
    }
}