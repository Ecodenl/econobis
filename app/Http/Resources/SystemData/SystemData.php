<?php

namespace App\Http\Resources\SystemData;

use App\Eco\Campaign\CampaignStatus;
use App\Eco\Campaign\CampaignType;
use App\Eco\Country\Country;
use App\Eco\Document\DocumentGroup;
use App\Eco\Document\DocumentType;
use App\Eco\DocumentTemplate\DocumentTemplateType;
use App\Eco\Email\EmailStatus;
use App\Eco\EnergySupplier\ContactEnergySupplierStatus;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\RoofType;
use App\Eco\Opportunity\OpportunityStatus;
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
use App\Eco\PersonType\PersonType;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\Task\TaskProperty;
use App\Eco\Task\TaskStatus;
use App\Eco\Task\TaskType;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Http\Resources\GenericResource;
use App\Http\Resources\OrganisationType\FullOrganisationType;
use App\Eco\Title\Title;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Industry\FullIndustry;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Occupation\FullOccupation;
use App\Http\Resources\PersonType\FullPersonType;
use App\Http\Resources\Task\FullTaskPropertyValue;
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
            'measures' => Measure::select(['id', 'name'])->get(),
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
            'users' => FullUser::collection(User::all()),
            'teams' => FullTeam::collection(Team::all()),
            'campaignStatuses' => FullEnumWithIdAndName::collection(CampaignStatus::all()),
            'campaignTypes' => FullEnumWithIdAndName::collection(CampaignType::all()),
            'emailStatuses' => FullEnumWithIdAndName::collection(EmailStatus::collection()),
            'documentGroups' => FullEnumWithIdAndName::collection(DocumentGroup::collection()),
            'documentTypes' => FullEnumWithIdAndName::collection(DocumentType::collection()),
            'documentTemplateTypes' => FullEnumWithIdAndName::collection(DocumentTemplateType::collection()),
            'roofTypes' => FullEnumWithIdAndName::collection(RoofType::all()),
            'energyLabelStatus' => FullEnumWithIdAndName::collection(EnergyLabelStatus::all()),
            'quotationRequestStatus' => FullEnumWithIdAndName::collection(QuotationRequestStatus::all()),
            'countries' => GenericResource::collection(Country::all()),
            'energySuppliers' => GenericResource::collection(EnergySupplier::all()),
            'contactEnergySupplierStatus' => GenericResource::collection(ContactEnergySupplierStatus::all()),
        ];
    }
}
