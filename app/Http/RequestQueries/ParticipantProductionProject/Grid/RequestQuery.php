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
        ExtraFilter $extraFilter,
        Sort $sort,
        Joiner $joiner
    ) {
        parent::__construct($request, $filter, $extraFilter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        return ParticipantProductionProject::query()
            ->whereNull('participation_production_project.deleted_at')
            ->select('participation_production_project.*')->where('production_project_id', $this->request->input('productionProjectId'));
    }
}