<?php

namespace App\Http\Resources\SystemData;

use App\Eco\Administration\Administration;
use App\Eco\Campaign\CampaignStatus;
use App\Eco\Campaign\CampaignType;
use App\Eco\ContactGroup\ContactGroupType;
use App\Eco\Country\Country;
use App\Eco\Document\DocumentGroup;
use App\Eco\Document\DocumentType;
use App\Eco\DocumentTemplate\DocumentTemplateType;
use App\Eco\Email\EmailStatus;
use App\Eco\EnergySupplier\ContactEnergySupplierStatus;
use App\Eco\EnergySupplier\ContactEnergySupplierType;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\RoofType;
use App\Eco\CostCenter\CostCenter;
use App\Eco\Ledger\Ledger;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxIgnoreType;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\OrderCollectionFrequency;
use App\Eco\Order\OrderPaymentType;
use App\Eco\Order\OrderStatus;
use App\Eco\OrganisationType\OrganisationType;
use App\Eco\Address\AddressType;
use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\Measure\Measure;
use App\Eco\Intake\IntakeReason;
use App\Eco\Intake\IntakeSource;
use App\Eco\Campaign\Campaign;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Contact\ContactStatus;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\Industry\Industry;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Occupation\Occupation;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectPayoutType;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\ParticipantTransaction\ParticipantTransactionType;
use App\Eco\PaymentInvoice\PaymentInvoiceStatus;
use App\Eco\PersonType\PersonType;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\Product\Product;
use App\Eco\Product\ProductDuration;
use App\Eco\Product\ProductInvoiceFrequency;
use App\Eco\Product\ProductPaymentType;
use App\Eco\ProductionProject\ProductionProjectRevenueCategory;
use App\Eco\ProductionProject\ProductionProjectRevenueType;
use App\Eco\ProductionProject\ProductionProjectStatus;
use App\Eco\ProductionProject\ProductionProjectType;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskType;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Eco\VatCode\VatCode;
use App\Http\Resources\CostCenter\FullCostCenter;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Ledger\FullLedger;
use App\Http\Resources\Measure\MeasurePeek;
use App\Http\Resources\OrganisationType\FullOrganisationType;
use App\Eco\Title\Title;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Industry\FullIndustry;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Occupation\FullOccupation;
use App\Http\Resources\PersonType\FullPersonType;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\Title\FullTitle;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Support\Facades\App;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SystemData extends Resource
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
        if ($environment == 'production') {
            $users = FullUser::collection(User::where('id', '!=', '1')->orderBy('last_name', 'asc')->get());
        }
        else {
            $users = FullUser::collection(User::orderBy('last_name', 'asc')->get());
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

        $sortedEnergySuppliers = EnergySupplier::all()->sortBy(function ($energySupplier) {
            if($energySupplier->name === 'OM'){
                return 0;
            }
            if($energySupplier->name === 'Energie VanOns'){
                return 1;
            }
            if($energySupplier->name === 'Greenchoice'){
                return 2;
            }
            return 3 . $energySupplier->name;

        });

        $sortedEnergySuppliers = $sortedEnergySuppliers->values();

        return [
            'addressTypes' => FullEnumWithIdAndName::collection(AddressType::collection()),
            'appName' => config('app.name'),
            'buildingTypes' => BuildingType::select(['id', 'name'])->get(),
            'campaigns' => Campaign::select(['id', 'name'])->get(),
            'campaignStatuses' => FullEnumWithIdAndName::collection(CampaignStatus::all()),
            'campaignTypes' => FullEnumWithIdAndName::collection(CampaignType::all()),
            'contactEnergySupplierStatus' => GenericResource::collection(ContactEnergySupplierStatus::all()),
            'contactEnergySupplierTypes' => GenericResource::collection(ContactEnergySupplierType::all()),
            'contactGroupTypes' => FullEnumWithIdAndName::collection(ContactGroupType::collection()),
            'contactStatuses' => FullEnumWithIdAndName::collection(ContactStatus::collection()),
            'contactTypes' => FullEnumWithIdAndName::collection(ContactType::collection()),
            'costCenters' => FullCostCenter::collection(CostCenter::all()),
            'countries' => GenericResource::collection(Country::all()),
            'documentGroups' => FullEnumWithIdAndName::collection(DocumentGroup::collection()),
            'documentTemplateTypes' => FullEnumWithIdAndName::collection(DocumentTemplateType::collection()),
            'documentTypes' => FullEnumWithIdAndName::collection(DocumentType::collection()),
            'emailAddressTypes' => FullEnumWithIdAndName::collection(EmailAddressType::collection()),
            'emailStatuses' => FullEnumWithIdAndName::collection(EmailStatus::collection()),
            'energyLabels' => EnergyLabel::select(['id', 'name'])->get(),
            'energyLabelStatus' => FullEnumWithIdAndName::collection(EnergyLabelStatus::all()),
            'energySuppliers' => GenericResource::collection($sortedEnergySuppliers),
            'industries' => FullIndustry::collection(Industry::all()),
            'intakeReasons' => IntakeReason::select(['id', 'name'])->get(),
            'intakeSources' => IntakeSource::select(['id', 'name'])->get(),
            'intakeStatuses' => IntakeStatus::select(['id', 'name'])->get(),
            'lastNamePrefixes' => FullLastNamePrefix::collection(LastNamePrefix::all()),
            'ledgers' => FullLedger::collection(Ledger::all()),
            'mailboxesInvalid' => Mailbox::where('is_active', 1)->where('valid', 0)->count(),
            'mailboxIgnoreTypes' => FullEnumWithIdAndName::collection(MailboxIgnoreType::collection()),
            'mailgunDomain' => MailgunDomain::select(['id', 'domain'])->get(),
            'measureCategories' => MeasureCategory::select(['id', 'name'])->get(),
            'measures' => MeasurePeek::collection(Measure::all()),
            'occupations' => FullOccupation::collection(Occupation::all()),
            'opportunityStatus' => FullEnumWithIdAndName::collection(OpportunityStatus::all()),
            'orderCollectionFrequencies' => FullEnumWithIdAndName::collection(OrderCollectionFrequency::collection()),
            'orderPaymentTypes' => FullEnumWithIdAndName::collection(OrderPaymentType::collection()),
            'orderStatuses' => FullEnumWithIdAndName::collection(OrderStatus::collection()),
            'organisationTypes' => FullOrganisationType::collection(OrganisationType::all()),
            'participantProductionProjectPayoutTypes' => GenericResource::collection(ParticipantProductionProjectPayoutType::all()),
            'participantProductionProjectStatus' => GenericResource::collection(ParticipantProductionProjectStatus::all()),
            'participantTransactionTypes' => GenericResource::collection(ParticipantTransactionType::all()),
            'paymentInvoiceStatuses' => FullEnumWithIdAndName::collection(PaymentInvoiceStatus::collection()),
            'permissions' => FullEnumWithIdAndName::collection(Permission::all()),
            'personTypes' => FullPersonType::collection(PersonType::all()),
            'phoneNumberTypes' => FullEnumWithIdAndName::collection(PhoneNumberType::collection()),
            'productDurations' => FullEnumWithIdAndName::collection(ProductDuration::collection()),
            'productInvoiceFrequencies' => FullEnumWithIdAndName::collection(ProductInvoiceFrequency::collection()),
            'productionProjectRevenueCategories' => GenericResource::collection(ProductionProjectRevenueCategory::all()),
            'productionProjectRevenueTypes' => GenericResource::collection(ProductionProjectRevenueType::all()),
            'productionProjectStatus' => GenericResource::collection(ProductionProjectStatus::all()),
            'productionProjectTypes' => GenericResource::collection(ProductionProjectType::all()),
            'productPaymentTypes' => FullEnumWithIdAndName::collection(ProductPaymentType::collection()),
            'products' => FullProduct::collection(Product::all()),
            'quotationRequestStatus' => FullEnumWithIdAndName::collection(QuotationRequestStatus::orderBy('order')->get()),
            'roles' => Role::select(['id', 'name'])->get()->toArray(),
            'roofTypes' => FullEnumWithIdAndName::collection(RoofType::all()),
            'taskProperties' => GenericResource::collection(TaskProperty::all()),
            'taskTypes' => GenericResource::collection(TaskType::all()),
            'teams' => FullTeam::collection(Team::orderBy('name', 'asc')->get()),
            'titles' => FullTitle::collection(Title::all()),
            'users' => $users,
            'usesTwinfield' => Administration::whereUsesTwinfield(1)->count() > 0 ? true : false,
            'vatCodes' => VatCode::select(['id', 'description', 'percentage'])->get(),
            'versionNumber' => 'Versie: ' . config('app.version_major') . '.' . config('app.version_minor') . '.' . config('app.version_fix'),
        ];
    }
}
