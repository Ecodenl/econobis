<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\Address\AddressType;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsTable;
use Carbon\Carbon;
use League\Csv\Reader;
use Illuminate\Support\Facades\Log;
use App\Eco\Address\Address;

class ContactToImportCSVHelper
{
    private $csvExporter;
    private $contacts;

    public function __construct($contacts)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->contacts = $contacts;
    }

    public function downloadCSV()
    {
        $csv = '';
        $headers = true;

        foreach ($this->contacts->chunk(500) as $chunk) {
            $mapping = [
                'first_name' => 'Voornaam',
                'last_name' => 'Achternaam',
                'address' => 'Adres',
                'street' => 'Straat',
                'housenumber' => 'Huisnummer',
                'addition' => 'Toevoeging',
                'postal_code' => 'Postcode',
                'city' => 'Woonplaats',
                'email_contact' => 'Email primair',
                'email_invoices' => 'Email nota',
                'phone_number' => 'Telefoon',
                'ean' => 'Ean',
                'es_number' => 'Huidige klantnummer',
                'member_since' => 'Klant sinds',
                'end_date' => 'Klant tot',
            ];

            $csv = $this->csvExporter->build($chunk, $mapping, $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }
}