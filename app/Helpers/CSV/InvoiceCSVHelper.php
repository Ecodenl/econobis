<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\Invoice\InvoiceProduct;
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
                    $invoice->date_collection_formatted = $this->formatDate($invoice->date_collection);
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
                'administration.name' => 'Administratie naam',
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
                'date_reminder_3' => 'Herinnering 3 verstuurd',
                'email_reminder_3' => 'E-mail herinnering 3',
                'date_exhortation' => 'Aanmaning verstuurd',
                'email_exhortation' => 'E-mail aanmaning',
                'days_to_expire' => 'Verloopt over',
                'days_last_reminder' => 'Laatste herinnering',
                'total_excl_vat_incl_reduction_formatted' => 'Notabedrag netto',
                'total_vat_incl_reduction_formatted' => 'Notabedrag BTW',
                'total_incl_vat_incl_reduction_formatted' => 'Notabedrag bruto',
                'payment_type' => 'Betaalwijze',
                'date_collection_formatted' => 'Incassodatum',
                'iban' => 'Ibannr',
                'iban_attn' => 'Iban tnv',
                'date_paid' => 'Datum betaald',
                'amount_paid' => 'Bedrag betaald',
                'payment_reference' => 'Betalingskenmerk',
                'online_reference' => '(online) betalingskenmerk',
                'online_date_paid' => '(online) datum betaald'
            ], $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    public function downloadCSVWithProducts(){

        $csv = '';
        $headers = true;

        $invoicesIdsList = $this->invoices->pluck('id')->toArray();
        $invoicesProducts = InvoiceProduct::query();
        foreach(array_chunk($invoicesIdsList, 900) as $chunk){
            $invoicesProducts->orWhereIn('invoice_id', $chunk);
        }
        $invoicesProducts->orderBy('invoice_id', 'DESC');

        foreach ($invoicesProducts->get()->chunk(500) as $chunk) {
            $chunk->load([
                'invoice.order.contact.person',
                'invoice.order.contact.organisation',
                'invoice.order.contact.primaryEmailAddress',
                'invoice.order.contact.primaryphoneNumber',
                'invoice.order.contact.primaryAddress.country',
            ]);

            $this->csvExporter->beforeEach(function ($invoicesProduct) {
                // person/organisation fields
                if($invoicesProduct->invoice->order->contact->type_id === 'person'){
                    $invoicesProduct->invoice->initials = $invoicesProduct->invoice->order->contact->person->initials;
                    $invoicesProduct->invoice->first_name = $invoicesProduct->invoice->order->contact->person->first_name;
                    $invoicesProduct->invoice->last_name_prefix = $invoicesProduct->invoice->order->contact->person->last_name_prefix ? $invoicesProduct->invoice->order->contact->person->last_name_prefix : '';
                    $invoicesProduct->invoice->last_name = $invoicesProduct->invoice->order->contact->person->last_name;
                }
                else if($invoicesProduct->invoice->order->contact->type_id === 'organisation'){
                    $invoicesProduct->invoice->initials = '';
                    $invoicesProduct->invoice->first_name = '';
                    $invoicesProduct->invoice->organisation = $invoicesProduct->invoice->order->contact->organisation->name;
                    $invoicesProduct->invoice->last_name_prefix = '';
                    $invoicesProduct->invoice->last_name = '';
                }

                $address = $invoicesProduct->invoice->order->contact->primaryAddress;

                $invoicesProduct->invoice->street = ($address ? $address->street : '');
                $invoicesProduct->invoice->street_number = ($address ? $address->number : '');
                $invoicesProduct->invoice->addition = ($address ? $address->addition : '');
                $invoicesProduct->invoice->postal_code = ($address ? $address->postal_code : '');
                $invoicesProduct->invoice->city = ($address ? $address->city : '');
                $invoicesProduct->invoice->country = (($address && $address->country) ? $address->country->name : '');

                $invoicesProduct->invoice->date_reminder_1 = $this->formatDate($invoicesProduct->invoice->date_reminder_1);
                $invoicesProduct->invoice->date_reminder_2 = $this->formatDate($invoicesProduct->invoice->date_reminder_2);
                $invoicesProduct->invoice->date_reminder_3 = $this->formatDate($invoicesProduct->invoice->date_reminder_3);
                $invoicesProduct->invoice->date_exhortation = $this->formatDate($invoicesProduct->invoice->date_exhortation);

                $invoicesProduct->invoice->status = $invoicesProduct->invoice->getStatus()->name;
                $invoicesProduct->invoice->payment_type = $invoicesProduct->invoice->getPaymentType()->name;

                if($invoicesProduct->invoice->payment_type_id === 'collection'){
                    $invoicesProduct->invoice->date_collection_formatted = $this->formatDate($invoicesProduct->invoice->date_collection);
                }

                if($invoicesProduct->invoice->date_sent){
                    $invoicesProduct->invoice->date_invoice = $this->formatDate($invoicesProduct->invoice->date_sent);
                }
                else{
                    $invoicesProduct->invoice->date_invoice = $this->formatDate($invoicesProduct->invoice->date_requested);
                }

                $invoicesProduct->invoice->date_paid = $this->formatDate($invoicesProduct->invoice->date_paid);
                $invoicesProduct->invoice->online_date_paid = $this->formatDate($invoicesProduct->invoice->online_date_paid);

                //afronden
                $invoicesProduct->invoice->total_incl_vat_incl_reduction_formatted = $this->formatFinancial($invoicesProduct->invoice->total_incl_vat_incl_reduction);
                $invoicesProduct->invoice->total_excl_vat_incl_reduction_formatted = $this->formatFinancial($invoicesProduct->invoice->total_excl_vat_incl_reduction);
                $invoicesProduct->invoice->total_vat_incl_reduction_formatted = $this->formatFinancial($invoicesProduct->invoice->total_vat_incl_reduction);
                $invoicesProduct->invoice->amount_paid = $this->formatFinancial($invoicesProduct->invoice->amount_paid);
            });

            $csv = $this->csvExporter->build($chunk, [
                'invoice.administration.name' => 'Administratie naam',
                'invoice.sent_to_contact_number' => 'Contactnummer',
                'invoice.organisation' => 'Organisatie',
                'invoice.initials' => 'Initialen',
                'invoice.first_name' => 'Voornaam',
                'invoice.last_name_prefix' => 'Tussenvoegsel',
                'invoice.last_name' => 'Achternaam',
                'invoice.street' => 'Adres',
                'invoice.street_number' => 'Huisnummer',
                'invoice.addition' => 'Huisnummer toevoeging',
                'invoice.postal_code' => 'Postcode',
                'invoice.city' => 'Plaats',
                'invoice.country' => 'Land',
                'invoice.order.contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
                'invoice.order.contact.primaryEmailAddress.email' => 'E-mail primair',
                'invoice.number' => 'Notanummer',
                'invoice.status' => 'Status',
                'invoice.sub_status' => 'Substatus',
                'invoice.subject' => 'Onderwerp',
                'invoice.date_invoice' => 'Notadatum',
                'invoice.emailed_to' => 'Verstuurd naar e-mail',
                'invoice.sent_to_name' => 'Nota naam',
                'invoice.sent_to_street' => 'Nota straat',
                'invoice.sent_to_street_number' => 'Nota straat nummer',
                'invoice.sent_to_addition' => 'Nota toevoeging',
                'invoice.sent_to_postal_code' => 'Nota postcode',
                'invoice.sent_to_country' => 'Nota land',
                'invoice.date_reminder_1' => 'Herinnering 1 verstuurd',
                'invoice.email_reminder_1' => 'E-mail herinnering 1',
                'invoice.date_reminder_2' => 'Herinnering 2 verstuurd',
                'invoice.email_reminder_2' => 'E-mail herinnering 2',
                'invoice.date_reminder_3' => 'Herinnering 2 verstuurd',
                'invoice.email_reminder_3' => 'E-mail herinnering 2',
                'invoice.date_exhortation' => 'Aanmaning verstuurd',
                'invoice.email_exhortation' => 'E-mail aanmaning',
                'invoice.days_to_expire' => 'Verloopt over',
                'invoice.days_last_reminder' => 'Laatste herinnering',
                'invoice.total_excl_vat_incl_reduction_formatted' => 'Notabedrag netto',
                'invoice.total_vat_incl_reduction_formatted' => 'Notabedrag BTW',
                'invoice.total_incl_vat_incl_reduction_formatted' => 'Notabedrag bruto',
                'invoice.payment_type' => 'Betaalwijze',
                'invoice.date_collection_formatted' => 'Incassodatum',
                'invoice.iban' => 'Ibannr',
                'invoice.iban_attn' => 'Iban tnv',
                'invoice.date_paid' => 'Datum betaald',
                'invoice.amount_paid' => 'Bedrag betaald',
                'invoice.payment_reference' => 'Betalingskenmerk',
                'invoice.online_reference' => '(online) betalingskenmerk',
                'invoice.online_date_paid' => '(online) datum betaald',
                'product_name' => 'Product naam',
                'amount' => 'Aantal',
                'amount_incl_reduction_excl_vat' => 'Bedrag ex btw',
                'amount_incl_reduction_incl_vat' => 'Bedrag incl btw'
            ], $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

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