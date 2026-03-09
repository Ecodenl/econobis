<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\HousingFileSpecification\Grid;


use App\Eco\HousingFile\HousingFileSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        return HousingFileSpecification::query()
            ->whereTeamContactIds(Auth::user())
            ->select('housing_file_specifications.*');
    }
}