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
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('full_name')->filterable()->sortable();
        $this->field('first_name')->filterable()->sortable();
        $this->field('last_name')->filterable()->sortable();
        $this->field('iban')->filterable()->sortable();
        $this->field('iban_attn')->filterable()->sortable();
        $this->field('did_agree_avg')->filterable()->sortable();

//        'number',
//        'fullName',
//        'email',
//        'titleId',
//        'firstName',
//        'lastNamePrefixId',
//        'lastName',
//        'emailAddress1',
//        'emailAddress2',
//        'telephoneNumber1',
//        'telephoneNumber2',
//        'street',
//        'streetNumber',
//        'streetAddition',
//        'postalCode',
//        'city',
//        'countryId',
//        'iban',
//        'ibanName',
//        'didAgreeAvg',
//        'energySupplierId',
//        'esNumber',
//        'memberSince',
//        'eanElectricity',
//        'clientNr',
//        'clientSince',

        // Custom attributes
        $this->field('address_lines')->hideByDefault();

        // Relations
        $this->relation('addresses');
        $this->relation('email_addresses');
        $this->relation('person');
        $this->relation('phone_numbers');
        $this->relation('contact_energy_suppliers');
        $this->relation('primaryOccupations');
        $this->relation('portal_user');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->whereAuthorizedForPortalUser();
        }
    }
}
