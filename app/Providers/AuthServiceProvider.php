<?php

namespace App\Providers;

use App\Eco\Opportunity\OpportunityPolicy;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Organisation\OrganisationPolicy;
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
use App\Eco\Task\Task;
use App\Eco\Task\TaskPolicy;
use App\Eco\User\User;
use App\Eco\User\UserPolicy;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\ContactGroupPolicy;
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
        Organisation::class => OrganisationPolicy::class,
        Address::class => AddressPolicy::class,
        Contact::class => ContactPolicy::class,
        ContactNote::class => ContactNotePolicy::class,
        EmailAddress::class => EmailAddressPolicy::class,
        Person::class => PersonPolicy::class,
        PhoneNumber::class => PhoneNumberPolicy::class,
        User::class => UserPolicy::class,
        ContactGroup::class => ContactGroupPolicy::class,
        Opportunity::class => OpportunityPolicy::class,
        Task::class => TaskPolicy::class,
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
