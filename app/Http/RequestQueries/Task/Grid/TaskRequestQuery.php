<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Task\Grid;

use App\Eco\Task\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskRequestQuery extends \App\Helpers\RequestQuery\RequestQuery
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
        return Task::query()
            ->whereTeamContactIds(Auth::user())
            ->where('tasks.finished', false)
            ->select('tasks.*');
    }
}