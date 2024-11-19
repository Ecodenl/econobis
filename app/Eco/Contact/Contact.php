<?php

namespace App\Eco\Contact;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Administration\Administration;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactNote\ContactNote;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Eco\HousingFile\HousingFile;
use App\Eco\InspectionPersonType\InspectionPersonType;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PortalFreeFields\PortalFreeFieldsField;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Portal\PortalUser;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\Task\Task;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
use App\Eco\Twinfield\TwinfieldLog;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Http\Resources\ContactGroup\GridContactGroup;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Contact extends Model
{
    use PresentableTrait, RevisionableTrait, Encryptable, SoftDeletes, HasFactory;

    protected $presenter = ContactPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'liable' => 'boolean',
        'coach_max_appointments_per_week' => 'integer',
        'coach_max_appointments_per_month' => 'integer',
        'coach_min_minutes_between_appointments' => 'integer',
    ];

    protected $dates = [
//        'member_since',
//        'member_until',
    ];

    protected $encryptable = [
        'iban'
    ];

    //Per administratie heeft het contact een ander twinfield nummer
    public function twinfieldNumbers()
    {
        return $this->hasMany(TwinfieldCustomerNumber::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class)->orderByDesc('primary')->orderByDesc('id');
    }

    public function addressesWithoutOld()
    {
        return $this->hasMany(Address::class)->where('type_id', '!=', 'old')->orderByDesc('primary')->orderByDesc('id');
    }

    public function freeFieldsFieldRecords()
    {
        $fieldTableContact = FreeFieldsTable::where('table', 'contacts')->first();
        $contactFieldIds = FreeFieldsField::where('table_id', ($fieldTableContact->id ?? '$#@') )->get()->pluck('id')->toArray();
        return $this->hasMany(FreeFieldsFieldRecord::class, 'table_record_id')->whereIn('field_id', $contactFieldIds);
    }
    public function portalFreeFieldsFieldRecords()
    {
        // Step 1: Retrieve the table for 'contacts' to filter fields in `portal_free_fields_fields`
        $fieldTableContact = FreeFieldsTable::where('table', 'contacts')->first();

        // Step 2: Get all field IDs from `free_fields_fields` related to `contacts`
        $contactFieldIds = FreeFieldsField::where('table_id', $fieldTableContact->id ?? null)
            ->pluck('id')
            ->toArray();

        // Step 3: Find all `portal_free_fields_fields` that relate to these `free_fields_fields`
        $portalFreeFieldIds = PortalFreeFieldsField::whereIn('field_id', $contactFieldIds)
            ->pluck('field_id')
            ->toArray();

        // Step 4: Filter `free_fields_field_records` based on these `portalFreeFieldIds` and `table_record_id`
        return $this->hasMany(FreeFieldsFieldRecord::class, 'table_record_id')
            ->whereIn('field_id', $portalFreeFieldIds);
    }

    public function addressesActive()
    {
        return $this->addresses()->where('type_id', '!=', 'old')->orWhere('end_date', '>=', Carbon::parse('now')->format('Y-m-d'));
    }

    public function primaryAddress()
    {
        return $this->hasOne(Address::class)->where('primary', true);
    }

    public function emailAddresses()
    {
        return $this->hasMany(EmailAddress::class);
    }

    public function primaryEmailAddress()
    {
        return $this->hasOne(EmailAddress::class)->where('primary', true);
    }

    public function emails()
    {
        return $this->belongsToMany(Email::class)->orderBy('emails.id', 'desc');
    }

    /**
     * Dit zijn de emails die handmatig (eenmalig) aan dit contact zijn toegevoegd zonder dat het emailadres van dit contact ook wordt toegevoegd aan het contact.
     */
    public function manualEmails()
    {
        return $this->belongsToMany(Email::class, 'contact_email_manual')->orderBy('emails.id', 'desc');
    }

    public function phoneNumbers()
    {
        return $this->hasMany(PhoneNumber::class);
    }

    public function primaryphoneNumber()
    {
        return $this->hasOne(PhoneNumber::class)->where('primary', true);
    }

    public function contactNotes()
    {
        return $this->hasMany(ContactNote::class);
    }

    public function organisation()
    {
        return $this->hasOne(Organisation::class);
    }

    public function person()
    {
        return $this->hasOne(Person::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatus()
    {
        if (!$this->status_id) return null;

        return ContactStatus::get($this->status_id);
    }

    public function getInspectionPersonType()
    {
        if (!$this->inspection_person_type_id) return null;

        return InspectionPersonType::get($this->inspection_person_type_id);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(ContactGroup::class, 'contact_groups_pivot')->withPivot('laposta_member_id', 'laposta_member_state', 'laposta_last_error_message', 'member_created_at', 'member_to_group_since')->orderBy('contact_groups.id', 'desc');
    }

    public function selectedGroups()
    {
        return $this->belongsToMany(ContactGroup::class, 'contact_groups_pivot')
            ->where('contact_groups.type_id', 'static')
            ->where('contact_groups.include_into_export_group_report', true)
            ->withPivot('laposta_member_id', 'laposta_member_state', 'laposta_last_error_message', 'member_created_at', 'member_to_group_since')
            ->orderBy('contact_groups.id', 'desc');
    }

    public function isPerson()
    {
        return ($this->type_id == ContactType::PERSON);
    }

    public function isOrganisation()
    {
        return ($this->type_id == ContactType::ORGANISATION);
    }

    public function isCoach()
    {
        return $this->inspection_person_type_id == 'coach';
    }
    public function isOccupant()
    {
        return $this->whereHas('opportunities', function ($query) {
            $query->whereHas('quotationRequests');
        })->exists();
    }
    public function getIsOccupantAttribute()
    {
        return $this->isOccupant();
    }

    public function getIsOrganisationContactAttribute()
    {
        $contactOrganisationOccupations = $this->occupations()
            ->whereHas('primaryContact', function ($query) {
                $query->where('type_id', 'organisation')
                    ->where('primary', true);
            })->first();
        if($contactOrganisationOccupations && $contactOrganisationOccupations->primaryContact){
            return $contactOrganisationOccupations->primaryContact->exists();
        }
        return false;
    }

    public function isProjectManager()
    {
        return $this->inspection_person_type_id == 'projectmanager';
    }

    public function isExternalParty()
    {
        return $this->inspection_person_type_id == 'externalparty';
    }

    public function getOrganisationContact()
    {
        $contactOrganisationOccupations = $this->occupations()
            ->whereHas('primaryContact', function ($query) {
                $query->where('type_id', 'organisation')
                    ->where('primary', true);
            })->first();
        if($contactOrganisationOccupations && $contactOrganisationOccupations->primaryContact){
            return $contactOrganisationOccupations->primaryContact;
        }
        return false;
    }

    public function getIsInInspectionPersonTypeGroupAttribute()
    {
        return $this->groups()->whereNotNull('inspection_person_type_id')->exists();
    }

    public function availabilities()
    {
        return $this->hasMany(ContactAvailability::class);
    }

    public function getType()
    {
        if (!$this->type_id) return null;

        return ContactType::get($this->type_id);
    }

    public function intakes()
    {
        return $this->hasMany(Intake::class)->orderBy('intakes.id', 'desc');
    }

    public function opportunities()
    {
        return $this->hasManyThrough(Opportunity::class, Intake::class)->orderBy('opportunities.id', 'desc');
    }

    public function quotationRequests()
    {
        return $this->hasMany(QuotationRequest::class);
    }

    public function quotationRequestsAsProjectManager()
    {
        return $this->hasMany(QuotationRequest::class, 'project_manager_id');
    }

    public function quotationRequestsAsExternalParty()
    {
        return $this->hasMany(QuotationRequest::class, 'external_party_id');
    }

    // Only an unfinished task is a task
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    public function coachCampaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_coach');
    }

    public function projectManagerCampaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_project_manager');
    }

    public function externalPartyCampaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_external_party');
    }

    public function responses()
    {
        return $this->hasMany(CampaignResponse::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function projectRevenueDistributions()
    {
        return $this->hasMany(ProjectRevenueDistribution::class);
    }

    public function revenueDistributionKwh()
    {
        return $this->hasMany(RevenueDistributionKwh::class);
    }

    public function housingFiles()
    {
        return $this->hasManyThrough(HousingFile::class, Address::class)->orderBy('housing_files.id', 'desc');
    }

    public function addressEnergySuppliers()
    {
        return $this->hasManyThrough(AddressEnergySupplier::class, Address::class)->orderBy('address_energy_suppliers.id', 'desc');
    }

    public function currentAddressEnergySuppliers()
    {
        return $this->hasManyThrough(AddressEnergySupplier::class, Address::class)->where('addresses.type_id', '!=', 'old')->where('address_energy_suppliers.is_current_supplier', true)->orderBy('address_energy_suppliers.id', 'desc');
    }

    public function participations()
    {
        return $this->hasMany(ParticipantProject::class)->orderBy('participation_project.id', 'desc');
    }

    public function participationsGifted()
    {
        return $this->hasMany(ParticipantProject::class, 'gifted_by_contact_id');
    }

    public function participationsLegalRep()
    {
        return $this->hasMany(ParticipantProject::class, 'legal_rep_contact_id');
    }

    public function primaryOccupations()
    {
        return $this->hasMany(OccupationContact::class, 'primary_contact_id')
            ->join('contacts', 'contact_id', '=', 'contacts.id')
            ->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')
            ->orderBy('contacts.full_name');
    }

    public function occupations()
    {
        return $this->hasMany(OccupationContact::class)
            ->join('contacts', 'primary_contact_id', '=', 'contacts.id')
            ->join('occupations', 'occupation_id', '=', 'occupations.id')
            ->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')
            ->orderBy('contacts.full_name');
    }
    public function occupationsActive()
    {
        return $this->occupations()
            ->where(function ($query) {
                $query->where('occupation_contact.end_date', '>=', Carbon::today()->format('Y-m-d'))
                    ->orWhereNull('occupation_contact.end_date');
            })
            ->where(function ($query) {
                $query->where('occupation_contact.start_date', '<=', Carbon::today()->format('Y-m-d'))
                    ->orWhereNull('occupation_contact.start_date');
            })
            ->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')
            ->orderBy('contacts.full_name');
    }

    public function isPrimaryOccupant()
    {
        return $this->hasMany(OccupationContact::class, 'primary_contact_id');
    }

    public function isSecondaryOccupant()
    {
        return $this->hasMany(OccupationContact::class, 'contact_id');
    }

    public function isPrimaryOccupantPrimary()
    {
        return $this->hasMany(OccupationContact::class, 'primary_contact_id')->where('primary', true);
    }

    public function isSecondaryOccupantPrimary()
    {
        return $this->hasMany(OccupationContact::class, 'contact_id')->where('primary', true);
    }

    public function contactPerson()
    {
        return $this->hasOne(OccupationContact::class, 'primary_contact_id')->where('primary', true)->orWhere('contact_id', $this->id)->where('primary', true);
    }

    public function legalRepContact()
    {
        return $this->hasOne(OccupationContact::class, 'primary_contact_id')->where('occupation_id', 7)->orderBy('id', 'desc')->limit(1);
    }

    public function orders()
    {
        return $this->hasMany(Order::class)->orderBy('orders.id', 'desc');
    }

    public function orderProducts()
    {
        return $this->hasManyThrough(OrderProduct::class, Order::class);
    }

    public function invoices()
    {
        return $this->hasManyThrough(Invoice::class, Order::class)->orderBy('invoices.id', 'desc');
    }

    public function portalUser()
    {
        return $this->hasOne(PortalUser::class);
    }

    public function financialOverviewContacts()
    {
        return $this->hasMany(FinancialOverviewContact::class);
    }

    public function financialOverviewContactsSend()
    {
        return $this->hasMany(FinancialOverviewContact::class)->where('status_id', 'sent')->orderBy('date_sent', 'desc');
    }

    public function twinfieldLogs()
    {
        return $this->hasMany(TwinfieldLog::class);
    }

    //Returns addresses array as Type - Streetname - Number
    //Primary address always comes first
    public function getPrettyAddresses()
    {
        $this->load('addresses');
        $addresses = [];
        foreach ($this->addresses as $address) {
            if ($address->primary == 1) {
                array_unshift($addresses, $address->getType()->name . ' - ' . $address->street . ' - ' . $address->number);
            } else {
                $addresses[] = $address->getType()->name . ' - ' . $address->street . ' - ' . $address->number;
            }
        }

        return $addresses;
    }

    //Return email based on priority
    public function getOrderEmail()
    {
        $emailAddresses = $this->emailAddresses->reverse();

        foreach ($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'invoice') {
                return $emailAddress;
            }
        }

        foreach ($emailAddresses as $emailAddress) {
            if ($emailAddress->primary) {
                return $emailAddress;
            }
        }

        return null;
    }

// todo WM: opschonen, deze function wordt volgens mij nergens gebruikt!
//
//    public function getAllStaticAndDynamicGroups()
//    {
//        //statische groepen
//        $staticGroups = $this->groups()->get()->pluck('id')->toArray();
//
//        //dynamische groepen
//        $dynamicGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())->where('type_id', 'dynamic')->get();
//
//        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
//            foreach ($dynamicGroup->all_contacts as $dynamic_contact) {
//                if ($dynamic_contact->id === $this->id) {
//                    return true;
//                }
//            }
//            return false;
//        })->pluck('id')->toArray();
//
//        return array_merge($staticGroups, $dynamicGroupsForContact);
//    }

    public function getAllGroups()
    {
        //statische groepen
        $staticGroups = $this->groups()->get()->pluck('id')->toArray();

        //dynamische groepen
        $dynamicGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())->where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->all_contacts as $dynamic_contact) {
                if ($dynamic_contact && $dynamic_contact->id === $this->id) {
                    return true;
                }
            }
            return false;
        })->pluck('id')->toArray();

        //samengestelde groepen
        $composedGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())->where('type_id', 'composed')->get();

        $composedGroupsForContact = $composedGroups->filter(function ($composedGroup) {
            foreach ($composedGroup->all_contacts as $composed_contact) {
                if ($composed_contact && $composed_contact->id === $this->id) {
                    return true;
                }
            }
            return false;
        })->pluck('id')->toArray();

        return array_merge($staticGroups, $dynamicGroupsForContact, $composedGroupsForContact);
    }

    public function getVisibleGroups()
    {
        //statische groepen
        $staticGroups = $this->groups()->where('show_contact_form', true)->get();

        //dynamische groepen
        $dynamicGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())
            ->where('show_contact_form', true)->where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->all_contacts as $dynamic_contact) {
                if ($dynamic_contact && $dynamic_contact->id === $this->id) {
                    return true;
                }
            }
            return false;
        });

        $allGroups = $staticGroups->merge($dynamicGroupsForContact);

        //samengestelde groepen
        $composedGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())
            ->where('show_contact_form', true)->where('type_id', 'composed')->get();

        $composedGroupsForContact = $composedGroups->filter(function ($composedGroup) {
            foreach ($composedGroup->all_contacts as $composed_contact) {
                if ($composed_contact && $composed_contact->id === $this->id) {
                    return true;
                }
            }
            return false;
        });

        $allGroups = $allGroups->merge($composedGroupsForContact);

        return GridContactGroup::collection($allGroups->sortByDesc('name')->values());

    }

    // Contact fullname, firstname first.
    public function getFullNameFnfAttribute()
    {
        if ($this->type_id == 'person') {
            $firstName = $this->person->first_name ? $this->person->first_name . ' ' : ($this->person->initials ? $this->person->initials . ' ' : "");
            $prefix = $this->person->last_name_prefix ? $this->person->last_name_prefix . ' ' : '';
            $fullNameFnf = ($firstName . $prefix . $this->person->last_name);
        } else {
            $fullNameFnf = $this->full_name;
        }
        return $fullNameFnf;
    }

    // Has contact financialoverview documents ?.
    public function getHasFinancialOverviewsAttribute()
    {
        return $this->financialOverviewContactsSend()->exists();
    }

    // Contact firstname (only if person).
    public function getFirstNameAttribute()
    {
        if ($this->type_id == 'person') {
            return $this->person->first_name;
        } else {
            return '';
        }
    }

    // Contact lastname prefix (only if person).
    public function getLastNamePrefixAttribute()
    {
        if ($this->type_id == 'person') {
            return $this->person->last_name_prefix;
        } else {
            return '';
        }
    }

    // Contact lastname (only if person).
    public function getLastNameAttribute()
    {
        if ($this->type_id == 'person') {
            return $this->person->last_name;
        } else {
            return '';
        }
    }

    public function getAddressLinesAttribute()
    {
        if (Address::where('contact_id', $this->id)->where('primary', true)->where('type_id', 'invoice')->exists()) {
            $address = Address::where('contact_id', $this->id)->where('primary', true)->where('type_id', 'invoice')->first();
        } elseif (Address::where('contact_id', $this->id)->where('type_id', 'invoice')->exists()) {
            $address = Address::where('contact_id', $this->id)->where('type_id', 'invoice')->first();
        } elseif (Address::where('contact_id', $this->id)->where('primary', true)->exists()) {
            $address = Address::where('contact_id', $this->id)->where('primary', true)->first();
        } elseif (Address::where('contact_id', $this->id)->exists()) {
            $address = Address::where('contact_id', $this->id)->first();
        } else {
            $addressLines['street'] = '';
            $addressLines['city'] = '';
            $addressLines['country'] = '';

            return $addressLines;
        }

        $addressLines['street'] = $address->street . ' ' . $address->number . $address->addition;
        $addressLines['city'] = $address->postal_code . ' ' . $address->city;
        $addressLines['country'] = $address->country ? $address->country->name : '';

        return $addressLines;
    }

    public function getNumberOfActionsAttribute()
    {
        if ($this->isOrganisation() || $this->isCoach()) {
            return $this->quotationRequests ? $this->quotationRequests->count() : 0;
        }
        if ($this->isProjectManager()) {
            return $this->quotationRequestsAsProjectManager ? $this->quotationRequestsAsProjectManager->count() : 0;
        }
        if ($this->isExternalParty()) {
            return $this->quotationRequestsAsExternalParty ? $this->quotationRequestsAsExternalParty->count() : 0;
        }
        return 0;
    }

    public function getIsParticipantAttribute()
    {
        return ($this->participations && $this->participations->count() > 0);
    }

    public function getDisableChangeContactNameOnPortalAttribute()
    {
        foreach ($this->participations as $participation) {
            if ($participation->project && $participation->project->disable_change_contact_name_on_portal) {
                return true;
            }
        }
        return false;
    }

    public function getAddressForPostalCodeCheckAttribute()
    {
        if ($this->type_id === ContactType::PERSON) {
            return $this->primaryAddress;
        }
        if ($this->type_id === ContactType::ORGANISATION) {
            return Address::where('contact_id', $this->id)->where('type_id', 'visit')->first();
        }
        return null;
    }

    public function getSingleRelatedAdministrationAttribute()
    {
        $contactId = $this->id;
        $administrations = Administration::whereHas('projects', function ($query) use ($contactId) {
            $query->whereHas('participantsProject', function ($query2) use ($contactId) {
                $query2->where('contact_id', $contactId);
            });
        })->orderBy('name')->get();
        if ($administrations->count() == 0) {
            $defaultAdministrationId = PortalSettings::get('defaultAdministrationId');
            if (!empty($defaultAdministrationId)) {
                $administrations = Administration::whereId($defaultAdministrationId)->get();
            }
        }

        if ($administrations->count() === 1) {
            return $administrations->first()->id;
        }

        return false;
    }


    public function getNoAddressesFoundAttribute()
    {
        if ($this->type_id === ContactType::PERSON) {
            if ($this->primaryAddress) {
                return false;
            }
        }
        if ($this->type_id === ContactType::ORGANISATION) {
            if (Address::where('contact_id', $this->id)->where('type_id', 'visit')->exists()) {
                return false;
            }
        }
        return true;
    }

    public function getIsParticipantPcrProjectAttribute()
    {
        foreach ($this->participations as $participation) {
            if (!isset($participation->date_terminated) && $participation->project && $participation->project->projectType->code_ref == 'postalcode_link_capital') {
                return true;
            }
        }
        return false;
    }

    public function getIsParticipantSceProjectAttribute()
    {
        foreach ($this->participations as $participation) {
            if (!isset($participation->date_terminated) && $participation->project && $participation->project->is_sce_project) {
                return true;
            }
        }
        return false;
    }

    /**
     * Primary address Id
     * @return int
     */
    public function getPrimaryAddressIdAttribute()
    {
        return ($this->primaryAddress ? $this->primaryAddress->id : 0);
    }

    public function getBlockChangeAddressAttribute()
    {
        $hasIntakeOnPortalCheckAddress = false;
        $hasHousingFileOnPortalCheckAddress = false;
        if ($this->addressForPostalCodeCheck) {
            $hasIntakeOnPortalCheckAddress = $this->intakes()
                ->where('address_id', $this->addressForPostalCodeCheck->id)
                ->exists();
            $hasHousingFileOnPortalCheckAddress = $this->housingFiles()
                ->where('address_id', $this->addressForPostalCodeCheck->id)
                ->exists();
        }

        return $hasIntakeOnPortalCheckAddress || $hasHousingFileOnPortalCheckAddress;
    }

    public function getBlockChangeAddressNumberAttribute()
    {
        foreach ($this->participations as $participation) {
            if ($participation->project && $participation->project->is_sce_project && !empty($participation->project->address_number_series)) {
                return true;
            }
        }
        return false;
    }

    public function getPortalSettingsLayoutAssignedAttribute()
    {
        return PortalSettingsLayout::where('is_default', true)->first();
    }

    /**
     * Scope voor filteren van contacten voor portal users.
     *
     * Een portal user mag alleen zijn eigen gegevens ophalen
     * en de gegevens van de contacten waaraan hij via een
     * occupation is gekoppeld.
     */
    public function scopeWhereAuthorizedForPortalUser($query)
    {
        $portalUser = Auth::user();

        $query->where(function ($query) use ($portalUser) {
            $query->where('id', $portalUser->contact_id);
//todo nog even goed checken of dit nu in alle gevallen goed gaat
//            $query->orWhereHas('occupations', function($query) use($portalUser){
//                $query->where('primary_contact_id', $portalUser->contact_id);
//            });
            $query->orWhereHas('primaryOccupations', function ($query) use ($portalUser) {
                $query->where('contact_id', $portalUser->contact_id);
            });
        });
    }

    public function newEloquentBuilder($query)
    {
        return new ContactBuilder($query);
    }

    public function calculateParticipationTotals()
    {
        $obligations = 0;
        $participations = 0;
        $pcr = 0;
        $loan = 0;

        foreach ($this->participations as $participation) {
            $projectCodeRef = $participation->project->projectType->code_ref;
            switch ($projectCodeRef) {
                case 'obligation':
                    $obligations += $participation->participations_definitive;
                    break;
                case 'capital':
                    $participations += $participation->participations_definitive;
                    break;
                case 'postalcode_link_capital':
                    $pcr += $participation->participations_definitive;
                    break;
                case 'loan':
                    $loan += $participation->amount_definitive;
                    break;
            }
        }

        $this->obligations_current = $obligations;
        $this->participations_current = $participations;
        $this->postalcode_link_capital_current = $pcr;
        $this->loan_current = $loan;

        return $this;
    }

    /**
     * Geef alleen de beschikbaarheden die ook echt beschikbaar zijn.
     * Als er al een x aantal afspraken in een week of maand zijn kan de beschikbaarheid vervallen obv max aantal afspraken instellingen.
     */
    public function getPlannableAvailabilitiesInPeriod(Carbon $start, Carbon $end)
    {
        return $this->availabilities()
            ->whereBetween('from', [$start, $end])
            ->get()
            ->filter(function (ContactAvailability $availability) {
                return !$this->hasReachedAppointmentLimitAtDate($availability->from);
            });
    }

    /**
     * Check of een coach nog beschikbaar is op een bepaalde datum obv max aantal afspraken instellingen.
     */
    private function hasReachedAppointmentLimitAtDate(Carbon $date)
    {
        return $this->hasReachedAppointmentLimitInMonth($date)
            || $this->hasReachedAppointmentLimitInWeek($date);
    }

    /**
     * Variabele om de berekende maandlimiet op te slaan om niet elke keer opnieuw te hoeven berekenen.
     */
    private $reachedAppointmentLimitsByMonth = [];

    /**
     * Check of een coach nog beschikbaar is in een bepaalde maand obv coach_max_appointments_per_month.
     */
    private function hasReachedAppointmentLimitInMonth(Carbon $date)
    {
        if(!$this->coach_max_appointments_per_month){
            return false;
        }

        $startDate = $date->copy()->startOfMonth();

        if(!isset($this->reachedAppointmentLimitsByMonth[$startDate->format('Y-m')])){
            $reachedLimit = $this->quotationRequests()
                ->whereBetween('date_planned', [$startDate, $date->copy()->endOfMonth()])
                ->where('status_id', '!=', QuotationRequestStatus::STATUS_VISIT_CANCELLED_ID)
                ->count() >= $this->coach_max_appointments_per_month;

            $this->reachedAppointmentLimitsByMonth[$startDate->format('Y-m')] = $reachedLimit;
        }

        return $this->reachedAppointmentLimitsByMonth[$startDate->format('Y-m')];
    }

    /**
     * Variabele om de berekende weeklimiet op te slaan om niet elke keer opnieuw te hoeven berekenen.
     */
    private $reachedAppointmentLimitsByWeek = [];

    /**
     * Check of een coach nog beschikbaar is in een bepaalde week obv coach_max_appointments_per_week.
     */
    private function hasReachedAppointmentLimitInWeek(Carbon $date)
    {
        if(!$this->coach_max_appointments_per_week){
            return false;
        }

        $startDate = $date->copy()->startOfWeek();

        if(!isset($this->reachedAppointmentLimitsByWeek[$startDate->format('Y-m-d')])){
            $reachedLimit = $this->quotationRequests()
                ->whereBetween('date_planned', [$startDate, $date->copy()->endOfWeek()])
                ->where('status_id', '!=', QuotationRequestStatus::STATUS_VISIT_CANCELLED_ID)
                ->count() >= $this->coach_max_appointments_per_week;

            $this->reachedAppointmentLimitsByWeek[$startDate->format('Y-m-d')] = $reachedLimit;
        }

        return $this->reachedAppointmentLimitsByWeek[$startDate->format('Y-m-d')];
    }
}
