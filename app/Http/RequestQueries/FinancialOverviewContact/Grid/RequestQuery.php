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
use Illuminate\Support\Facades\DB;

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
            ->select('financial_overview_contacts.*')
            ->where('financial_overview_contacts.financial_overview_id', $this->request->input('financialOverviewId'));

        $onlyInterim  = $this->request->onlyInterimFinancialOverviewContacts == 'true';
        $onlyEmail    = $this->request->onlyEmailFinancialOverviewContacts == 'true';
        $onlyPost     = $this->request->onlyPostFinancialOverviewContacts == 'true';

        if ($onlyInterim) {
            // status concept
            $query->where('financial_overview_contacts.status_id', 'concept');

            // administratie moet interim toestaan
            $query->join('financial_overviews', 'financial_overview_contacts.financial_overview_id', '=', 'financial_overviews.id')
                ->join('administrations', 'financial_overviews.administration_id', '=', 'administrations.id')
                ->where('administrations.uses_interim_financial_overviews', 1)
                ->select('financial_overview_contacts.*'); // reset select

            // géén open participations (date_terminated IS NULL)
            $query->whereNotExists(function ($q) {
                $q->select(DB::raw(1))
                    ->from('participation_project as pp')
                    ->whereColumn('pp.contact_id', 'financial_overview_contacts.contact_id')
                    ->whereNull('pp.date_terminated')
                    ->whereNull('pp.deleted_at');
            });
        } elseif ($onlyEmail || $onlyPost) {
            $query->whereIn('financial_overview_contacts.status_id', ['to-send', 'error-sending']);
        }

        if ($onlyEmail) {
            $query->whereNotNull('financial_overview_contacts.emailed_to')
                ->where('financial_overview_contacts.emailed_to', '<>', 'Geen e-mail bekend');
        }

        return $query;
    }
}