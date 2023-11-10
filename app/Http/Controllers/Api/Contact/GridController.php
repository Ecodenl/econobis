<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\DynamicContactGroupFilter;
use App\Eco\Cooperation\Cooperation;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Helpers\CSV\ContactCSVHelper;
use App\Helpers\Excel\ContactExcelHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\Contact\Grid\RequestQuery;
use App\Http\Resources\Contact\GridContactCollection;
use App\Http\Resources\ContactGroup\FullContactGroup;
use Illuminate\Http\Request;

class GridController extends Controller
{

    public function index(Request $request, RequestQuery $requestQuery)
    {
        $contacts = $requestQuery->get();
        $contacts->load('primaryAddress');
        $contacts->load('primaryEmailAddress');
        $contacts->load('primaryPhoneNumber');

        $cooperation = Cooperation::first();
        $useExportAddressConsumption = $cooperation ? $cooperation->use_export_address_consumption : false;

// todo WM: opschonen
//
// aanvullende meta velden moeten ook toegevoegd worden aan ContactListReducer
//        $numberOfContactsWithConsumptionGas = $contacts->where('has_address_energy_consumption_gas_periods', true);
//        $numberOfContactsWithConsumptionElectricity = $contacts->where('has_address_energy_consumption_electricity_periods', true);
        return (new GridContactCollection($contacts))
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'useExportAddressConsumption' => $useExportAddressConsumption,
// todo WM: opschonen
//
//                'totalWithConsumptionGas' => $numberOfContactsWithConsumptionGas,
//                'totalWithConsumptionElectricity' => $numberOfContactsWithConsumptionElectricity,
                ]
            ]);
    }

    public function csv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contacts = $requestQuery->getQueryNoPagination()->get();

        $contactCSVHelper = new ContactCSVHelper($contacts);

        return $contactCSVHelper->downloadCSV();
    }

    public function energySuppliersCsv(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contacts = $requestQuery->getQueryNoPagination()->get();

        $contactCSVHelper = new ContactCSVHelper($contacts);

        return $contactCSVHelper->downloadEnergySuppliersCSV();
    }

    public function excelAddressEnergyConsumptionGas(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contacts = $requestQuery->getQuery()->get();

        $contacts->load([
            'addresses',
            'addresses.addressEnergyConsumptionGasPeriods',
        ]);

        $contactExcelHelper = new ContactExcelHelper($contacts);

        return $contactExcelHelper->downloadExcelAddressEnergyConsumptionGas();
    }

    public function excelAddressEnergyConsumptionElectricity(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $contacts = $requestQuery->getQuery()->get();

        $contacts->load([
            'addresses',
            'addresses.addressEnergyConsumptionElectricityPeriods',
        ]);

        $contactExcelHelper = new ContactExcelHelper($contacts);

        return $contactExcelHelper->downloadExcelAddressEnergyConsumptionElectricity();
    }

    public function saveAsGroup(Request $request)
    {
        $filters = json_decode($request->input('filters'));
        $extraFilters = json_decode($request->input('extraFilters'));

        $contactGroup = new ContactGroup();
        $contactGroup->type_id = 'dynamic';
        $contactGroup->composed_of = 'contacts';
        $contactGroup->name = ContactGroup::getAutoIncrementedName('Dynamische groep');
        $contactGroup->description = '';
        $contactGroup->dynamic_filter_type = $request->input('filterType') ? $request->input('filterType') : 'and';
        $contactGroup->save();

        if($filters) {
            foreach ($filters as $filter) {
                $dynamicFilter = new DynamicContactGroupFilter();
                $dynamicFilter->contact_group_id = $contactGroup->id;
                $dynamicFilter->field = $filter->field;
                $dynamicFilter->comperator = '';
                $dynamicFilter->data = $filter->data;
                $dynamicFilter->type = 'filter';
                $dynamicFilter->model_name = $this->getModelByField($filter->field);
                $dynamicFilter->save();
            }
        }

        if($extraFilters) {
            foreach ($extraFilters as $extraFilter) {
                $dynamicFilter = new DynamicContactGroupFilter();
                $dynamicFilter->contact_group_id = $contactGroup->id;
                $dynamicFilter->field = $extraFilter->field;
                $dynamicFilter->comperator = $extraFilter->type;
                $dynamicFilter->data = $extraFilter->data;
                $dynamicFilter->type = 'extraFilter';
                $dynamicFilter->model_name = $this->getModelByField($extraFilter->field);
                $dynamicFilter->connect_name = $extraFilter->connectName ?? '';
                $dynamicFilter->connected_to = $extraFilter->connectedTo ?? '';
                $dynamicFilter->save();
            }
        }
        return FullContactGroup::make($contactGroup);
    }

    private function getModelByField(String $field){
        switch ($field){
            case 'typeId':
                return 'App\Eco\Contact\ContactType';
                break;
            case 'statusId':
                return 'App\Eco\Contact\ContactStatus';
                break;
            case 'occupation':
            case 'occupationPrimary':
                return 'App\Eco\Occupation\Occupation';
                break;
            case 'opportunity':
                return 'App\Eco\Measure\MeasureCategory';
                break;
            case 'campaign':
                return 'App\Eco\Campaign\Campaign';
                break;
            case 'country':
                return 'App\Eco\Country\Country';
                break;
            case 'staticContactGroup':
                return 'App\Eco\ContactGroup\ContactGroup';
                break;
            case 'product':
                return 'App\Eco\Product\Product';
                break;
            case 'energySupplier':
                return EnergySupplier::class;
                break;
            case 'energySupplierType':
                return EnergySupplierType::class;
                break;
        }
    }
}
