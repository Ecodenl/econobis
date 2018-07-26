<?php

namespace App\Http\Resources\SystemData;

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
use App\Http\Resources\GenericResource;
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
        return [
            'contactTypes' => FullEnumWithIdAndName::collection(ContactType::collection()),
            'addressTypes' => FullEnumWithIdAndName::collection(AddressType::collection()),
            'lastNamePrefixes' => FullLastNamePrefix::collection(LastNamePrefix::all()),
            'emailAddressTypes' => FullEnumWithIdAndName::collection(EmailAddressType::collection()),
            'phoneNumberTypes' => FullEnumWithIdAndName::collection(PhoneNumberType::collection()),
            'personTypes' => FullPersonType::collection(PersonType::all()),
            'contactStatuses' => FullEnumWithIdAndName::collection(ContactStatus::collection()),
            'industries' => FullIndustry::collection(Industry::all()),
            'organisationTypes' => FullOrganisationType::collection(OrganisationType::all()),
            'occupations' => FullOccupation::collection(Occupation::all()),
            'titles' => FullTitle::collection(Title::all()),
            'buildingTypes' => BuildingType::select(['id', 'name'])->get(),
            'measures' => MeasurePeek::collection(Measure::all()),
            'measureCategories' => MeasureCategory::select(['id', 'name'])->get(),
            'intakeSources' => IntakeSource::select(['id', 'name'])->get(),
            'campaigns' => Campaign::select(['id', 'name'])->get(),
            'intakeStatuses' => IntakeStatus::select(['id', 'name'])->get(),
            'intakeReasons' => IntakeReason::select(['id', 'name'])->get(),
            'energyLabels' => EnergyLabel::select(['id', 'name'])->get(),
            'permissions' => FullEnumWithIdAndName::collection(Permission::all()),
            'roles' => Role::select(['id', 'name'])->get()->toArray(),
            'opportunityStatus' => FullEnumWithIdAndName::collection(OpportunityStatus::all()),
            'taskTypes' => GenericResource::collection(TaskType::all()),
            'taskProperties' => GenericResource::collection(TaskProperty::all()),
            'users' => FullUser::collection(User::where('id', '!=', '1')->orderBy('last_name', 'asc')->get()),
            'teams' => FullTeam::collection(Team::orderBy('name', 'asc')->get()),
            'campaignStatuses' => FullEnumWithIdAndName::collection(CampaignStatus::all()),
            'campaignTypes' => FullEnumWithIdAndName::collection(CampaignType::all()),
            'emailStatuses' => FullEnumWithIdAndName::collection(EmailStatus::collection()),
            'documentGroups' => FullEnumWithIdAndName::collection(DocumentGroup::collection()),
            'documentTypes' => FullEnumWithIdAndName::collection(DocumentType::collection()),
            'documentTemplateTypes' => FullEnumWithIdAndName::collection(DocumentTemplateType::collection()),
            'roofTypes' => FullEnumWithIdAndName::collection(RoofType::all()),
            'energyLabelStatus' => FullEnumWithIdAndName::collection(EnergyLabelStatus::all()),
            'quotationRequestStatus' => FullEnumWithIdAndName::collection(QuotationRequestStatus::orderBy('order')->get()),
            'countries' => GenericResource::collection(Country::all()),
            'energySuppliers' => GenericResource::collection(EnergySupplier::all()),
            'contactEnergySupplierStatus' => GenericResource::collection(ContactEnergySupplierStatus::all()),
            'contactEnergySupplierTypes' => GenericResource::collection(ContactEnergySupplierType::all()),
            'productionProjectStatus' => GenericResource::collection(ProductionProjectStatus::all()),
            'productionProjectTypes' => GenericResource::collection(ProductionProjectType::all()),
            'participantProductionProjectStatus' => GenericResource::collection(ParticipantProductionProjectStatus::all()),
            'participantProductionProjectPayoutTypes' => GenericResource::collection(ParticipantProductionProjectPayoutType::all()),
            'participantTransactionTypes' => GenericResource::collection(ParticipantTransactionType::all()),
            'productionProjectRevenueTypes' => GenericResource::collection(ProductionProjectRevenueType::all()),
            'productionProjectRevenueCategories' => GenericResource::collection(ProductionProjectRevenueCategory::all()),
            'versionNumber' => 'Versie: ' . config('app.version_major') . '.' . config('app.version_minor') . '.' . config('app.version_fix'),
            'productDurations' => FullEnumWithIdAndName::collection(ProductDuration::collection()),
            'productInvoiceFrequencies' => FullEnumWithIdAndName::collection(ProductInvoiceFrequency::collection()),
            'productPaymentTypes' => FullEnumWithIdAndName::collection(ProductPaymentType::collection()),
            'orderStatuses' => FullEnumWithIdAndName::collection(OrderStatus::collection()),
            'orderPaymentTypes' => FullEnumWithIdAndName::collection(OrderPaymentType::collection()),
            'orderCollectionFrequencies' => FullEnumWithIdAndName::collection(OrderCollectionFrequency::collection()),
            'paymentInvoiceStatuses' => FullEnumWithIdAndName::collection(PaymentInvoiceStatus::collection()),
            'products' => FullProduct::collection(Product::whereNull('deleted_at')->get()),
            'contactGroupTypes' => FullEnumWithIdAndName::collection(ContactGroupType::collection()),
        ];
    }
}
