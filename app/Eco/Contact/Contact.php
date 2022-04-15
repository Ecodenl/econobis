<?php

namespace App\Eco\Contact;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactNote\ContactNote;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\HousingFile\HousingFile;
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
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Portal\PortalUser;
use App\Eco\Task\Task;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
use App\Eco\User\User;
use App\Http\Resources\ContactGroup\GridContactGroup;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Contact extends Model
{
    use PresentableTrait, RevisionableTrait, Encryptable, SoftDeletes;
    protected $presenter = ContactPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'liable' => 'boolean',
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
        return $this->hasMany(TwinfieldcustomerNumber::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class)->orderByDesc('primary')->orderByDesc('id');
    }

    public function addressesWithoutOld()
    {
        return $this->hasMany(Address::class)->where('type_id', '!=',  'old')->orderByDesc('primary')->orderByDesc('id');
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
        if(!$this->status_id) return null;

        return ContactStatus::get($this->status_id);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(ContactGroup::class, 'contact_groups_pivot')->withPivot('laposta_member_id', 'laposta_member_state', 'member_created_at', 'member_to_group_since')->orderBy('contact_groups.id', 'desc');
    }

    public function isPerson()
    {
        return ($this->type_id == ContactType::PERSON);
    }

    public function isOrganisation()
    {
        return ($this->type_id == ContactType::ORGANISATION);
    }

    public function getType()
    {
        if(!$this->type_id) return null;

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

    public function campaigns(){
        return $this->belongsToMany(Campaign::class);
    }

    public function responses(){
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

    public function housingFiles()
    {
        return $this->hasManyThrough(HousingFile::class, Address::class)->orderBy('housing_files.id', 'desc');
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
        return $this->hasMany(OccupationContact::class, 'primary_contact_id')->join('contacts', 'contact_id', '=', 'contacts.id')->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')->orderBy('contacts.full_name');
    }

    public function occupations()
    {
        return $this->hasMany(OccupationContact::class)
            ->join('contacts', 'primary_contact_id', '=', 'contacts.id')
            ->join('occupations', 'occupation_id', '=', 'occupations.id')
            ->select('contacts.*', 'occupation_contact.*', 'occupations.occupation_for_portal', 'occupation_contact.id as ocid')->orderBy('contacts.full_name');
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

    //Returns addresses array as Type - Streetname - Number
    //Primary address always comes first
    public function getPrettyAddresses(){
        $this->load('addresses');
        $addresses = [];
        foreach ($this->addresses as $address){
            if($address->primary == 1){
                array_unshift($addresses, $address->getType()->name . ' - ' . $address->street . ' - ' . $address->number);
            }
            else{
                $addresses[] = $address->getType()->name . ' - ' . $address->street . ' - ' . $address->number;
            }
        }

        return $addresses;
    }

    //Return email based on priority
    public function getOrderEmail()
    {
        $emailAddresses = $this->emailAddresses->reverse();

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'invoice') {
                return $emailAddress;
            }
        }

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->primary) {
                return $emailAddress;
            }
        }

        return null;
    }

    public function getAllStaticAndDynamicGroups()
    {
        //statische groepen
        $staticGroups = $this->groups()->get()->pluck('id')->toArray();

        //dynamische groepen
        $dynamicGroups = ContactGroup::where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->all_contacts as $dynamic_contact){
                if($dynamic_contact->id === $this->id){
                    return true;
                }
            }
            return false;
        })->pluck('id')->toArray();

        return array_merge($staticGroups, $dynamicGroupsForContact);
    }

    public function getAllGroups()
    {
        //statische groepen
        $staticGroups = $this->groups()->get()->pluck('id')->toArray();

        //dynamische groepen
        $dynamicGroups = ContactGroup::where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->all_contacts as $dynamic_contact){
                if($dynamic_contact->id === $this->id){
                    return true;
                }
            }
            return false;
        })->pluck('id')->toArray();

        //samengestelde groepen
        $composedGroups = ContactGroup::where('type_id', 'composed')->get();

        $composedGroupsForContact = $composedGroups->filter(function ($composedGroup) {
            foreach ($composedGroup->all_contacts as $composed_contact){
                if($composed_contact->id === $this->id){
                    return true;
                }
            }
            return false;
        })->pluck('id')->toArray();

        return array_merge($staticGroups, $dynamicGroupsForContact, $composedGroupsForContact);
    }

    public function getVisibleGroups(){

        //statische groepen
        $staticGroups = $this->groups()->where('show_contact_form', true)->get();

        //dynamische groepen
        $dynamicGroups = ContactGroup::where('show_contact_form', true)->where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->all_contacts as $dynamic_contact){
                if($dynamic_contact->id === $this->id){
                    return true;
                }
            }
            return false;
        });

        $allGroups = $staticGroups->merge($dynamicGroupsForContact);

        //samengestelde groepen
        $composedGroups = ContactGroup::where('show_contact_form', true)->where('type_id', 'composed')->get();

        $composedGroupsForContact = $composedGroups->filter(function ($composedGroup) {
            foreach ($composedGroup->all_contacts as $composed_contact){
                if($composed_contact->id === $this->id){
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
            $fullNameFnf = ( $firstName . $prefix . $this->person->last_name );
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

    public function getAddressLinesAttribute(){
        if(Address::where('contact_id', $this->id)->where('primary', true)->where('type_id', 'invoice')->exists()){
            $address = Address::where('contact_id', $this->id)->where('primary', true)->where('type_id', 'invoice')->first();
        }
        elseif(Address::where('contact_id', $this->id)->where('type_id', 'invoice')->exists()){
            $address = Address::where('contact_id', $this->id)->where('type_id', 'invoice')->first();
        }
        elseif(Address::where('contact_id', $this->id)->where('primary', true)->exists()){
            $address = Address::where('contact_id', $this->id)->where('primary', true)->first();
        }
        elseif(Address::where('contact_id', $this->id)->exists()){
            $address = Address::where('contact_id', $this->id)->first();
        }
        else{
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

    public function getIsParticipantAttribute()
    {
        return( $this->participations && $this->participations->count() > 0 );
    }

    public function getDisableChangeContactNameOnPortalAttribute()
    {
        foreach($this->participations as $participation)
        {
            if($participation->project && $participation->project->disable_change_contact_name_on_portal ){
                return true;
            }
        }
        return false;
    }

    public function getAddressForPostalCodeCheckAttribute()
    {
        if($this->type_id === ContactType::PERSON) {
            return $this->primaryAddress;
        }
        if($this->type_id === ContactType::ORGANISATION) {
            return Address::where('contact_id', $this->id)->where('type_id', 'visit')->first();
        }
    }

    public function getNoAddressesFoundAttribute()
    {
        if($this->type_id === ContactType::PERSON) {
            if ($this->primaryAddress) {
                return false;
            } else {
                return true;
            }
        }
        if($this->type_id === ContactType::ORGANISATION) {
            if(Address::where('contact_id', $this->id)->where('type_id', 'visit')->exists()){
                return false;
            } else {
                return true;
            }
        }
    }

    public function getIsParticipantPcrProjectAttribute()
    {
        foreach($this->participations as $participation)
        {
            if($participation->project && $participation->project->projectType->code_ref == 'postalcode_link_capital' ){
                return true;
            }
        }
        return false;
    }

    public function getIsParticipantSceProjectAttribute()
    {
        foreach($this->participations as $participation)
        {
            if($participation->project && $participation->project->is_sce_project ){
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
        return($this->primaryAddress ? $this->primaryAddress->id : 0);
    }

    public function getBlockChangeAddressAttribute()
    {
        $hasIntakeOnPortalCheckAddress = false;
        $hasHousingFileOnPortalCheckAddress = false;
        if($this->addressForPostalCodeCheck){
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
        foreach($this->participations as $participation)
        {
            if($participation->project && $participation->project->is_sce_project && !empty($participation->project->address_number_series) ){
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

        $query->where(function ($query) use($portalUser) {
            $query->where('id', $portalUser->contact_id);
//todo nog even goed checken of dit nu in alle gevallen goed gaat
//            $query->orWhereHas('occupations', function($query) use($portalUser){
//                $query->where('primary_contact_id', $portalUser->contact_id);
//            });
            $query->orWhereHas('primaryOccupations', function($query) use($portalUser){
                $query->where('contact_id', $portalUser->contact_id);
            });
        });
    }
}
