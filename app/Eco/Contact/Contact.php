<?php

namespace App\Eco\Contact;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactNote\ContactNote;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Resources\ContactGroup\GridContactGroup;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Contact extends Model
{
    use PresentableTrait, RevisionableTrait, Encryptable, SoftDeletes;
    protected $presenter = ContactPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'newsletter' => 'boolean',
        'liable' => 'boolean',
    ];

    protected $dates = [
        'member_since',
        'member_until',
    ];

    protected $encryptable = [
      'iban'
    ];

    public function addresses()
    {
        return $this->hasMany(Address::class);
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
        return $this->belongsToMany(ContactGroup::class, 'contact_groups_pivot')->orderBy('contact_groups.id', 'desc');
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

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function productionProjectRevenueDistributions()
    {
        return $this->hasMany(ProductionProjectRevenueDistribution::class);
    }

    public function housingFiles()
    {
        return $this->hasManyThrough(HousingFile::class, Address::class)->orderBy('housing_files.id', 'desc');
    }

    public function contactEnergySuppliers()
    {
        return $this->hasMany(ContactEnergySupplier::class);
    }

    public function primaryContactEnergySupplier()
    {
        return $this->hasOne(ContactEnergySupplier::class)->where('is_current_supplier', true);
    }

    public function participations()
    {
        return $this->hasMany(ParticipantProductionProject::class)->orderBy('participation_production_project.id', 'desc');
    }

    public function participationsGifted()
    {
        return $this->hasMany(ParticipantProductionProject::class, 'gifted_by_contact_id');
    }

    public function participationsLegalRep()
    {
        return $this->hasMany(ParticipantProductionProject::class, 'legal_rep_contact_id');
    }

    public function primaryOccupations()
    {
        return $this->hasMany(OccupationContact::class, 'primary_contact_id')->join('contacts', 'contact_id', '=', 'contacts.id')->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')->orderBy('contacts.full_name');
    }

    public function occupations()
    {
        return $this->hasMany(OccupationContact::class)->join('contacts', 'primary_contact_id', '=', 'contacts.id')->select('contacts.*', 'occupation_contact.*', 'occupation_contact.id as ocid')->orderBy('contacts.full_name');
    }

    public function contactPerson()
    {
        return $this->hasOne(OccupationContact::class, 'primary_contact_id')->where('primary', true)->orWhere('contact_id', $this->id)->where('primary', true);
    }

    public function legalRepContact()
    {
        return $this->hasOne(OccupationContact::class)->where('occupation_id', 7)->orderBy('occupation_contact.id', 'desc')->limit(1);
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

    public function getVisibleGroups(){

        //statische groepen
        $staticGroups = $this->groups()->where('show_contact_form', true)->get();

        //dynamische groepen
        $dynamicGroups = ContactGroup::where('show_contact_form', true)->where('type_id', 'dynamic')->get();

        $dynamicGroupsForContact = $dynamicGroups->filter(function ($dynamicGroup) {
            foreach ($dynamicGroup->dynamic_contacts->get() as $dynamic_contact){
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
}
