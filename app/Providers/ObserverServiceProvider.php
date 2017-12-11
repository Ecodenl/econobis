<?php

namespace App\Providers;

use App\Eco\Organisation\Organisation;
use App\Eco\Organisation\OrganisationObserver;
use App\Eco\Address\Address;
use App\Eco\Address\AddressObserver;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactObserver;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\ContactGroupObserver;
use App\Eco\ContactNote\ContactNote;
use App\Eco\ContactNote\ContactNoteObserver;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressObserver;
use App\Eco\Person\Person;
use App\Eco\Person\PersonObserver;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberObserver;
use Illuminate\Support\ServiceProvider;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Person::observe(PersonObserver::class);
        Organisation::observe(OrganisationObserver::class);
        Address::observe(AddressObserver::class);
        EmailAddress::observe(EmailAddressObserver::class);
        PhoneNumber::observe(PhoneNumberObserver::class);
        Contact::observe(ContactObserver::class);
        ContactNote::observe(ContactNoteObserver::class);
        ContactGroup::observe(ContactGroupObserver::class);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
