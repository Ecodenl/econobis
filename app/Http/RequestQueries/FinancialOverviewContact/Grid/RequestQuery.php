<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\FinancialOverviewContact\Grid;

use App\Eco\FinancialOverview\FinancialOverviewContact;
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
        $query = FinancialOverviewContact::query()
            ->select('financial_overview_contacts.*')->where('financial_overview_contacts.financial_overview_id', $this->request->input('financialOverviewId'));

        if($this->request->onlyEmailFinancialOverviewContacts == "true" || $this->request->onlyPostFinancialOverviewContacts == "true") {
            $query->whereIn('financial_overview_contacts.status_id', ['to-send', 'error-sending']);
        }
        $onlyEmailFinancialOverviewContacts = $this->request->onlyEmailFinancialOverviewContacts == 'true';
        if ($onlyEmailFinancialOverviewContacts)
        {
            $query->whereNotNull('financial_overview_contacts.emailed_to' )
            ->where('financial_overview_contacts.emailed_to', 'not like', '%Geen e-mail bekend%');
        }

        return $query;
    }
}