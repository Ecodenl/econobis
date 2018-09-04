<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;

use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use Illuminate\Http\Request;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(
        Request $request,
        Filter $filter,
        Sort $sort,
        Joiner $joiner,
        ExtraFilter $extraFilter
    ) {
        parent::__construct($request, $filter, $sort, $joiner, $extraFilter);
    }

    protected function baseQuery()
    {
        $query = ParticipantProductionProject::query()
            ->select('participation_production_project.*');

        return $query;
    }
}