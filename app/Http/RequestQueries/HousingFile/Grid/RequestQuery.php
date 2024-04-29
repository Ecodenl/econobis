<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\HousingFile\Grid;


use App\Eco\HousingFile\HousingFile;
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
        return HousingFile::query()
            ->select('housing_files.*');
    }

    public function getQuery()
    {
        $query = parent::getQuery();

        return $query->orderByDesc('housing_files.created_at');
    }
}