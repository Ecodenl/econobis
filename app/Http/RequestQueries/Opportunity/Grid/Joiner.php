<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Opportunity\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyMeasureCategoriesJoin($query)
    {
        $query->join('measure_categories', 'opportunities.measure_category_id', '=', 'measure_categories.id');
    }

    protected function applyMeasuresJoin($query)
    {
        $query->join('measure_opportunity', 'opportunities.id', '=', 'measure_opportunity.opportunity_id');
        $query->join('measures', 'measure_opportunity.measure_id', '=', 'measures.id');
    }

    protected function applyCampaignsJoin($query)
    {
        $query->join('intakes', 'opportunities.intake_id', '=', 'intakes.id');
        $query->join('campaigns', 'intakes.campaign_id', '=', 'campaigns.id');
    }

    protected function applyAddressAreaNameJoin($query)
    {
        $query->join('intakes as intakes2', 'opportunities.intake_id', '=', 'intakes2.id');
        $query->join('addresses as addressAreaName',  'intakes2.address_id', '=', 'addressAreaName.id');
    }

    protected function applyContactsJoin($query)
    {
        $query->join('intakes as intakes3', 'opportunities.intake_id', '=', 'intakes3.id');
        $query->join('contacts', 'intakes3.contact_id', '=', 'contacts.id');
    }

    protected function applyAddressJoin($query)
    {
        $query->join('intakes as intakes4',  'opportunities.intake_id', '=', 'intakes4.id');
        $query->leftJoin('addresses', function ($join) {
            $join->on('addresses.id', '=', 'intakes4.address_id')
                ->whereNull('addresses.deleted_at');
        });
    }
}