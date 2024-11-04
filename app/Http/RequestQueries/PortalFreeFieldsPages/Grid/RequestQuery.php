<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\PortalFreeFieldsPages\Grid;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use Illuminate\Http\Request;

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
        return PortalFreeFieldsPage::query()
            ->select('portal_free_fields_pages.*');
    }

}