<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use Carbon\Carbon;

class ContactCSVHelper
{
    private $csvExporter;
    private $contacts;

    public function __construct($contacts)
    {
        $this->csvExporter = new \Laracsv\Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->contacts = $contacts;
    }

    public function downloadCSV(){
        $this->contacts->load([
            'person',
            'organisation',
            'person',
            'primaryEmailAddress',
            'primaryphoneNumber',
            'primaryAddress',
        ]);

        $this->csvExporter->beforeEach(function ($contact) {
            // person/organisation fields
            if($contact->type_id === 'person'){
                $contact->initials = $contact->person->initials;
                $contact->first_name = $contact->person->first_name;
                $contact->last_name_prefix;
                $contact->last_name = $contact->person->last_name;
            }
            else if($contact->type_id === 'organisation'){
                $contact->initials = '';
                $contact->first_name = $contact->organisation->name;
                $contact->last_name_prefix = '';
                $contact->last_name = '';
            }
        });

        $csv = $this->csvExporter->build($this->contacts, [
            'initials' => 'Initialen',
            'first_name' => 'Voornaam',
            'last_name_prefix' => 'Tussenvoegsel',
            'last_name' => 'Achternaam',
            'primaryAddress.street' => 'Adres',
            'primaryAddress.number' => 'Huisnummer',
            'primaryAddress.addition' => 'Huisnummer toevoeging',
            'primaryAddress.postal_code' => 'Postcode',
            'primaryphoneNumber.number' => 'Telefoonnummer primair',
            'primaryEmailAddress.email' => 'E-mail primair',
        ])->getCsv();

        return $csv;
    }
}