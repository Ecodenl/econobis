<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\FinancialOverviewPost\Grid;

use App\Eco\FinancialOverview\FinancialOverviewPost;
use Illuminate\Http\Request;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(Request $request,
                                Filter $filter,
                                Sort $sort,
                                Joiner $joiner)
    {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        $query = FinancialOverviewPost::query()
            ->select('financial_overview_post.*')->where('financial_overview_post.financial_overview_id', $this->request->input('financialOverviewId'));

        return $query;
    }
}