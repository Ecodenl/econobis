<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;
use App\Helpers\RequestQuery\RequestFilter;
use Config;
use Illuminate\Support\Facades\DB;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCodeNumber',
        'statusId',
        'createdAt',
        'currentParticipations',
        'occupation',
        'opportunity',
        'product'
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'statusId' => 'contacts.status_id',
        'createdAt' => 'contacts.created_at',
        'currentParticipations' => 'contacts.participations_current',
    ];

    protected $joins = [
        'postalCodeNumber' => 'address',
        'occupation' => 'occupation',
        'opportunity' => 'opportunity',
        'product' => 'orderProduct',
    ];

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = DB::raw('SUBSTRING(addresses.postal_code, 1, 4)');
        RequestFilter::applyFilter($query, $raw, $type, $data);
        return false;
    }

    protected function applyOccupationFilter($query, $type, $data)
    {
        RequestFilter::applyFilter($query, 'occupation_contact.occupation_id', $type, $data);
    }

    protected function applyOpportunityFilter($query, $type, $data)
    {
        RequestFilter::applyFilter($query, 'opportunities.measure_category_id', $type, $data);
    }

    protected function applyProductFilter($query, $type, $data)
    {
        RequestFilter::applyFilter($query, 'order_product.product_id', $type, $data);
    }
}