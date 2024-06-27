<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\ContactToImport\Grid;

use App\Eco\Contact\ContactToImport;
use Illuminate\Http\Request;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{
    public function __construct(Request $request,
                                Filter $filter,
                                Sort $sort,
                                Joiner $joiner,
)
    {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        return ContactToImport::query()
            ->select('contact_to_imports.*');
    }

}