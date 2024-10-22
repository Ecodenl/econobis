<?php

namespace App\Providers;

use App\Eco\Administration\Administration;
use App\Eco\Administration\AdministrationObserver;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignObserver;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationObserver;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentObserver;
use App\Eco\DocumentTemplate\DocumentTemplateObserver;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EmailTemplate\EmailTemplateObserver;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\AddressEnergySupplier\AddressEnergySupplierObserver;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewObserver;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewContactObserver;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\FinancialOverview\FinancialOverviewProjectObserver;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProjectObserver;
use App\Eco\HousingFile\HousingFile;
use App\Eco\HousingFile\HousingFileObserver;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeObserver;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoiceObserver;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoicePaymentObserver;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureObserver;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityObserver;
use App\Eco\Order\Order;
use App\Eco\Order\OrderObserver;
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
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationObserver;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectObserver;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\PaymentInvoice\PaymentInvoiceObserver;
use App\Eco\Person\Person;
use App\Eco\Person\PersonObserver;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberObserver;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\PortalSettingsLayout\PortalSettingsLayoutObserver;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\PriceHistoryObserver;
use App\Eco\Product\Product;
use App\Eco\Product\ProductObserver;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectObserver;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueObserver;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Project\ProjectRevenueDistributionObserver;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwhObserver;
use App\Eco\RevenuesKwh\RevenuesKwhObserver;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\Project\ProjectValueCourseObserver;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestObserver;
use App\Eco\Task\Task;
use App\Eco\Task\TaskObserver;
use App\Eco\Webform\Webform;
use App\Eco\Webform\WebformObserver;
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
        Opportunity::observe(OpportunityObserver::class);
        Campaign::observe(CampaignObserver::class);
        Measure::observe(MeasureObserver::class);
        EmailTemplate::observe(EmailTemplateObserver::class);
        Document::observe(DocumentObserver::class);
        DocumentTemplate::observe(DocumentTemplateObserver::class);
        Intake::observe(IntakeObserver::class);
        HousingFile::observe(HousingFileObserver::class);
        Task::observe(TaskObserver::class);
        QuotationRequest::observe(QuotationRequestObserver::class);
        AddressEnergySupplier::observe(AddressEnergySupplierObserver::class);
        Project::observe(ProjectObserver::class);
        ProjectValueCourse::observe(ProjectValueCourseObserver::class);
        ProjectRevenue::observe(ProjectRevenueObserver::class);
        ProjectRevenueDistribution::observe(ProjectRevenueDistributionObserver::class);
        RevenuesKwh::observe(RevenuesKwhObserver::class);
        RevenuePartsKwh::observe(RevenuePartsKwhObserver::class);
        ParticipantMutation::observe(ParticipantMutationObserver::class);
        Administration::observe(AdministrationObserver::class);
        Product::observe(ProductObserver::class);
        PriceHistory::observe(PriceHistoryObserver::class);
        Order::observe(OrderObserver::class);
        Invoice::observe(InvoiceObserver::class);
        InvoicePayment::observe(InvoicePaymentObserver::class);
        ParticipantProject::observe(ParticipantProjectObserver::class);
        PaymentInvoice::observe(PaymentInvoiceObserver::class);
        Webform::observe(WebformObserver::class);
        FinancialOverview::observe(FinancialOverviewObserver::class);
        FinancialOverviewContact::observe(FinancialOverviewContactObserver::class);
        FinancialOverviewProject::observe(FinancialOverviewProjectObserver::class);
        FinancialOverviewParticipantProject::observe(FinancialOverviewParticipantProjectObserver::class);
        PortalSettingsLayout::observe(PortalSettingsLayoutObserver::class);
        Cooperation::observe(CooperationObserver::class);
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
