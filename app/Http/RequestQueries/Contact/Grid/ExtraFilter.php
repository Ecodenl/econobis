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
        'postalCode',
        'country',
        'createdAt',
        'currentObligations',
        'currentParticipations',
        'currentPostalcodeLinkCapital',
        'currentLoan',
        'staticContactGroup',
        'occupation',
        'occupationPrimary',
        'opportunity',
        'product',
        'dateStart',
        'dateFinish',
        'orderStatus',
        'dateOfBirth',
        'energySupplier',
        'portalUser',
        'didAgreeAvg',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'createdAt' => 'contacts.created_at',
        'currentObligations' => 'contacts.obligations_current',
        'currentParticipations' => 'contacts.participations_current',
        'currentPostalcodeLinkCapital' => 'contacts.postalcode_link_capital_current',
        'currentLoan' => 'contacts.loan_current',
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
        $this->applySingle($query, $filter['field'], $filter['type'], $filter['data'], $filterType);
    }

    protected function applyPostalCodeFilter($query, $type, $data)
    {
        switch($type) {
            case 'nct':
            case 'neq':
            case 'nbw':
            case 'new':
            case 'nl':
            case 'is0':
                $query->where(function ($query) use ($type, $data) {
                    $query->whereDoesntHave('primaryAddress')
                        ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                            $data = str_replace(' ', '', $data);
                            RequestFilter::applyFilter($query, 'postal_code', $type, $data);
                        });
                });
                break;
            default:
                $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
                    $data = str_replace(' ', '', $data);
                    RequestFilter::applyFilter($query, 'postal_code', $type, $data);
                });
                break;
        }
    }

    protected function applyCountryFilter($query, $type, $data)
    {
        switch($type) {
            case 'neq':
                if($data == 'NL') {
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
                            $data = str_replace(' ', '', $data);
                            RequestFilter::applyFilter($query, 'country_id', $type, $data);
                        })
                            ->whereHas('primaryAddress', function ($query) use ($type, $data) {
                                $data = str_replace(' ', '', $data);
                                RequestFilter::applyFilter($query, 'country_id', 'nnl', null);
                            });
                    });
                }
                elseif(empty($data)){
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('primaryAddress')
                            ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                                $data = str_replace(' ', '', $data);
                                RequestFilter::applyFilter($query, 'country_id', 'nl', null);
                            });
                    });
                }else{
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('primaryAddress')
                            ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                                $data = str_replace(' ', '', $data);
                                RequestFilter::applyFilter($query, 'country_id', $type, $data);
                            })
                            ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                                $data = str_replace(' ', '', $data);
                                RequestFilter::applyFilter($query, 'country_id', 'nl', null);
                            });
                    });
                }
                break;
            case 'nl':
                $query->where(function ($query) use ($type, $data) {
                    $query->whereDoesntHave('primaryAddress')
                        ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                            $data = str_replace(' ', '', $data);
                            RequestFilter::applyFilter($query, 'country_id', $type, $data);
                        });
                });
                break;
            default:
                if($data == 'NL')
                {
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('primaryAddress')
                            ->orWhereHas('primaryAddress', function ($query) use ($type, $data) {
                                $data = str_replace(' ', '', $data);
                                RequestFilter::applyFilter($query, 'country_id', $type, $data);})
                            ->orwhereHas('primaryAddress', function ($query) use ($type, $data) {
                                RequestFilter::applyFilter($query, 'country_id', 'nl', null);
                            });
                    });
                }
                elseif(empty($data)){
                    $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
                        $data = str_replace(' ', '', $data);
                        RequestFilter::applyFilter($query, 'country_id', 'nnl', null);
                    });
                }else{
                    $query->whereHas('primaryAddress', function ($query) use ($type, $data) {
                        $data = str_replace(' ', '', $data);
                        RequestFilter::applyFilter($query, 'country_id', $type, $data);
                    });
                }
                break;
        }
    }

    protected function applyStaticContactGroupFilter($query, $type, $data)
    {
        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('groups');
                    break;
                default:
                    $query->whereDoesntHave('groups');
                    break;
            }
        }else {
            switch ($type) {
                case 'neq':
                    $query->whereDoesntHave('groups', function ($query) use ($data) {
                        $query->where('contact_groups.id', $data);
                    });
                    break;
                default:
                    $query->whereHas('groups', function ($query) use ($data) {
                        $query->where('contact_groups.id', $data);
                    });
                    break;
            }
        }
    }

    protected function applyOccupationFilter($query, $type, $data)
    {
        if(empty($data))
        {
            switch($type){
                case 'neq':
                    $query->whereDoesntHave('isSecondaryOccupant');
                    break;
                case 'eq':
                    $query->whereHas('isSecondaryOccupant');
                    break;
                case 'rel':
                    $query->whereDoesntHave('isPrimaryOccupant');
                    break;
                case 'nrel':
                    $query->whereHas('isPrimaryOccupant');
                    break;
            }
        }else{
            switch($type){
                case 'eq':
                    $query->whereHas('isSecondaryOccupant', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'neq':
                    $query->whereDoesntHave('isSecondaryOccupant', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'rel':
                    $query->whereHas('isPrimaryOccupant', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'nrel':
                    $query->whereDoesntHave('isPrimaryOccupant', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
            }
        }

    }
    protected function applyOccupationPrimaryFilter($query, $type, $data)
    {
        if(empty($data))
        {
            switch($type){
                case 'eq':
                    $query->whereDoesntHave('isSecondaryOccupantPrimary');
                    break;
                case 'neq':
                    $query->whereHas('isSecondaryOccupantPrimary');
                    break;
                case 'rel':
                    $query->whereDoesntHave('isPrimaryOccupantPrimary');
                    break;
                case 'nrel':
                    $query->whereHas('isPrimaryOccupantPrimary');
                    break;
            }
        }else{
            switch($type){
                case 'eq':
                    $query->whereHas('isSecondaryOccupantPrimary', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'neq':
                    $query->whereDoesntHave('isSecondaryOccupantPrimary', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'rel':
                    $query->whereHas('isPrimaryOccupantPrimary', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
                case 'nrel':
                    $query->whereDoesntHave('isPrimaryOccupantPrimary', function($join) use ($data){
                        $join->where('occupation_contact.occupation_id', $data);
                    });
                    break;
            }
        }

    }

    protected function applyOpportunityFilter($query, $type, $data)
    {
        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('opportunities');
                    break;
                default:
                    $query->whereDoesntHave('opportunities');
                    break;
            }
        }else{
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('opportunities')
                            ->orWhereDoesntHave('opportunities', function ($query) use ($type, $data) {
                                RequestFilter::applyFilter($query, 'measure_category_id', 'eq', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('opportunities', function ($query) use ($type, $data) {
                        RequestFilter::applyFilter($query, 'measure_category_id', $type, $data);
                    });
                    break;
            }
        }

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
        if(empty($data))
        {
            switch($type) {
                case 'eq':
                    $query->whereHas('orderProducts', function ($query) use ($data, $dateStartFilter, $dateFinishFilter, $orderStatusFilter) {
                        // Eventueel extra filters toepassen
                        //
                        // PS; Laravel's hasManyThrough werkt dmv een join.
                        // Aangezien order_product en orders allebei een date_start en date_end hebben
                        // hier de volledige veldnaam incl. tabelnaam opgeven voor filterveld.
                        if($dateStartFilter['data'] || $dateStartFilter['type'] == 'nl' || $dateStartFilter['type'] == 'nnl'){
                            static::applyFilter($query, 'order_product.date_start', $dateStartFilter['type'], $dateStartFilter['data']);
                        }
                        if($dateFinishFilter['data'] || $dateFinishFilter['type'] == 'nl' || $dateFinishFilter['type'] == 'nnl'){
                            static::applyFilter($query, 'order_product.date_end', $dateFinishFilter['type'], $dateFinishFilter['data']);
                        }
                        if($orderStatusFilter['data']){
                            $query->whereHas('order', function($query) use ($orderStatusFilter) {
                                $query->where('status_id', $orderStatusFilter['data']);
                            });
                        }elseif($orderStatusFilter['type'] == 'neq'){
                            $query->whereDoesntHave('order');
                        }

                    });
                    break;
                default:
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('orderProducts');
                    });
                    break;
            }

        }else{
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('orderProducts')
                            ->orWhereHas('orderProducts', function ($query) use ($data) {
                                $query->where('product_id', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('orderProducts', function ($query) use ($data, $dateStartFilter, $dateFinishFilter, $orderStatusFilter) {
                        $query->where('product_id', $data);

                        // Eventueel extra filters toepassen
                        //
                        // PS; Laravel's hasManyThrough werkt dmv een join.
                        // Aangezien order_product en orders allebei een date_start en date_end hebben
                        // hier de volledige veldnaam incl. tabelnaam opgeven voor filterveld.
                        if($dateStartFilter['data'] || $dateStartFilter['type'] == 'nl' || $dateStartFilter['type'] == 'nnl'){
                            static::applyFilter($query, 'order_product.date_start', $dateStartFilter['type'], $dateStartFilter['data']);
                        }
                        if($dateFinishFilter['data'] || $dateFinishFilter['type'] == 'nl' || $dateFinishFilter['type'] == 'nnl'){
                            static::applyFilter($query, 'order_product.date_end', $dateFinishFilter['type'], $dateFinishFilter['data']);
                        }
                        if($orderStatusFilter['data']){
                            $query->whereHas('order', function($query) use ($orderStatusFilter) {
                                $query->where('status_id', $orderStatusFilter['data']);
                            });
                        }
                    });
                    break;
            }
        }
    }

    protected function applyEnergySupplierFilter($query, $type, $data)
    {
        if($type === 'eq'){
            if(empty($data)) {
                $query->whereHas('primaryContactEnergySupplier');
            }else{
                $query->whereHas('primaryContactEnergySupplier', function($query) use ($data) {
                    $query->where('energy_supplier_id', $data);
                });
            }
        }
        elseif($type === 'neq'){
            if(empty($data)){
                $query->whereDoesntHave('primaryContactEnergySupplier');
            }else {
                $query->whereDoesntHave('primaryContactEnergySupplier', function ($query) use ($data) {
                    $query->where('energy_supplier_id', $data);
                });
            }
        }
        elseif($type === 'nl'){
            $query->whereDoesntHave('primaryContactEnergySupplier');
        }
        elseif($type === 'nnl'){
            $query->whereHas('primaryContactEnergySupplier');
        }
    }

    protected function applyDidAgreeAvgFilter($query, $type, $data)
    {
        RequestFilter::applyFilter($query, 'did_agree_avg', 'eq', $data);
    }

    protected function applyPortalUserFilter($query, $type, $data)
    {
        if($data){
            $query->whereHas('portalUser');
        }else{
            $query->whereDoesntHave('portalUser')
            ->whereHas('person');
        }
    }


}