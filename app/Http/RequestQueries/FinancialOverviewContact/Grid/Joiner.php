<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\FinancialOverviewContact\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyContactJoin($query)
    {
        $query->join('contacts', 'financial_overview_contacts.contact_id', '=', 'contacts.id');
    }
}