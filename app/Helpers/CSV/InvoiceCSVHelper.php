<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Project\ProjectRevenue;
use Carbon\Carbon;
use League\Csv\Reader;

class InvoiceCSVHelper
{
    private $csvExporter;
    private $invoices;

    public function __construct($invoices)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->invoices = $invoices;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->invoices->chunk(500) as $chunk) {
            $chunk->load([
            'order.contact.person',
            'order.contact.organisation',
            'order.contact.primaryEmailAddress',
            'order.contact.primaryphoneNumber',
            'order.contact.primaryAddress.country',
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
                $invoice->first_name = '';
                $invoice->organisation = $invoice->order->contact->organisation->name;
                $invoice->last_name_prefix = '';
                $invoice->last_name = '';
            }

            $address = $invoice->order->contact->primaryAddress;

            $invoice->street = ($address ? $address->street : '');
            $invoice->street_number = ($address ? $address->number : '');
            $invoice->addition = ($address ? $address->addition : '');
            $invoice->postal_code = ($address ? $address->postal_code : '');
            $invoice->city = ($address ? $address->city : '');
            $invoice->country = (($address && $address->country) ? $address->country->name : '');

            $invoice->date_reminder_1 = $this->formatDate($invoice->date_reminder_1);
            $invoice->date_reminder_2 = $this->formatDate($invoice->date_reminder_2);
            $invoice->date_reminder_3 = $this->formatDate($invoice->date_reminder_3);
            $invoice->date_exhortation = $this->formatDate($invoice->date_exhortation);

            $invoice->status = $invoice->getStatus()->name;
            $invoice->payment_type = $invoice->getPaymentType()->name;

            if($invoice->payment_type_id === 'collection'){
                $invoice->collection_iban = $invoice->iban;
                $invoice->date_collection_formatted = $this->formatDate($invoice->date_collection);
                $invoice->collection_iban_attn = $invoice->iban_attn;
            }

            if($invoice->date_sent){
                $invoice->date_invoice = $this->formatDate($invoice->date_sent);
            }
            else{
                $invoice->date_invoice = $this->formatDate($invoice->date_requested);
            }

            $invoice->date_paid = $this->formatDate($invoice->date_paid);
            $invoice->online_date_paid = $this->formatDate($invoice->online_date_paid);

            //afronden
            $invoice->total_incl_vat_incl_reduction_formatted = $this->formatFinancial($invoice->total_incl_vat_incl_reduction);
            $invoice->total_excl_vat_incl_reduction_formatted = $this->formatFinancial($invoice->total_excl_vat_incl_reduction);
            $invoice->total_vat_incl_reduction_formatted = $this->formatFinancial($invoice->total_vat_incl_reduction);
            $invoice->amount_paid = $this->formatFinancial($invoice->amount_paid);
        });

        $csv = $this->csvExporter->build($chunk, [
            'sent_to_contact_number' => 'Contactnummer',
            'organisation' => 'Organisatie',
            'initials' => 'Initialen',
            'first_name' => 'Voornaam',
            'last_name_prefix' => 'Tussenvoegsel',
            'last_name' => 'Achternaam',
            'street' => 'Adres',
            'street_number' => 'Huisnummer',
            'addition' => 'Huisnummer toevoeging',
            'postal_code' => 'Postcode',
            'city' => 'Plaats',
            'country' => 'Land',
            'order.contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
            'order.contact.primaryEmailAddress.email' => 'E-mail primair',
            'number' => 'Notanummer',
            'status' => 'Status',
            'sub_status' => 'Substatus',
            'subject' => 'Onderwerp',
            'date_invoice' => 'Notadatum',
            'emailed_to' => 'Verstuurd naar e-mail',
            'sent_to_name' => 'Nota naam',
            'sent_to_street' => 'Nota straat',
            'sent_to_street_number' => 'Nota straat nummer',
            'sent_to_addition' => 'Nota toevoeging',
            'sent_to_postal_code' => 'Nota postcode',
            'sent_to_country' => 'Nota land',
            'date_reminder_1' => 'Herinnering 1 verstuurd',
            'email_reminder_1' => 'E-mail herinnering 1',
            'date_reminder_2' => 'Herinnering 2 verstuurd',
            'email_reminder_2' => 'E-mail herinnering 2',
            'date_reminder_3' => 'Herinnering 2 verstuurd',
            'email_reminder_3' => 'E-mail herinnering 2',
            'date_exhortation' => 'Aanmaning verstuurd',
            'email_exhortation' => 'E-mail aanmaning',
            'days_to_expire' => 'Verloopt over',
            'days_last_reminder' => 'Laatste herinnering',
            'total_excl_vat_incl_reduction_formatted' => 'Notabedrag netto',
            'total_vat_incl_reduction_formatted' => 'Notabedrag BTW',
            'total_incl_vat_incl_reduction_formatted' => 'Notabedrag bruto',
            'payment_type' => 'Betaalwijze',
            'date_collection_formatted' => 'Incassodatum',
            'collection_iban' => 'Ibannr',
            'collection_iban_attn' => 'Iban t.n.v.',
            'date_paid' => 'Datum betaald',
            'amount_paid' => 'Bedrag betaald',
            'payment_reference' => 'Betalingskenmerk',
            'online_reference' => '(online) betalingskenmerk',
            'online_date_paid' => '(online) datum betaald'
         ], $headers);
            $headers = false;
        }

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? Carbon::parse($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

    private function formatFinancial($amount){
        return number_format($amount, 2, ',', '');
    }
}