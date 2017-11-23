<?php

namespace App\Providers;

use App\Eco\Account\Account;
use App\Eco\Account\AccountPolicy;
use App\Eco\Address\Address;
use App\Eco\Address\AddressPolicy;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactPolicy;
use App\Eco\ContactNote\ContactNote;
use App\Eco\ContactNote\ContactNotePolicy;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressPolicy;
use App\Eco\Person\Person;
use App\Eco\Person\PersonPolicy;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberPolicy;
use App\Eco\User\User;
use App\Eco\User\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Account::class => AccountPolicy::class,
        Address::class => AddressPolicy::class,
        Contact::class => ContactPolicy::class,
        ContactNote::class => ContactNotePolicy::class,
        EmailAddress::class => EmailAddressPolicy::class,
        Person::class => PersonPolicy::class,
        PhoneNumber::class => PhoneNumberPolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
