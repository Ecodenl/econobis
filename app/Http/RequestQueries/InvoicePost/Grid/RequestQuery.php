<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\InvoicePost\Grid;

use App\Eco\Invoice\InvoicePost;
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
        $query = InvoicePost::query()
            ->select('invoice_post.*')->where('invoice_post.administration_id', $this->request->input('administrationId'));

        return $query;
    }
}