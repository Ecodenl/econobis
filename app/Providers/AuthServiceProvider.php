<?php

namespace App\Providers;

use App\Eco\Administration\Administration;
use App\Eco\Administration\AdministrationPolicy;
use App\Eco\AuditTrail\AuditTrail;
use App\Eco\AuditTrail\AuditTrailPolicy;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignPolicy;
use App\Eco\CostCenter\CostCenter;
use App\Eco\CostCenter\CostCenterPolicy;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentPolicy;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\DocumentTemplate\DocumentTemplatePolicy;
use App\Eco\HousingFile\HousingFile;
use App\Eco\HousingFile\HousingFilePolicy;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePolicy;
use App\Eco\Ledger\Ledger;
use App\Eco\Ledger\LedgerPolicy;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxPolicy;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Mailbox\MailgunDomainPolicy;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasurePolicy;
use App\Eco\Opportunity\OpportunityPolicy;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\Order\OrderPolicy;
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
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationPolicy;
use App\Eco\ParticipantProject\ObligationNumber;
use App\Eco\ParticipantProject\ObligationNumberPolicy;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPolicy;
use App\Eco\Person\Person;
use App\Eco\Person\PersonPolicy;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberPolicy;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakePolicy;
use App\Eco\Product\Product;
use App\Eco\Product\ProductPolicy;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectPolicy;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenuePolicy;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\Project\ProjectValueCoursePolicy;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestPolicy;
use App\Eco\Task\Task;
use App\Eco\Task\TaskPolicy;
use App\Eco\Team\Team;
use App\Eco\Team\TeamPolicy;
use App\Eco\User\User;
use App\Eco\User\UserPolicy;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\ContactGroupPolicy;
use App\Eco\VatCode\VatCode;
use App\Eco\VatCode\VatCodePolicy;
use App\Eco\Webform\Webform;
use App\Eco\Webform\WebformPolicy;
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
        Intake::class => IntakePolicy::class,
        HousingFile::class => HousingFilePolicy::class,
        Campaign::class => CampaignPolicy::class,
        Measure::class => MeasurePolicy::class,
        Document::class => DocumentPolicy::class,
        DocumentTemplate::class => DocumentTemplatePolicy::class,
        AuditTrail::class => AuditTrailPolicy::class,
        Mailbox::class => MailboxPolicy::class,
        QuotationRequest::class => QuotationRequestPolicy::class,
        Team::class => TeamPolicy::class,
        Project::class => ProjectPolicy::class,
        ProjectRevenue::class => ProjectRevenuePolicy::class,
        ProjectValueCourse::class => ProjectValueCoursePolicy::class,
        ParticipantProject::class => ParticipantProjectPolicy::class,
        ObligationNumber::class => ObligationNumberPolicy::class,
        ParticipantMutation::class => ParticipantMutationPolicy::class,
        Administration::class => AdministrationPolicy::class,
        Product::class => ProductPolicy::class,
        Order::class => OrderPolicy::class,
        Invoice::class => InvoicePolicy::class,
        Webform::class => WebformPolicy::class,
        MailgunDomain::class => MailgunDomainPolicy::class,
        VatCode::class => VatCodePolicy::class,
        Ledger::class => LedgerPolicy::class,
        CostCenter::class => CostCenterPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::tokensExpireIn(now()->addHours(12));
        Passport::refreshTokensExpireIn(now()->addHours(12));

        Passport::routes();
    }
}
