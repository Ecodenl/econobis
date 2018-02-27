<?php

namespace App\Providers;

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
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureObserver;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityObserver;
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
use App\Eco\Person\Person;
use App\Eco\Person\PersonObserver;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberObserver;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\ProductionProject\ProductionProjectObserver;
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
