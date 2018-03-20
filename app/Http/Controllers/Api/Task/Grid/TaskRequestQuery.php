<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\Controllers\Api\Task\Grid;

use App\Eco\Task\Task;
use Illuminate\Http\Request;

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
            ->where('finished', false)
            ->whereNull('deleted_at')
            ->select('tasks.*');
    }
}