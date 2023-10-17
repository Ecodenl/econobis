<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Eco\HousingFile\HousingFileHoomLink;
use App\Helpers\RequestQuery\RequestExtraFilter;
use App\Helpers\RequestQuery\RequestFilter;

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
        'opportunityMeasureCategory',
        'opportunityStatus',
        'opportunityMeasure',
        'opportunityEvaluationRealised',
        'opportunityCampaign',
        'intakeMeasureCategory',
        'intakeDateStart',
        'intakeDateFinish',
        'intakeStatus',
        'campaign',
        'product',
        'dateStart',
        'dateFinish',
        'orderStatus',
        'dateOfBirth',
        'energySupplier',
        'energySupplierType',
        'portalUser',
        'didAgreeAvg',
        'quotationRequestStatusOrganisationOrCoach',
        'quotationRequestStatusOccupant',
        'housingFileExists',
        'housingFileFieldName',
        'housingFileFieldValue',
        'inspectionPersonType',
        'freeFieldsFieldName',
        'freeFieldsFieldValue',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'createdAt' => 'contacts.created_at',
        'currentObligations' => 'contacts.obligations_current',
        'currentParticipations' => 'contacts.participations_current',
        'currentPostalcodeLinkCapital' => 'contacts.postalcode_link_capital_current',
        'currentLoan' => 'contacts.loan_current',
        'inspectionPersonType' => 'contacts.inspection_person_type_id',
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
//        Log::info("debug query");
//        $sql = str_replace(array('?'), array('\'%s\''), $query->toSql());
//        $sql = vsprintf($sql, $query->getBindings());
//        Log::info($sql);

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
        // Ook Uitzondering voor kans filters, hier zitten extra argumenten bij. Aparte routine laten doorlopen
        if($filter['field'] == 'opportunityMeasureCategory' ){
            if($filterType === 'or'){
                $query->orWhere(function ($query) use ($filter) {
                    $this->applyOpportunityMeasureCategoryFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
                });
            }else{
                $this->applyOpportunityMeasureCategoryFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
            }
            return;
        }
        // Ook Uitzondering voor intake filters, hier zitten extra argumenten bij. Aparte routine laten doorlopen
        if($filter['field'] == 'intakeMeasureCategory' ){
            if($filterType === 'or'){
                $query->orWhere(function ($query) use ($filter) {
                    $this->applyIntakeMeasureCategoryFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
                });
            }else{
                $this->applyIntakeMeasureCategoryFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
            }
            return;
        }

        // Ook Uitzondering voor housingfile filters, hier zitten extra argumenten bij. Aparte routine laten doorlopen
        if($filter['field'] == 'housingFileFieldName' ){
            if($filterType === 'or'){
                $query->orWhere(function ($query) use ($filter) {
                    $this->applyHousingFileFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
                });
            }else{
                $this->applyHousingFileFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
            }
            return;
        }

        // Ook Uitzondering voor freefields filters, hier zitten extra argumenten bij. Aparte routine laten doorlopen
        if($filter['field'] == 'freeFieldsFieldName' ){
            if($filterType === 'or'){
                $query->orWhere(function ($query) use ($filter) {
                    $this->applyFreeFieldsFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
                });
            }else{
                $this->applyFreeFieldsFilter($query, $filter['type'], $filter['data'], $filter['connectName']);
            }
            return;
        }

        // Als er een connectedTo waarde is, dan is het een subfilter van product of kans. Niet op standaard wijze filteren.
        // Filtering hierop wordt in applyProductFilter, applyOpportunityMeasureCategoryFilter, applyIntakeMeasureCategoryFilter of applyHousingFileFilter geregeld.
        if($filter['connectedTo']) return;

        // Betreft geen uitzondering; standaard functie doorlopen:
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

    protected function applyQuotationRequestStatusOrganisationOrCoachFilter($query, $type, $data)
    {
        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('quotationRequests');
                    break;
                default:
                    $query->whereDoesntHave('quotationRequests');
                    break;
            }
        }else{
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('quotationRequests')
                            ->orWhereDoesntHave('quotationRequests', function ($query) use ($type, $data) {
                                RequestFilter::applyFilter($query, 'status_id', 'eq', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('quotationRequests', function ($query) use ($type, $data) {
                        RequestFilter::applyFilter($query, 'status_id', $type, $data);
                    });
                    break;
            }
        }
    }

    protected function applyQuotationRequestStatusOccupantFilter($query, $type, $data)
    {

        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('opportunities', function ($query) {
                        $query->whereHas('quotationRequests');
                    });
                    break;
                default:
                    $query->whereDoesntHave('opportunities')
                        ->orWhereHas('opportunities', function ($query) {
                            $query->whereDoesntHave('quotationRequests');
                    });
                    break;
            }
        }else{
            switch($type) {
                case 'neq':
                    $query->whereDoesntHave('opportunities')
                        ->orWhereHas('opportunities', function ($query) use ($data) {
                        $query->whereDoesntHave('quotationRequests')
                            ->orWhereHas('quotationRequests', function ($query) use ($data) {
                            $query->where('status_id', '!=', $data);
                        });
                    });
                    break;
                default:
                    $query->whereHas('opportunities', function ($query) use ($data) {
                        $query->whereHas('quotationRequests', function ($query) use ($data) {
                            $query->where('status_id', $data);
                        });
                    });
                    break;
            }
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

    protected function applyCampaignFilter($query, $type, $data)
    {
        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('intakes');
                    break;
                default:
                    $query->whereDoesntHave('intakes');
                    break;
            }
        }else{
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('intakes', function ($query) use ($type, $data) {
                                $query->where('campaign_id', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('intakes', function ($query) use ($type, $data) {
                        RequestFilter::applyFilter($query, 'campaign_id', $type, $data);
                    });
                    break;
            }
        }

    }

    protected function applyCreatedAtFilter($query, $type, $data)
    {
        if($type == 'eq'
            || $type == 'neq'
            || $type == 'lt'
            || $type == 'lte'
            || $type == 'gt'
            || $type == 'gte'
        ){
            RequestFilter::applyFilterWhereRaw($query, 'cast(`contacts`.`created_at` as date)', $type, "'" . $data . "'");
        } else {
            RequestFilter::applyFilter($query, 'created_at', $type, $data);
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
        }));
        $dateStartFilter = $dateStartFilter ? $dateStartFilter[0] : null;

        $dateFinishFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'dateFinish');
        }));
        $dateFinishFilter = $dateFinishFilter ? $dateFinishFilter[0] : null;

        $orderStatusFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'orderStatus');
        }));
        $orderStatusFilter = $orderStatusFilter ? $orderStatusFilter[0] : null;

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
                        $query->whereDoesntHave('orderProducts', function ($query) use ($data) {
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
                $query->where(function ($query) use ($type, $data) {
                    $query->whereHas('addresses', function($query) {
                        $query
                            ->whereHas('currentAddressEnergySupplierElectricityAndGas')
                            ->where('type_id', '!=', 'old');
                    });
                });
            } else {
                $query->where(function ($query) use ($type, $data) {
                    $query->whereHas('addresses', function($query) use ($data) {
                        $query
                            ->whereHas('currentAddressEnergySupplierElectricityAndGas', function($query) use ($data) {
                                $query->where('energy_supplier_id', $data);
                            })
                            ->where('type_id', '!=', 'old');
                    });
                });
            }
        }
        elseif($type === 'neq'){
            if(empty($data)){
                $query->where(function ($query) use ($type, $data) {
                    $query
                        ->whereDoesntHave('addresses', function ($query) use ($type, $data) {
                            $query->where('type_id', '!=', 'old');
                        })
                        ->orWhereHas('addresses', function ($query) use ($type, $data) {
                            $query
                                ->whereDoesntHave('currentAddressEnergySupplierElectricityAndGas')
                                ->where('type_id', '!=', 'old');
                        });
                });
            } else {
                $query->where(function ($query) use ($type, $data) {
                    $query
                        ->whereDoesntHave('addresses', function ($query) use ($type, $data) {
                            $query->where('type_id', '!=', 'old');
                        })
                        ->orWhereHas('addresses', function ($query) use ($type, $data) {
                            $query
                                ->whereDoesntHave('currentAddressEnergySupplierElectricityAndGas', function ($query) use ($type, $data) {
                                    $data = str_replace(' ', '', $data);
                                    $query->where('energy_supplier_id', $data);
                                })
                                ->where('type_id', '!=', 'old');
                        });
                });
            }
        }
        elseif($type === 'nl'){
            $query
                ->whereDoesntHave('addresses', function ($query) use ($type, $data) {
                    $query->where('type_id', '!=', 'old');
                })
                ->orWhereHas('addresses', function ($query) use ($type) {
                    $query
                        ->whereDoesntHave('currentAddressEnergySupplierElectricityAndGas')
                        ->where('type_id', '!=', 'old');
                });
        }
        elseif($type === 'nnl'){
            $query->whereHas('addresses', function($query) use ($type) {
                $query
                    ->whereHas('currentAddressEnergySupplierElectricityAndGas')
                    ->where('type_id', '!=', 'old');
            });
        }
    }

    protected function applyEnergySupplierTypeFilter($query, $type, $data)
    {
        if(empty($data)) {
            switch($type) {
                case 'eq':
                    $query->whereHas('currentAddressEnergySuppliers');
                    break;
                default:
                    $query->whereDoesntHave('currentAddressEnergySuppliers');
                    break;
            }
        } else {
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('currentAddressEnergySuppliers', function ($query) use ($type, $data) {
                                $query->where('energy_supply_type_id', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('currentAddressEnergySuppliers', function ($query) use ($type, $data) {
                        RequestFilter::applyFilter($query, 'energy_supply_type_id', $type, $data);
                    });
                    break;
            }
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

    protected function applyHousingFileExistsFilter($query, $type, $data)
    {
        if($data){
            $query->whereHas('housingFiles');
        }else{
            $query->whereDoesntHave('housingFiles');
        }
    }
    protected function applyInspectionPersonTypeFilter($query, $type, $data)
    {
        switch($type) {
            case 'neq':
                if(empty($data)){
                    RequestFilter::applyFilter($query, 'inspection_person_type_id', 'nl', null);
                }else{
                    $query->Where(function ($query) use ($type, $data) {
                        RequestFilter::applyFilter($query, 'inspection_person_type_id', $type, $data);
                    })
                        ->orWhere(function ($query) use ($data) {
                            RequestFilter::applyFilter($query, 'inspection_person_type_id', 'nl', null);
                        });
                }
                break;
            default:
                if(empty($data)){
                    RequestFilter::applyFilter($query, 'inspection_person_type_id', 'nnl', '');
                }else{
                    RequestFilter::applyFilter($query, 'inspection_person_type_id', $type, $data);
                }
                break;
        }
    }

    protected function applyOpportunityMeasureCategoryFilter($query, $type, $data, $connectName)
    {
        $opportunityStatusFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'opportunityStatus');
        }));
        $opportunityStatusFilter = $opportunityStatusFilter ? $opportunityStatusFilter[0] : null;

        $opportunityMeasureFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'opportunityMeasure');
        }));
        $opportunityMeasureFilter = $opportunityMeasureFilter ? $opportunityMeasureFilter[0] : null;

        $opportunityEvaluationRealisedFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'opportunityEvaluationRealised');
        }));
        $opportunityEvaluationRealisedFilter = $opportunityEvaluationRealisedFilter ? $opportunityEvaluationRealisedFilter[0] : null;

        $opportunityCampaignFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'opportunityCampaign');
        }));
        $opportunityCampaignFilter = $opportunityCampaignFilter ? $opportunityCampaignFilter[0] : null;

        if(empty($data)){
            switch($type) {
                case 'eq':
                    $query->whereHas('opportunities', function ($query) use ($data, $opportunityStatusFilter, $opportunityMeasureFilter, $opportunityEvaluationRealisedFilter, $opportunityCampaignFilter) {
                        // Eventueel extra filters toepassen
                        if($opportunityStatusFilter && ($opportunityStatusFilter['data'] || $opportunityStatusFilter['type'] == 'nl' || $opportunityStatusFilter['type'] == 'nnl') ){
                            static::applyFilter($query, 'opportunities.status_id', $opportunityStatusFilter['type'], $opportunityStatusFilter['data']);
                        }
                        if($opportunityMeasureFilter && $opportunityMeasureFilter['data']){
                            $query->whereHas('measures', function($query) use ($opportunityMeasureFilter) {
                                $query->where('measure_opportunity.measure_id', $opportunityMeasureFilter['data']);
                            });
                        }elseif($opportunityMeasureFilter && $opportunityMeasureFilter['type'] == 'neq'){
                            $query->whereDoesntHave('measures');
                        }
                        if($opportunityEvaluationRealisedFilter && $opportunityEvaluationRealisedFilter['data']){
                            static::applyFilter($query, 'opportunities.evaluation_is_realised', $opportunityEvaluationRealisedFilter['type'], $opportunityEvaluationRealisedFilter['data']);
                        }
                        if($opportunityCampaignFilter && $opportunityCampaignFilter['data']) {
                            $query->whereHas('intake', function ($query) use ($opportunityCampaignFilter) {
                                $query->where('intakes.campaign_id', $opportunityCampaignFilter['data']);
                            });
                        }elseif($opportunityCampaignFilter && $opportunityCampaignFilter['type'] == 'neq'){
                            $query->whereDoesntHave('intake');
                        }
                    });
                    break;
                default:
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('opportunities');
                    });
                    break;
            }

        }else{
            switch($type) {
                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('opportunities', function ($query) use ($data) {
                                $query->where('measure_category_id', $data);
                            });
                    });
                    break;
                default:
                    $query->whereHas('opportunities', function ($query) use ($data, $opportunityStatusFilter, $opportunityMeasureFilter, $opportunityEvaluationRealisedFilter, $opportunityCampaignFilter) {
                        $query->where('measure_category_id', $data);

                        // Eventueel extra filters toepassen
                        if($opportunityStatusFilter && ($opportunityStatusFilter['data'] || $opportunityStatusFilter['type'] == 'nl' || $opportunityStatusFilter['type'] == 'nnl') ){
                            static::applyFilter($query, 'opportunities.status_id', $opportunityStatusFilter['type'], $opportunityStatusFilter['data']);
                        }
                        if($opportunityMeasureFilter && $opportunityMeasureFilter['data'] ){
                            $query->whereHas('measures', function($query) use ($opportunityMeasureFilter) {
                                $query->where('measure_opportunity.measure_id', $opportunityMeasureFilter['data']);
                            });
                        }
                        if($opportunityEvaluationRealisedFilter && $opportunityEvaluationRealisedFilter['data']){
                            static::applyFilter($query, 'opportunities.evaluation_is_realised', $opportunityEvaluationRealisedFilter['type'], $opportunityEvaluationRealisedFilter['data']);
                        }
                        if($opportunityCampaignFilter && $opportunityCampaignFilter['data'] ){
                            $query->whereHas('intake', function($query) use ($opportunityCampaignFilter) {
                                $query->where('intakes.campaign_id', $opportunityCampaignFilter['data']);
                            });
                        }
                    });
                    break;
            }
        }
    }

    protected function applyIntakeMeasureCategoryFilter($query, $type, $data, $connectName)
    {
        $intakeDateStartFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'intakeDateStart');
        }));
        $intakeDateStartFilter = $intakeDateStartFilter ? $intakeDateStartFilter[0] : null;

        $intakeDateFinishFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'intakeDateFinish');
        }));
        $intakeDateFinishFilter = $intakeDateFinishFilter ? $intakeDateFinishFilter[0] : null;

        $intakeStatusFilter = array_values(array_filter($this->filters, function($element) use($connectName){
            return ($element['connectedTo'] == $connectName && $element['field'] == 'intakeStatus');
        }));
        $intakeStatusFilter = $intakeStatusFilter ? $intakeStatusFilter[0] : null;

        if(empty($data))
        {
            switch($type) {
                case 'eq':
                    $query->whereHas('intakes', function ($query) use ($data, $intakeDateStartFilter, $intakeDateFinishFilter, $intakeStatusFilter) {
                        // Eventueel extra filters toepassen
                        if($intakeDateStartFilter){
                            if($intakeDateStartFilter['type'] == 'nl' || $intakeDateStartFilter['type'] == 'nnl'){
                                static::applyFilter($query, 'created_at', $intakeDateStartFilter['type'], $intakeDateStartFilter['data']);
                            } else {
                                if($intakeDateStartFilter['data']) {
                                    static::applyFilterWhereRaw($query, 'cast(`intakes`.`created_at` as date)', $intakeDateStartFilter['type'], "'" . $intakeDateStartFilter['data'] . "'");
                                }
                            }
                        }
                        if($intakeDateStartFilter) {
                            if ($intakeDateFinishFilter['type'] == 'nl' || $intakeDateFinishFilter['type'] == 'nnl') {
                                static::applyFilter($query, 'created_at', $intakeDateFinishFilter['type'], $intakeDateFinishFilter['data']);
                            } else {
                                if($intakeDateFinishFilter['data']){
                                    static::applyFilterWhereRaw($query, 'cast(`intakes`.`created_at` as date)', $intakeDateFinishFilter['type'], "'" . $intakeDateFinishFilter['data'] . "'");
                                }
                            }
                        }
                        if($intakeStatusFilter && ($intakeStatusFilter['data'] || $intakeStatusFilter['type'] == 'nl' || $intakeStatusFilter['type'] == 'nnl') ){
                            static::applyFilter($query, 'intakes.intake_status_id', $intakeStatusFilter['type'], $intakeStatusFilter['data']);
                        }
                    });
                    break;
                default:
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('intakes');
                    });
                    break;
            }

        }else{

            switch($type) {

                case 'neq':
                    $query->where(function ($query) use ($type, $data) {
                        $query->whereDoesntHave('intakes', function ($query) use ($data) {
                                $query->whereHas('measuresRequested', function($query) use ($data) {
                                    $query->where('intake_measure_requested.measure_category_id', $data);
                                });
                            });
                    });
                    break;
                default:
                    $query->whereHas('intakes', function ($query) use ($data, $intakeDateStartFilter, $intakeDateFinishFilter, $intakeStatusFilter) {
                        $query->whereHas('measuresRequested', function($query) use ($data) {
                            $query->where('intake_measure_requested.measure_category_id', $data);
                        });

                        // Eventueel extra filters toepassen
                        if($intakeDateStartFilter){
                            if($intakeDateStartFilter['type'] == 'nl' || $intakeDateStartFilter['type'] == 'nnl'){
                                static::applyFilter($query, 'created_at', $intakeDateStartFilter['type'], $intakeDateStartFilter['data']);
                            } else {
                                if($intakeDateStartFilter['data']) {
                                    static::applyFilterWhereRaw($query, 'cast(`intakes`.`created_at` as date)', $intakeDateStartFilter['type'], "'" . $intakeDateStartFilter['data'] . "'");
                                }
                            }
                        }
                        if($intakeDateFinishFilter){
                            if($intakeDateFinishFilter['type'] == 'nl' || $intakeDateFinishFilter['type'] == 'nnl'){
                                static::applyFilter($query, 'created_at', $intakeDateFinishFilter['type'], $intakeDateFinishFilter['data']);
                            } else {
                                if($intakeDateFinishFilter['data']) {
                                    static::applyFilterWhereRaw($query, 'cast(`intakes`.`created_at` as date)', $intakeDateFinishFilter['type'], "'" . $intakeDateFinishFilter['data'] . "'");
                                }
                            }
                        }
                        if($intakeStatusFilter && ($intakeStatusFilter['data'] || $intakeStatusFilter['type'] == 'nl' || $intakeStatusFilter['type'] == 'nnl') ){
                            static::applyFilter($query, 'intakes.intake_status_id', $intakeStatusFilter['type'], $intakeStatusFilter['data']);
                        }

                    });
                    break;
            }
        }

    }

    protected function applyHousingFileFilter($query, $housingFileFieldNameType, $housingFileFieldNameData, $housingFileFieldNameConnectName)
    {
        if(empty($housingFileFieldNameData)){
            return;
        }

        $housingFileHoomLink = HousingFileHoomLink::find($housingFileFieldNameData);
        if(!$housingFileHoomLink){
            return;
        }

        $econobisFieldName = $housingFileHoomLink->econobis_field_name;

        $housingFileFieldValueFilter = array_values(array_filter($this->filters, function($element) use($housingFileFieldNameConnectName){
            return ($element['connectedTo'] == $housingFileFieldNameConnectName && $element['field'] == 'housingFileFieldValue');
        }));
        $housingFileFieldValueFilter = $housingFileFieldValueFilter ? $housingFileFieldValueFilter[0] : null;

        $housingFileFieldValueType = $housingFileFieldValueFilter['type'];
        $housingFileFieldValueData = $housingFileFieldValueFilter['data'];

        switch($housingFileHoomLink->housing_file_data_type) {
            // Filter op Woningdossier Basis en Gebruikgegevens
            case 'B':
            case 'G':
                $query->whereHas('housingFiles', function ($query) use ($econobisFieldName, $housingFileFieldValueData, $housingFileFieldValueType) {
                    if($housingFileFieldValueType == 'lt'
                        || $housingFileFieldValueType == 'lte'
                        || $housingFileFieldValueType == 'gt'
                        || $housingFileFieldValueType == 'gte'
                    ){
                        static::applyFilterWhereRaw($query, '`housing_files`.`'.$econobisFieldName.'`', $housingFileFieldValueType, 'cast("' . $housingFileFieldValueData . '" AS int)');
                    } else {
                        static::applyFilter($query, 'housing_files.'.$econobisFieldName, $housingFileFieldValueType, $housingFileFieldValueData);
                    }
                });
                break;

            case 'W':
                if($housingFileFieldValueData != 0 && empty($housingFileFieldValueData)) {
                    switch ($housingFileFieldValueType) {
                        case 'eq':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                    $query->whereNull('status')->orWhere('status', '=', '');
                                });
                            });
                            break;
                        case 'neq':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                    $query->whereNotNull('status')->orWhere('status', '!=', '');
                                });
                            });
                            break;
                        case 'nl':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                    $query->whereNull('status')->orWhere('status', '=', '');
                                });
                                $query->orWheredoesntHave('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                });
                            });
                            break;
                        case 'nnl':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                });
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    switch ($housingFileFieldValueType) {
                        case 'eq':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                    $query->where('status', '=', $housingFileFieldValueData);
                                });
                            });
                            break;
                        case 'neq':
                            $query->whereHas('housingFiles', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                $query->whereHas('housingFileHousingStatuses', function ($query) use ($housingFileHoomLink, $housingFileFieldValueData) {
                                    $query->where('housing_file_hoom_links_id', '=', $housingFileHoomLink->id);
                                    $query->where('status', '!=', $housingFileFieldValueData);
                                });
                            });
                            break;
                        default:
                            break;
                    }
                }
                break;
        }

    }

    protected function applyFreeFieldsFilter($query, $freeFieldsFieldNameType, $freeFieldsFieldNameData, $freeFieldsFieldNameConnectName)
    {
        if(empty($freeFieldsFieldNameData)){
            return;
        }

        return;

//        $freeFieldsField = FreeFieldsField::find($freeFieldsFieldNameData);
//        if(!$freeFieldsField){
//            return;
//        }

//        $econobisFieldName = $freeFieldsField->econobis_field_name;
//
//        $housingFileFieldValueFilter = array_values(array_filter($this->filters, function($element) use($freeFieldsFieldNameConnectName){
//            return ($element['connectedTo'] == $freeFieldsFieldNameConnectName && $element['field'] == 'housingFileFieldValue');
//        }));
//        $housingFileFieldValueFilter = $housingFileFieldValueFilter ? $housingFileFieldValueFilter[0] : null;
//
//        $housingFileFieldValueType = $housingFileFieldValueFilter['type'];
//        $housingFileFieldValueData = $housingFileFieldValueFilter['data'];

    }

}