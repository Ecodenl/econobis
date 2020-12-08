<?php

namespace App\Http\JoryResources;

use \App\Eco\Contact\Contact;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class ContactJoryResource extends JoryResource
{
    protected $modelClass = Contact::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('full_name')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
        $this->field('full_name')->filterable()->sortable();
        $this->field('iban')->filterable()->sortable();
        $this->field('iban_attn')->filterable()->sortable();
        $this->field('did_agree_avg')->filterable()->sortable();
        $this->field('date_did_agree_avg')->filterable()->sortable();

        // Custom attributes
        $this->field('address_lines')->hideByDefault();
        $this->field('is_participant')->filterable()->sortable();
        $this->field('is_participant_pcr_project')->filterable()->sortable();

        // Relations
        $this->relation('addresses');
        $this->relation('emailAddresses');
        $this->relation('person');
        $this->relation('organisation');
        $this->relation('phoneNumbers');
        $this->relation('primaryContactEnergySupplier');
        $this->relation('occupations');
        $this->relation('portalUser');

        $this->relation('participations');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->whereAuthorizedForPortalUser();
        }
    }
}
