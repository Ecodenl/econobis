<?php

namespace App\Eco\Contact;

use App\Eco\Campaign\Campaign;
use App\Eco\Email\Email;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Address\Address;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactNote\ContactNote;
use App\Eco\Organisation\OrganisationType;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Registration\Registration;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Contact extends Model
{
    use PresentableTrait, RevisionableTrait, SoftDeletes, Encryptable;
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
        return $this->hasMany(Email::class);
    }

    public function phoneNumbers()
    {
        return $this->hasMany(PhoneNumber::class);
    }

    public function primaryphoneNumber()
    {
        return $this->hasOne(PhoneNumber::class)->where('primary', true);
    }

    public function notes()
    {
        return $this->hasMany(ContactNote::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
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
        return $this->belongsToMany(ContactGroup::class, 'contact_groups_pivot');
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

    public function registrations()
    {
        return $this->hasManyThrough(Registration::class, Address::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function campaigns(){
        return $this->belongsToMany(Campaign::class);
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
}
