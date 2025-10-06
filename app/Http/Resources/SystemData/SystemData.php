<?php

namespace App\Http\Resources\SystemData;

use App\Eco\Address\AddressType;
use App\Eco\AddressDongle\AddressDongleTypeReadOut;
use App\Eco\AddressDongle\AddressDongleTypeDongle;
use App\Eco\Administration\Administration;
use App\Eco\Campaign\CampaignStatus;
use App\Eco\Campaign\CampaignType;
use App\Eco\Contact\ContactStatus;
use App\Eco\Contact\ContactType;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\ContactGroupType;
use App\Eco\Cooperation\Cooperation;
use App\Eco\CostCenter\CostCenter;
use App\Eco\Country\Country;
use App\Eco\Document\DocumentGroup;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\Document\DocumentType;
use App\Eco\DocumentTemplate\DocumentTemplateType;
use App\Eco\Email\EmailStatus;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\EnergySupplier\EnergySupplierStatus;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\FinancialOverview\FinancialOverviewContactStatus;
use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\HousingFileHoomHousingStatus;
use App\Eco\HousingFile\HousingFileHoomLink;
use App\Eco\HousingFile\HousingFileSpecificationFloor;
use App\Eco\HousingFile\HousingFileSpecificationSide;
use App\Eco\HousingFile\HousingFileSpecificationStatus;
use App\Eco\HousingFile\RoofType;
use App\Eco\Industry\Industry;
use App\Eco\InspectionPersonType\InspectionPersonType;
use App\Eco\Intake\IntakeReason;
use App\Eco\Intake\IntakeStatus;
use App\Eco\IntakeSource\IntakeSource;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Ledger\Ledger;
use App\Eco\Mailbox\IncomingServerType;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxIgnoreType;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Measure\Measure;
use App\Eco\Mailbox\OutgoingServerType;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Occupation\Occupation;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Opportunity\OpportunityEvaluationStatus;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\OrderCollectionFrequency;
use App\Eco\Order\OrderPaymentType;
use App\Eco\Order\OrderStatusToSelect;
use App\Eco\OrganisationType\OrganisationType;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\PaymentInvoice\PaymentInvoiceStatus;
use App\Eco\PersonType\PersonType;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\Product\Product;
use App\Eco\Product\ProductDuration;
use App\Eco\Product\ProductInvoiceFrequency;
use App\Eco\Product\ProductPaymentType;
use App\Eco\Project\BaseProjectCodeRef;
use App\Eco\Project\ProjectLoanType;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectRevenueDistributionType;
use App\Eco\Project\ProjectRevenueType;
use App\Eco\Project\ProjectStatus;
use App\Eco\Project\ProjectType;
use App\Eco\Project\TransactionCostsCodeRef;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskType;
use App\Eco\Team\Team;
use App\Eco\Title\Title;
//use App\Eco\Twinfield\TwinfieldConnectionTypeWithIdAndName;
use App\Eco\User\User;
use App\Eco\VatCode\VatCode;
use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\CostCenter\FullCostCenter;
use App\Http\Resources\Document\FullDocumentCreatedFrom;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Industry\FullIndustry;
use App\Http\Resources\Intake\FullIntakeSource;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Ledger\FullLedger;
use App\Http\Resources\Measure\MeasurePeek;
use App\Http\Resources\Occupation\FullOccupation;
use App\Http\Resources\Occupation\PrimaryOccupation;
use App\Http\Resources\Opportunity\OpportunityEvaluationStatusResource;
use App\Http\Resources\Opportunity\OpportunityStatusResource;
use App\Http\Resources\OrganisationType\FullOrganisationType;
use App\Http\Resources\ParticipantMutation\FullParticipantMutationStatus;
use App\Http\Resources\ParticipantMutation\FullParticipantMutationType;
use App\Http\Resources\PersonType\FullPersonType;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\QuotationRequest\FullQuotationRequestStatus;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\Title\FullTitle;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SystemData extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $environment = App::environment();
        //for testing
        if ($environment == 'production' && \Auth::user()->email != 'support@econobis.nl' && \Auth::user()->email != 'software@xaris.nl') {
            $allUsers = User::orderBy('last_name', 'asc')->get();

            $usersWithInactive= UserPeek::collection($allUsers->where('id', '!=', '1'));
            $users = UserPeek::collection($allUsers->where('active', true));
            $usersExtraAdministration = UserPeek::collection($allUsers->where('id', '1'));
        }
        else {
            $allUsers = User::orderBy('last_name', 'asc')->get();

            $usersWithInactive = UserPeek::collection($allUsers);
            $users = UserPeek::collection($allUsers->where('active', true));
            $usersExtraAdministration = null;
        }

        /*
         * Energie leveranciers 2018-11-28 Op aanvraag René
         *
         * Kan je ze ook op alfabeth sorteren als je het klap menu opent
         * Maar wel starten met
         * OM
         * Energie vanONS
         * Greenchoice
         *
         * en dan de rest op alfabetische volgorde
         */

        $sortedEnergySuppliers = EnergySupplier::whereNull('end_date')->get()->sortBy(function ($energySupplier) {
            if($energySupplier->order){
                return $energySupplier->order;
            }
            return 999 . $energySupplier->name;

        });
        $sortedEnergySuppliers = $sortedEnergySuppliers->values();

        return [
//            'housingFileHoomLinksBasic' => HousingFileHoomLink::select(['id as key', 'label as name', 'external_hoom_short_name as externalHoomShortName'])->where('housing_file_data_type', 'B')->where('visible_in_econobis', true)->orderBy('external_hoom_short_name')->get(),
//            'housingFileHoomLinksUse' => HousingFileHoomLink::select(['id as key', 'label as name', 'external_hoom_short_name as externalHoomShortName'])->where('housing_file_data_type', 'G')->where('visible_in_econobis', true)->orderBy('external_hoom_short_name')->get(),
            'housingFileHoomLinks' => HousingFileHoomLink::select(['id as key', 'label as name', 'external_hoom_short_name as externalHoomShortName', 'external_hoom_short_name as externalHoomShortName'])->where('visible_in_econobis', true)->orderBy('housing_file_data_type')->orderBy('label')->get(),
            'housingFileHoomLinksToShowInEconobis' => HousingFileHoomLink::select(['econobis_field_name as econobisFieldName'])->where('visible_in_econobis', true)->whereNotNull('econobis_field_name')->get(),
            'housingFileHoomLinksToImportFromHoom' => HousingFileHoomLink::select(['econobis_field_name as econobisFieldName'])->where('import_from_hoom', true)->whereNotNull('econobis_field_name')->get(),
            'housingFileHoomLinksStatus' => HousingFileHoomLink::select(['id as key', 'label as name', 'external_hoom_short_name as externalHoomShortName'])->where('housing_file_data_type', 'W')->where('visible_in_econobis', true)->orderBy('external_hoom_short_name')->get(),

            'currentWallInsulationSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-wall-insulation')->get(),
            'currentFloorInsulationSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-floor-insulation')->get(),
            'currentRoofInsulationSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-roof-insulation')->get(),
            'currentLivingRoomsWindowsSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-living-rooms-windows')->get(),
            'currentSleepingRoomsWindowsSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-sleeping-rooms-windows')->get(),
            'heatSourceWarmTapWaterSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'heat-source-warm-tap-water')->get(),
            'buildingHeatingApplicationSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'building-heating-application')->get(),
            'ventilationTypeSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'ventilation-type')->get(),
            'crackSealingTypeSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'crack-sealing-type')->get(),
            'hasCavityWallSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'has-cavity-wall')->get(),
            'hasSolarPanelsSelection' => HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'has-solar-panels')->get(),

            'addressTypes' => FullEnumWithIdAndName::collection(AddressType::collection()),
            'administrationsPeek' => AdministrationPeek::collection(Administration::orderBy('id')->get()),
            'appName' => config('app.name'),
            'baseProjectCodeRefs' => FullEnumWithIdAndName::collection(BaseProjectCodeRef::collection()),
            'buildingTypes' => BuildingType::select(['id', 'name'])->get(),
            'campaignStatuses' => FullEnumWithIdAndName::collection(CampaignStatus::all()),
            'campaignTypes' => FullEnumWithIdAndName::collection(CampaignType::orderBy('name')->get()),
            'energySupplierStatuses' => GenericResource::collection(EnergySupplierStatus::all()),
            'energySupplierTypes' => GenericResource::collection(EnergySupplierType::all()),
            'staticContactGroups' => ContactGroup::whereTeamContactGroupIds(Auth::user())->select(['id', 'name'])->where('type_id', 'static')->get(),
            'dongleTypeReadOuts' => GenericResource::collection(AddressDongleTypeReadOut::all()),
            'dongleTypeDongles' => GenericResource::collection(AddressDongleTypeDongle::all()),
            'contactGroupTypes' => FullEnumWithIdAndName::collection(ContactGroupType::collection()),
            'contactStatuses' => FullEnumWithIdAndName::collection(ContactStatus::collection()),
            'contactTypes' => FullEnumWithIdAndName::collection(ContactType::collection()),
            'cooperation' => Cooperation::select(['id', 'hoom_link', 'use_laposta', 'use_export_address_consumption', 'require_two_factor_authentication', 'use_dongle_registration'])->first(),
            'cooperationExternalUrlContacts' => Cooperation::select(['id', 'show_external_url_for_contacts', 'external_url_contacts', 'external_url_contacts_button_text', 'external_url_contacts_on_new_page'])->first(),
            'costCenters' => FullCostCenter::collection(CostCenter::all()),
            'countries' => GenericResource::collection(Country::all()),
            'documentCreatedFroms' => FullDocumentCreatedFrom::collection(DocumentCreatedFrom::all()),
            'documentGroups' => FullEnumWithIdAndName::collection(DocumentGroup::collection()),
            'documentTemplateTypes' => FullEnumWithIdAndName::collection(DocumentTemplateType::collection()),
            'documentTypes' => FullEnumWithIdAndName::collection(DocumentType::collection()),
            'emailAddressTypes' => FullEnumWithIdAndName::collection(EmailAddressType::collection()),
            'emailStatuses' => FullEnumWithIdAndName::collection(EmailStatus::collection()),
            'energyLabelStatus' => FullEnumWithIdAndName::collection(EnergyLabelStatus::all()),
            'energyLabels' => EnergyLabel::select(['id', 'name'])->get(),
            'energySupplierStatuses' => GenericResource::collection(EnergySupplierStatus::all()),
            'energySupplierTypes' => GenericResource::collection(EnergySupplierType::all()),
            'energySuppliers' => GenericResource::collection($sortedEnergySuppliers),
            'financialOverviewContactStatuses' => FullEnumWithIdAndName::collection(FinancialOverviewContactStatus::collection()),
            'housingFileSpecificationFloors' => HousingFileSpecificationFloor::select(['id', 'name'])->orderBy('name')->get(),
            'housingFileSpecificationSides' => HousingFileSpecificationSide::select(['id', 'name'])->orderBy('name')->get(),
            'housingFileSpecificationStatuses' => HousingFileSpecificationStatus::select(['id', 'name'])->orderBy('name')->get(),
            'industries' => FullIndustry::collection(Industry::all()),
            'inspectionPersonTypes' => FullEnumWithIdAndName::collection(InspectionPersonType::collection()),
            'intakeReasons' => IntakeReason::select(['id', 'name'])->get(),
            'intakeSources' => FullIntakeSource::collection(IntakeSource::where('visible', true)->get()),
            'intakeStatuses' => IntakeStatus::select(['id', 'name'])->get(),
            'lastNamePrefixes' => FullLastNamePrefix::collection(LastNamePrefix::all()),
            'ledgers' => FullLedger::collection(Ledger::all()),
            'mailboxIgnoreTypes' => FullEnumWithIdAndName::collection(MailboxIgnoreType::collection()),
            'mailboxServerTypes' => ['incomingServerTypes' => FullEnumWithIdAndName::collection(IncomingServerType::collection()), 'outgoingServerTypes' => FullEnumWithIdAndName::collection(OutgoingServerType::collection())],
            'mailboxesInvalid' => Mailbox::where('is_active', 1)->where('valid', 0)->count(),
            'mailgunDomain' => MailgunDomain::select(['id', 'domain'])->get(),
            'measureCategories' => MeasureCategory::select(['id', 'name'])->orderBy('name')->get(),
            'measures' => MeasurePeek::collection(Measure::orderBy('name')->get()),
            'occupations' => FullOccupation::collection(Occupation::orderBy('primary_occupation')->get()),
            'opportunityActions' => GenericResource::collection(OpportunityAction::all()),
            'opportunityEvaluationStatuses' => OpportunityEvaluationStatusResource::collection(OpportunityEvaluationStatus::all()),
            'opportunityStatus' => OpportunityStatusResource::collection(OpportunityStatus::orderBy('order')->get()),
            'orderCollectionFrequencies' => FullEnumWithIdAndName::collection(OrderCollectionFrequency::collection()),
            'orderPaymentTypes' => FullEnumWithIdAndName::collection(OrderPaymentType::collection()),
            'orderStatuses' => FullEnumWithIdAndName::collection(OrderStatusToSelect::collection()),
            'organisationTypes' => FullOrganisationType::collection(OrganisationType::all()),
            'participantMutationStatuses' => FullParticipantMutationStatus::collection(ParticipantMutationStatus::all()),
            'participantMutationTypes' => FullParticipantMutationType::collection(ParticipantMutationType::all()),
            'participantProjectPayoutTypes' => GenericResource::collection(ParticipantProjectPayoutType::all()),
            'paymentInvoiceStatuses' => FullEnumWithIdAndName::collection(PaymentInvoiceStatus::collection()),
            'permissions' => FullEnumWithIdAndName::collection(Permission::all()),
            'personTypes' => FullPersonType::collection(PersonType::all()),
            'phoneNumberTypes' => FullEnumWithIdAndName::collection(PhoneNumberType::collection()),
            'portalSettingsLayouts' => PortalSettingsLayout::select(['id', 'description'])->get(),
            'primaryOccupations' => PrimaryOccupation::collection(Occupation::all()),
            'productDurations' => FullEnumWithIdAndName::collection(ProductDuration::collection()),
            'productInvoiceFrequencies' => FullEnumWithIdAndName::collection(ProductInvoiceFrequency::collection()),
            'productPaymentTypes' => FullEnumWithIdAndName::collection(ProductPaymentType::collection()),
            'products' => FullProduct::collection(Product::orderBy('name')->get()),
            'projectLoanTypes' => GenericResource::collection(ProjectLoanType::all()),
            'projectRevenueCategories' => GenericResource::collection(ProjectRevenueCategory::all()),
            'projectRevenueDistributionTypes' => FullEnumWithIdAndName::collection(ProjectRevenueDistributionType::collection()),
            'projectRevenueTypes' => GenericResource::collection(ProjectRevenueType::all()),
            'projectStatus' => GenericResource::collection(ProjectStatus::orderBy('order')->get()),
            'projectTypes' => GenericResource::collection(ProjectType::all()),
            'projectTypesActive' => GenericResource::collection(ProjectType::where('is_active', true)->get()),
            'quotationRequestStatus' => FullQuotationRequestStatus::collection(QuotationRequestStatus::orderBy('opportunity_action_id')->orderBy('order')->get()),
            'roles' => Role::select(['id', 'name'])->get()->toArray(),
            'roofTypes' => FullEnumWithIdAndName::collection(RoofType::all()),
            'staticContactGroups' => ContactGroup::select(['id', 'name'])->where('type_id', 'static')->get(),
            'taskProperties' => GenericResource::collection(TaskProperty::all()),
            'taskTypes' => GenericResource::collection(TaskType::orderby('name')->get()),
            'teams' => FullTeam::collection(Team::orderBy('name', 'asc')->get()),
            'titles' => FullTitle::collection(Title::all()),
            'transactionCostsCodeRefs' => FullEnumWithIdAndName::collection(TransactionCostsCodeRef::collection()),
//            'twinfieldConnectionTypes' => FullEnumWithIdAndName::collection(TwinfieldConnectionTypeWithIdAndName::collection()),
            'users' => $users,
            'usersAll' => $usersWithInactive,
            'usersExtraAdministration' => $usersExtraAdministration,
            'usesTwinfield' => Administration::whereUsesTwinfield(1)->count() > 0 ? true : false,
            'vatCodes' => VatCode::select(['id', 'description', 'percentage'])->get(),
            'versionNumber' => 'Versie: ' . config('app.version_major') . '.' . config('app.version_minor') . '.' . config('app.version_fix'),
        ];
    }
}
