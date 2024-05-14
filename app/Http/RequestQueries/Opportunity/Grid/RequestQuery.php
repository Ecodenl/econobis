<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Opportunity\Grid;

use App\Eco\Opportunity\Opportunity;
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
        $baseQuery = Opportunity::query()
            ->whereTeamContactIds(Auth::user())
            ->select('opportunities.*');
        return $baseQuery;
    }

    public function getQuery()
    {
        $query = parent::getQuery();

        return $query->orderByDesc('opportunities.created_at');
    }
}