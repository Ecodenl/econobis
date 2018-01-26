<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\AuditTrail\Grid;

use App\Eco\AuditTrail\AuditTrail;
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
        return AuditTrail::query()
            ->select('revisions.*');
    }

    public function getQuery()
    {
        $query = parent::getQuery();

        return $query->orderByDesc('updated_at');
    }
}