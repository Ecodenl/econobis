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
use Illuminate\Support\Facades\Input;

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

        //If the request is called from the production project we catch the productionProjectId filter. This will avoid errors with 'or' and 'and' filters.
        if($this->request->input('fetchFromProductionProject') == true){
            $extraFilters = json_decode($this->request->input('extraFilters'));

            $query->where('participation_production_project.production_project_id', $extraFilters[0]->data);

            unset($extraFilters[0]);

            $extraFilters = array_values($extraFilters);
            Input::merge(['extraFilters' => json_encode($extraFilters)]);
        }

        return $query;
    }
}