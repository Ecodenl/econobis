<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\QuotationRequest\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyOrganisationOrCoachJoin($query)
    {
        $query->join('contacts as organisationOrCoaches', 'quotation_requests.contact_id', '=', 'organisationOrCoaches.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('opportunities', 'quotation_requests.opportunity_id', '=', 'opportunities.id');
        $query->join('intakes', 'opportunities.intake_id', '=', 'intakes.id');
        $query->join('contacts', 'intakes.contact_id', '=', 'contacts.id');
    }

    protected function applyAddressJoin($query)
    {
        $query->join('opportunities AS opportunities1', 'quotation_requests.opportunity_id', '=', 'opportunities1.id');
        $query->join('intakes as intakes2',  'opportunities1.intake_id', '=', 'intakes2.id');
        $query->leftJoin('addresses', function ($join) {
            $join->on('addresses.id', '=', 'intakes2.address_id')
                ->whereNull('addresses.deleted_at');
        });
    }

    protected function applyMeasureJoin($query)
    {
        $query->join('opportunities AS opportunities2', 'quotation_requests.opportunity_id', '=', 'opportunities2.id');
        $query->join('measure_categories', 'opportunities2.measure_category_id', '=', 'measure_categories.id');
    }

    protected function applyCampaignJoin($query)
    {
        $query->join('opportunities AS opportunities3', 'quotation_requests.opportunity_id', '=', 'opportunities3.id');
        $query->join('intakes as intakes3',  'opportunities3.intake_id', '=', 'intakes3.id');
        $query->join('campaigns',  'intakes3.campaign_id', '=', 'campaigns.id');
    }

    protected function applyAddressAreaNameJoin($query)
    {
        $query->join('opportunities AS opportunities4', 'quotation_requests.opportunity_id', '=', 'opportunities4.id');
        $query->join('intakes as intakes4',  'opportunities4.intake_id', '=', 'intakes4.id');
        $query->join('addresses as addressAreaName',  'intakes4.address_id', '=', 'addressAreaName.id');
    }
}