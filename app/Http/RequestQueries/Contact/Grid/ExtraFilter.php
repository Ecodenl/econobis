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
        'createdAt',
        'currentParticipations',
        'occupation',
        'opportunity',
        'product',
        'dateOfBirth',
        'energySupplier',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'createdAt' => 'contacts.created_at',
        'currentParticipations' => 'contacts.participations_current',
    ];

    protected $joins = [];

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
            $raw = DB::raw('SUBSTRING(postal_code, 1, 4)');
            RequestFilter::applyFilter($query, $raw, $type, $data);
        });
    }

    protected function applyOccupationFilter($query, $type, $data)
    {
        $query->where(function($query) use ($data) {
            $query->whereHas('occupations', function ($query) use ($data) {
                $query->where('occupation_id', $data);
            });
            $query->orWhereHas('primaryOccupations', function ($query) use ($data) {
                $query->where('occupation_id', $data);
            });
        });
    }

    protected function applyOpportunityFilter($query, $type, $data)
    {
        $query->whereHas('opportunities', function ($query) use ($data) {
            $query->where('measure_category_id', $data);
        });
    }

    protected function applyDateOfBirthFilter($query, $type, $data)
    {
        $query->whereHas('person', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'date_of_birth', $type, $data);
        });
    }

    protected function applyProductFilter($query, $type, $data)
    {
        $query->whereHas('orderProducts', function ($query) use ($data) {
            $query->where('product_id', $data);
        });
    }

    protected function applyEnergySupplierFilter($query, $type, $data)
    {
        $query->whereHas('primaryContactEnergySupplier', function($query) use ($data) {
            $query->where('energy_supplier_id', $data);
        });
    }
}