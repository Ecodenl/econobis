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

class InvoiceCSVHelper
{
    private $csvExporter;
    private $invoices;

    public function __construct($invoices)
    {
        $this->csvExporter = new \Laracsv\Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->invoices = $invoices;
    }

    public function downloadCSV(){
        $this->invoices->load([
            'order.contact.person',
            'order.contact.organisation',
            'order.contact.primaryEmailAddress',
            'order.contact.primaryphoneNumber',
            'order.contact.primaryAddress',
        ]);

        $this->csvExporter->beforeEach(function ($invoice) {
            // person/organisation fields
            if($invoice->order->contact->type_id === 'person'){
                $invoice->initials = $invoice->order->contact->person->initials;
                $invoice->first_name = $invoice->order->contact->person->first_name;
                $invoice->last_name_prefix = $invoice->order->contact->person->last_name_prefix ? $invoice->order->contact->person->last_name_prefix : '';
                $invoice->last_name = $invoice->order->contact->person->last_name;
            }
            else if($invoice->order->contact->type_id === 'organisation'){
                $invoice->initials = '';
                $invoice->first_name = $invoice->order->contact->organisation->name;
                $invoice->last_name_prefix = '';
                $invoice->last_name = '';
            }

            $invoice->date_requested = Carbon::parse($invoice->date_requested)->format('d/m/Y');
            $invoice->date_collection = Carbon::parse($invoice->date_collection)->format('d/m/Y');
        });

        $csv = $this->csvExporter->build($this->invoices, [
            'initials' => 'Initialen',
            'first_name' => 'Voornaam',
            'last_name_prefix' => 'Tussenvoegsel',
            'last_name' => 'Achternaam',
            'order.contact.primaryAddress.street' => 'Adres',
            'order.contact.primaryAddress.number' => 'Huisnummer',
            'order.contact.primaryAddress.addition' => 'Huisnummer toevoeging',
            'order.contact.primaryAddress.postal_code' => 'Postcode',
            'order.contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
            'order.contact.primaryEmailAddress.email' => 'E-mail primair',
            'date_requested' => 'Factuurdatum',
            'number' => 'Factuurnummer',
            'total_price_incl_vat_and_reduction' => 'Factuurbedrag bruto',
            'total_price_ex_vat_incl_reduction' => 'Factuurbedrag netto',
            'date_next_collection' => 'Incassodatum',
            'order.IBAN' => 'Ibannr',
        ])->getCsv();

        return $csv;
    }
}