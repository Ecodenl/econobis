<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Document\Grid;

use App\Eco\Document\Document;
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
        return Document::query()
            ->whereTeamContactIds(Auth::user())
            ->whereDocumentCreatedFrom(Auth::user())
            ->select('documents.*');
    }
}