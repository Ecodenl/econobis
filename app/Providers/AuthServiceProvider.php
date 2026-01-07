<?php

namespace App\Providers;

use App\Eco\Address\Address;
use App\Eco\Address\AddressPolicy;
use App\Eco\AddressDongle\AddressDongle;
use App\Eco\AddressDongle\AddressDonglePolicy;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\AddressEnergySupplier\AddressEnergySupplierPolicy;
use App\Eco\Administration\Administration;
use App\Eco\Administration\AdministrationPolicy;
use App\Eco\AuditTrail\AuditTrail;
use App\Eco\AuditTrail\AuditTrailPolicy;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignPolicy;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactPolicy;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ContactGroup\ContactGroupPolicy;
use App\Eco\ContactNote\ContactNote;
use App\Eco\ContactNote\ContactNotePolicy;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationPolicy;
use App\Eco\CostCenter\CostCenter;
use App\Eco\CostCenter\CostCenterPolicy;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentPolicy;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\DocumentTemplate\DocumentTemplatePolicy;
use App\Eco\Email\Email;
use App\Eco\Email\EmailPolicy;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressPolicy;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EmailTemplate\EmailTemplatePolicy;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewPolicy;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldLog;
use App\Eco\FreeFields\FreeFieldsFieldLogPolicy;
use App\Eco\FreeFields\FreeFieldsFieldPolicy;
use App\Eco\HousingFile\HousingFile;
use App\Eco\HousingFile\HousingFileLog;
use App\Eco\HousingFile\HousingFileLogPolicy;
use App\Eco\HousingFile\HousingFilePolicy;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakePolicy;
use App\Eco\IntakeSource\IntakeSource;
use App\Eco\IntakeSource\IntakeSourcePolicy;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePolicy;
use App\Eco\Jobs\JobsLog;
use App\Eco\Jobs\JobsLogPolicy;
use App\Eco\Ledger\Ledger;
use App\Eco\Ledger\LedgerPolicy;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxPolicy;
use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Mailbox\MailgunDomainPolicy;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Measure\MeasureCategoryPolicy;
use App\Eco\Measure\MeasurePolicy;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityPolicy;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Opportunity\OpportunityStatusPolicy;
use App\Eco\Order\Order;
use App\Eco\Order\OrderPolicy;
use App\Eco\Organisation\Organisation;
use App\Eco\Organisation\OrganisationPolicy;
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
use App\Eco\Portal\PortalUser;
use App\Eco\Portal\PortalUserPolicy;
use App\Eco\PortalSettings\PortalSettings;
use App\Eco\PortalSettings\PortalSettingsPolicy;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardPolicy;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\PortalSettingsLayout\PortalSettingsLayoutPolicy;
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
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\QuotationRequest\QuotationRequestStatusPolicy;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenuesKwhPolicy;
use App\Eco\Task\Task;
use App\Eco\Task\TaskPolicy;
use App\Eco\Task\TaskType;
use App\Eco\Task\TaskTypePolicy;
use App\Eco\Team\Team;
use App\Eco\Team\TeamPolicy;
use App\Eco\Twinfield\TwinfieldLog;
use App\Eco\Twinfield\TwinfieldLogPolicy;
use App\Eco\User\User;
use App\Eco\User\UserPolicy;
use App\Eco\VatCode\VatCode;
use App\Eco\VatCode\VatCodePolicy;
use App\Eco\Webform\Webform;
use App\Eco\Webform\WebformPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Guards\TokenGuard;
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
        AddressDongle::class => AddressDonglePolicy::class,
        AddressEnergySupplier::class => AddressEnergySupplierPolicy::class,
        Contact::class => ContactPolicy::class,
        ContactNote::class => ContactNotePolicy::class,
        PortalUser::class => PortalUserPolicy::class,
        EmailAddress::class => EmailAddressPolicy::class,
        Person::class => PersonPolicy::class,
        PhoneNumber::class => PhoneNumberPolicy::class,
        User::class => UserPolicy::class,
        ContactGroup::class => ContactGroupPolicy::class,
        Opportunity::class => OpportunityPolicy::class,
        Task::class => TaskPolicy::class,
        Intake::class => IntakePolicy::class,
        IntakeSource::class => IntakeSourcePolicy::class,
        HousingFile::class => HousingFilePolicy::class,
        HousingFileLog::class => HousingFileLogPolicy::class,
        Campaign::class => CampaignPolicy::class,
        Measure::class => MeasurePolicy::class,
        MeasureCategory::class => MeasureCategoryPolicy::class,
        Document::class => DocumentPolicy::class,
        DocumentTemplate::class => DocumentTemplatePolicy::class,
        Email::class => EmailPolicy::class,
        EmailTemplate::class => EmailTemplatePolicy::class,
        AuditTrail::class => AuditTrailPolicy::class,
        FreeFieldsField::class => FreeFieldsFieldPolicy::class,
        FreeFieldsFieldLog::class => FreeFieldsFieldLogPolicy::class,
        Mailbox::class => MailboxPolicy::class,
        QuotationRequest::class => QuotationRequestPolicy::class,
        Team::class => TeamPolicy::class,
        Project::class => ProjectPolicy::class,
        ProjectRevenue::class => ProjectRevenuePolicy::class,
        RevenuesKwh::class => RevenuesKwhPolicy::class,
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
        TaskType::class => TaskTypePolicy::class,
        QuotationRequestStatus::class => QuotationRequestStatusPolicy::class,
        OpportunityStatus::class => OpportunityStatusPolicy::class,
        FinancialOverview::class => FinancialOverviewPolicy::class,
        PortalSettings::class => PortalSettingsPolicy::class,
        PortalSettingsLayout::class => PortalSettingsLayoutPolicy::class,
        PortalSettingsDashboard::class => PortalSettingsDashboardPolicy::class,
        Cooperation::class => CooperationPolicy::class,
        JobsLog::class => JobsLogPolicy::class,
        TwinfieldLog::class => TwinfieldLogPolicy::class,
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

        /**
         * Scopes registreren voor verschillende tokens voor
         * gebruik van app of portal.
         */
        Passport::tokensCan([
            'use-app' => 'Use Econobis app',
            'use-portal' => 'Use Econobis portal',
        ]);

        // Laad de custom Passport routes
        if (! $this->app->routesAreCached()) {
            require base_path('routes/passport.php');
        }

        Passport::loadKeysFrom(__DIR__ . '/../../secrets/oauth');

        /**
         * Helperfuncties op Auth facade toevoegen. Zo kan via
         * \Auth::isPortalUser() snel gecheckt worden of er
         * een portal gebruiker is ingelogd.
         */
        TokenGuard::macro('isPortalUser', function () {
            return Auth::user() instanceof PortalUser;
        });

        /**
         * Tegenovergestelde functie om te checken of
         * het een gebruiker van Econobis zelf is.
         */
        TokenGuard::macro('isAppUser', function () {
            return Auth::user() instanceof User;
        });

    }
}
