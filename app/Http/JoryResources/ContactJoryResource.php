<?php

namespace App\Http\JoryResources;

use \App\Eco\Contact\Contact;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class ContactJoryResource extends JoryResource
{
    protected $modelClass = Contact::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('collect_mandate_code')->filterable()->sortable();
        $this->field('collect_mandate_collection_schema')->filterable()->sortable();
        $this->field('collect_mandate_first_run_date')->filterable()->sortable();
        $this->field('collect_mandate_signature_date')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('created_by_id')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('did_agree_avg')->filterable()->sortable();
        $this->field('external_id')->filterable()->sortable();
        $this->field('full_name')->filterable()->sortable();
        $this->field('iban')->filterable()->sortable();
        $this->field('iban_attn')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('is_collect_mandate')->filterable()->sortable();
        $this->field('liability_amount')->filterable()->sortable();
        $this->field('liable')->filterable()->sortable();
        $this->field('member_since')->filterable()->sortable();
        $this->field('member_until')->filterable()->sortable();
        $this->field('newsletter')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('owner_id')->filterable()->sortable();
        $this->field('participations_current')->filterable()->sortable();
        $this->field('status_id')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('updated_by_id')->filterable()->sortable();

        // Custom attributes
        $this->field('address_lines')->hideByDefault();

        // Relations
        $this->relation('addresses');
        $this->relation('campaigns');
        $this->relation('contact_energy_suppliers');
        $this->relation('contact_notes');
        $this->relation('contact_person');
        $this->relation('created_by');
        $this->relation('documents');
        $this->relation('email_addresses');
        $this->relation('emails');
        $this->relation('groups');
        $this->relation('housing_files');
        $this->relation('intakes');
        $this->relation('invoices');
        $this->relation('legal_rep_contact');
        $this->relation('notes');
        $this->relation('occupations');
        $this->relation('opportunities');
        $this->relation('order_products');
        $this->relation('orders');
        $this->relation('organisation');
        $this->relation('owner');
        $this->relation('participations');
        $this->relation('participations_gifted');
        $this->relation('participations_legal_rep');
        $this->relation('person');
        $this->relation('phone_numbers');
        $this->relation('primary_address');
        $this->relation('primary_contact_energy_supplier');
        $this->relation('primary_email_address');
        $this->relation('primary_occupations');
        $this->relation('primaryphone_number');
        $this->relation('production_project_revenue_distributions');
        $this->relation('revision_history');
        $this->relation('tasks');
        $this->relation('twinfield_numbers');
        $this->relation('updated_by');
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('full_name')->filterable()->sortable();
        $this->field('iban')->filterable()->sortable();
        $this->field('iban_attn')->filterable()->sortable();
        $this->field('did_agree_avg')->filterable()->sortable();

        // Custom attributes
        $this->field('address_lines')->hideByDefault();

        // Relations
        $this->relation('addresses');
        $this->relation('email_addresses');
        $this->relation('person');
        $this->relation('phone_numbers');
        $this->relation('contact_energy_suppliers');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->where('id', Auth::id());
        }
    }
}
