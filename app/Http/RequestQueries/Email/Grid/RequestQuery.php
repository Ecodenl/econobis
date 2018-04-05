<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Email\Grid;

use App\Eco\Email\Email;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        return Email::query()
            ->select('emails.*');
    }

    public function getQueryNoPagination()
    {
        $query = $this->baseQuery();

        $this->joiner->resetProcessedJoins();

        $this->applyFilter($query);
        $this->applySort($query);

        return $query;
    }

}