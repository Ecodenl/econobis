<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;

use App\Eco\ParticipantProject\ParticipantProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $query = ParticipantProject::query()
            ->select('participation_project.*')
            ->whereAdministrationIds(Auth::user())
            ->distinct(true);

        // The operation of below is not working. For now the code outcommented, so that the count is working after setting extra filter
        //If the request is called from the production project we catch the projectId filter. This will avoid errors with 'or' and 'and' filters.
//        if(json_decode($this->request->input('fetchFromProject')) == true){
//            $extraFilters = json_decode($this->request->input('extraFilters'));
//
//            if(count($extraFilters) > 0) {
//                $query->where('participation_project.project_id', $extraFilters[0]->data);
//
//                unset($extraFilters[0]);
//
//                $extraFilters = array_values($extraFilters);
//                Input::merge(['extraFilters' => json_encode($extraFilters)]);
//            }
//        }

        return $query;
    }
}