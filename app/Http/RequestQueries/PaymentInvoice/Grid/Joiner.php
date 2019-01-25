<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\PaymentInvoice\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyContactJoin($query)
    {
        $query->join('project_revenue_distribution', 'payment_invoices.revenue_distribution_id', '=', 'project_revenue_distribution.id');
        $query->join('contacts', 'project_revenue_distribution.contact_id', '=', 'contacts.id');
    }

    protected function applyProductRevenueDistributionJoin($query)
    {
        $query->join('project_revenue_distribution as pprd', 'payment_invoices.revenue_distribution_id', '=', 'pprd.id');
    }
}