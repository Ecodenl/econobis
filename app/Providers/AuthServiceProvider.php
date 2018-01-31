<?php

namespace App\Providers;

use App\Eco\AuditTrail\AuditTrail;
use App\Eco\AuditTrail\AuditTrailPolicy;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignPolicy;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentPolicy;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\DocumentTemplate\DocumentTemplatePolicy;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxPolicy;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasurePolicy;
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
use App\Eco\Registration\Registration;
use App\Eco\Registration\RegistrationPolicy;
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
        Registration::class => RegistrationPolicy::class,
        Campaign::class => CampaignPolicy::class,
        Measure::class => MeasurePolicy::class,
        Document::class => DocumentPolicy::class,
        DocumentTemplate::class => DocumentTemplatePolicy::class,
        AuditTrail::class => AuditTrailPolicy::class,
        Mailbox::class => MailboxPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::tokensExpireIn(now()->addMinutes(10));
        Passport::refreshTokensExpireIn(now()->addHours(2));

        Passport::routes();
    }
}
