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
use League\Csv\Reader;

class OrderCSVHelper
{
    private $csvExporter;
    private $orders;

    public function __construct($orders)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->orders = $orders;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->orders->chunk(500) as $chunk) {
            $chunk->load([
            'contact.person.title',
            'contact.organisation',
            'contact.primaryEmailAddress',
            'contact.primaryphoneNumber',
            'contact.primaryAddress',
        ]);

        $this->csvExporter->beforeEach(function ($order) {
            // person/organisation fields
            if($order->contact->type_id === 'person'){
                $order->title = $order->contact->person->title ? $order->contact->person->title->name : '';
                $order->initials = $order->contact->person->initials;
                $order->first_name = $order->contact->person->first_name;
                $order->last_name_prefix = $order->contact->person->last_name_prefix ? $order->contact->person->last_name_prefix : '';
                $order->last_name = $order->contact->person->last_name;
            }
            else if($order->contact->type_id === 'organisation'){
                $order->initials = '';
                $order->first_name = $order->contact->organisation->name;
                $order->last_name_prefix = '';
                $order->last_name = '';
            }

            $order->date_requested = Carbon::parse($order->date_requested)->format('d/m/Y');
            $order->date_next_invoice = Carbon::parse($order->date_next_invoice)->format('d/m/Y');

            $frequency = $order->getCollectionFrequency() ;
            $order->collectionFrequency = $frequency ? $frequency->name : '';

            if($order->IBAN == '' || !$order->IBAN){
                $order->IBAN = $order->contact->iban;
            }
        });


        $csv = $this->csvExporter->build($chunk, [
            'contact.id' => 'Contact id',
            'contact.number' => 'Contactnummer',
            'title' => 'Aanspreektitel',
            'initials' => 'Initialen',
            'first_name' => 'Voornaam',
            'last_name_prefix' => 'Tussenvoegsel',
            'last_name' => 'Achternaam',
            'contact.primaryAddress.street' => 'Adres',
            'contact.primaryAddress.number' => 'Huisnummer',
            'contact.primaryAddress.addition' => 'Huisnummer toevoeging',
            'contact.primaryAddress.postal_code' => 'Postcode',
            'contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
            'contact.primaryEmailAddress.email' => 'E-mail primair',
            'date_requested' => 'Orderdatum',
            'number' => 'Ordernummer',
            'subject' => 'Order onderwerp',
            'total_price_incl_vat' => 'Orderbedrag bruto',
            'total_price_ex_vat' => 'Orderbedrag netto',
            'date_next_invoice' => 'Volgende factuur datum',
            'collectionFrequency' => 'Factuurfrequentie',
            'IBAN' => 'Ibannr',
        ], $headers);
            $headers = false;
        }

        return Reader::BOM_UTF8 . $csv->getCsv();
    }
}