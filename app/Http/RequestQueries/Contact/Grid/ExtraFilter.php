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
        'dateStart',
        'dateFinish',
        'orderStatus',
        'dateOfBirth',
        'energySupplier',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'createdAt' => 'contacts.created_at',
        'currentParticipations' => 'contacts.participations_current',
    ];

    protected $joins = [];

    /**
     * Override method omdat het in het contactgrid mogelijk is dat er extra parameters
     * tbv van filteren van producten worden meegegeven.
     */
    protected function addRequestFilter($filter)
    {
        parent::addRequestFilter($filter);

        $lastFilter = array_pop($this->filters);
        $lastFilter['connectName'] = isset($filter['connectName']) ? $filter['connectName'] : null;
        $lastFilter['connectedTo'] = isset($filter['connectedTo']) ? $filter['connectedTo'] : null;
        $this->filters[] = $lastFilter;
    }

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
            $raw = DB::raw('SUBSTRING(postal_code, 1, 4)');
            RequestFilter::applyFilter($query, $raw, $type, $data);
        });
    }

    /**
     * Override method omdat het in het contactgrid mogelijk is dat er extra parameters
     * tbv van filteren van producten worden meegegeven.
     */
    public function apply($query)
    {
        foreach ($this->filters as $filter) {
            $this->applySingleByArray($query, $filter);
        }
    }

    /**
     * Override method omdat het in het contactgrid mogelijk is dat er extra parameters
     * tbv van filteren van producten worden meegegeven.
     */
    public function applyOr($query)
    {
        $query->where(function ($query) {
            foreach ($this->filters as $filter) {
                $this->applySingleByArray($query, $filter, 'or');
            }
        });
    }

    /**
     * Extra method omdat het in het contactgrid mogelijk is dat er extra parameters
     * tbv van filteren van producten worden meegegeven.
     */
    private function applySingleByArray($query, array $filter, $filterType = 'and')
    {
        // Uitzondering voor product filters, hier zitten extra argumenten bij. Aparte routine laten doorlopen
        if($filter['field'] == 'product'){
            if($filterType === 'or'){
                $query->orWhere(function ($query) use ($filter) {
                    $this->applyProductFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
                });
            }else{
                $this->applyProductFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
            }
            return;
        }

        // Als er een connectedTo waarde is, dan is het een subfilter van product. Niet op standaard wijze filteren.
        // Filtering hierop wordt in applyProductFilter geregeld.
        if($filter['connectedTo']) return;

        // Betreft geen uitzondering; standaar functie doorlopen:
        $this->applySingle($query, $filter['field'], $filter['type'], $filter['data'], 'or');
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

    protected function applyProductFilter($query, $type, $data, $connectName)
    {
        $dateStartFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'dateStart');
        }))[0];
        $dateFinishFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'dateFinish');
        }))[0];
        $orderStatusFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'orderStatus');
        }))[0];
        $query->whereHas('orderProducts', function ($query) use ($data, $dateStartFilter, $dateFinishFilter, $orderStatusFilter) {
            $query->where('product_id', $data);

            // Eventueel extra filters toepassen
            //
            // PS; Laravel's hasManyThrough werkt dmv een join.
            // Aangezien order_product en orders allebei een date_start en date_end hebben
            // hier de volledige veldnaam incl. tabelnaam opgeven voor filterveld.
            if($dateStartFilter['data']){
                static::applyFilter($query, 'order_product.date_start', $dateStartFilter['type'], $dateStartFilter['data']);
            }
            if($dateFinishFilter['data']){
                static::applyFilter($query, 'order_product.date_end', $dateFinishFilter['type'], $dateFinishFilter['data']);
            }
            if($orderStatusFilter['data']){
                $query->whereHas('order', function($query) use ($orderStatusFilter) {
                    $query->where('status_id', $orderStatusFilter['data']);
                });
            }
        });
    }

    protected function applyEnergySupplierFilter($query, $type, $data)
    {
        $query->whereHas('primaryContactEnergySupplier', function($query) use ($data) {
            $query->where('energy_supplier_id', $data);
        });
    }
}