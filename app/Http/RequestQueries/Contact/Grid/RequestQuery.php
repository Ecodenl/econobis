<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Contact\Grid;

use App\Eco\Contact\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{
    public function __construct(Request $request,
                                Filter $filter,
                                Sort $sort,
                                Joiner $joiner,
                                ExtraFilter $extraFilter)
    {
        parent::__construct($request, $filter, $sort, $joiner, $extraFilter);
    }

    protected function baseQuery()
    {
            return Contact::query()
                ->whereTeamContactIds(Auth::user())
                ->select('contacts.*');
    }

}