<?php

namespace App\Providers;

use App\Eco\Administration\Administration;
use App\Eco\Administration\AdministrationObserver;
use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignObserver;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentObserver;
use App\Eco\DocumentTemplate\DocumentTemplateObserver;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EmailTemplate\EmailTemplateObserver;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\EnergySupplier\ContactEnergySupplierObserver;
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
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectObserver;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\ParticipantTransaction\ParticipantTransactionObserver;
use App\Eco\Person\Person;
use App\Eco\Person\PersonObserver;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberObserver;
use App\Eco\Product\Product;
use App\Eco\Product\ProductObserver;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\ProductionProject\ProductionProjectObserver;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\ProductionProject\ProductionProjectRevenueObserver;
use App\Eco\ProductionProject\ProductionProjectValueCourse;
use App\Eco\ProductionProject\ProductionProjectValueCourseObserver;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestObserver;
use App\Eco\Task\Task;
use App\Eco\Task\TaskObserver;
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
        ContactEnergySupplier::observe(ContactEnergySupplierObserver::class);
        ProductionProject::observe(ProductionProjectObserver::class);
        ProductionProjectValueCourse::observe(ProductionProjectValueCourseObserver::class);
        ProductionProjectRevenue::observe(ProductionProjectRevenueObserver::class);
        ParticipantTransaction::observe(ParticipantTransactionObserver::class);
        Administration::observe(AdministrationObserver::class);
        Product::observe(ProductObserver::class);
        Order::observe(OrderObserver::class);
        Invoice::observe(InvoiceObserver::class);
        InvoicePayment::observe(InvoicePaymentObserver::class);
        ParticipantProductionProject::observe(ParticipantProductionProjectObserver::class);
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
