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
        $maxOrderProducts = 0;

        foreach ($this->orders as $order){
            if(($order->orderProducts()->count() - 1) > $maxOrderProducts){
                $maxOrderProducts = ($order->orderProducts()->count() -1);
            }
        }

        foreach ($this->orders->chunk(500) as $chunk) {
            $chunk->load([
                'contact.person.title',
                'contact.organisation',
                'contact.contactPerson.contact',
                'contact.contactPerson.contact.person.title',
                'contact.primaryEmailAddress',
                'contact.primaryphoneNumber',
                'contact.primaryAddress.country',
                'orderProducts.product',
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
                    $order->organisation = $order->contact->organisation->name;
                    if($order->contact->contactPerson && $order->contact->contactPerson->exists() && $order->contact->contactPerson->contact->type_id === 'person'){
                        $contactPerson = $order->contact->contactPerson->contact;

                        $order->title = $contactPerson->person->title ? $contactPerson->person->title->name : '';
                        $order->initials = $contactPerson->person->initials;
                        $order->first_name = $contactPerson->person->first_name;
                        $order->last_name_prefix = $contactPerson->person->last_name_prefix ? $contactPerson->person->last_name_prefix : '';
                        $order->last_name = $contactPerson->person->last_name;
                    }
                    else{
                        $order->initials = '';
                        $order->first_name = '';
                        $order->last_name_prefix = '';
                        $order->last_name = '';
                    }
                }

                $address = $order->contact->primaryAddress;

                $order->street = ($address ? $address->street : '');
                $order->street_number = ($address ? $address->number : '');
                $order->addition = ($address ? $address->addition : '');
                $order->postal_code = ($address ? $address->postal_code : '');
                $order->city = ($address ? $address->city : '');
                $order->country = (($address && $address->country) ? $address->country->name : '');

                $order->date_requested = $this->formatDate($order->date_requested);
                $order->date_next_invoice = $this->formatDate($order->date_next_invoice);

                $frequency = $order->getCollectionFrequency() ;
                $order->collectionFrequency = $frequency ? $frequency->name : '';

                $order->payment_type = $order->getPaymentType()->name;
                $order->status = $order->getStatus()->name;
                $order->btw = $order->getTotalInclVatInclReductionAttribute() - $order->getTotalExclVatInclReductionAttribute();

                $order->btw_formatted = $this->formatFinancial($order->btw);
                $order->total_incl_vat_incl_reduction_formatted = $this->formatFinancial($order->getTotalInclVatInclReductionAttribute());
                $order->total_excl_vat_incl_reduction_formatted = $this->formatFinancial($order->getTotalExclVatInclReductionAttribute());

                foreach ($order->orderProducts as $k => $orderProduct){
                    $orderProductName = 'order_product_' . $k;

                    $orderProduct->date_start = $this->formatDate($orderProduct->date_start);
                    $orderProduct->date_end = $this->formatDate($orderProduct->date_end);

                    $period = false;

                    if($orderProduct->product->duration_id !== 'none' && $orderProduct->order->collection_frequency_id !== 'once') {
                        if($orderProduct->date_last_invoice){
                            $start = $orderProduct->date_last_invoice;
                            $end = $orderProduct->order->addDurationToDate(Carbon::parse($orderProduct->date_last_invoice));
                        }
                        else if($orderProduct->date_period_start_first_invoice){
                            $start = $orderProduct->date_period_start_first_invoice;
                            $end = $orderProduct->order->addDurationToDate(Carbon::parse($orderProduct->date_period_start_first_invoice));
                        }
                        else{
                            $start = $orderProduct->date_start;
                            $end = $orderProduct->order->addDurationToDate(Carbon::parse($orderProduct->date_start));
                        }
                        $period = Carbon::parse($start)->isoFormat('D MMMM YYYY') . ' t/m ' . Carbon::parse($end)->subDay()->isoFormat('D MMMM YYYY');
                    }

                    $orderProductInfo = [
                        'product' => $orderProduct->product->name,
                        'description' => $orderProduct->product->invoice_text,
                        'amount' => $orderProduct->amount,
                        'total' => $this->formatFinancial($orderProduct->getAmountInclReductionInclVat()),
                        'percentage_reduction' => $orderProduct->percentage_reduction,
                        'amount_reduction' => $this->formatFinancial($orderProduct->amount_reduction),
                        'date_start' => $orderProduct->date_start,
                        'date_end' => $orderProduct->date_end,
                        'period' => $period,
                    ];

                    $order->$orderProductName = $orderProductInfo;
                }
            });


            $mapping = [
                'contact.id' => 'Contact id',
                'contact.number' => 'Contactnummer',
                'organisation' => 'Organisation',
                'title' => 'Aanspreektitel',
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
                'contact.primaryphoneNumber.number' => 'Telefoonnummer primair',
                'contact.primaryEmailAddress.email' => 'E-mail primair',
                'date_requested' => 'Aanvraag datum',
                'number' => 'Ordernummer',
                'status' => 'Status',
                'subject' => 'Betreft',
                'po_number' => 'Opdrachtnummer klant',
                'project_number' => 'Projectnummer',
                'invoice_text' => 'Opmerking',
                'total_excl_vat_incl_reduction_formatted' => 'Orderbedrag excl. btw',
                'btw_formatted' => 'Orderbedrag BTW',
                'total_incl_vat_incl_reduction_formatted' => 'Orderbedrag incl. btw',
                'collectionFrequency' => 'Notafrequentie',
                'date_next_invoice' => 'Volgende nota datum',
                'payment_type' => 'Betaalwijze',
                'contact.iban' => 'Ibannr contact',
                'contact.iban_attn' => 'Ibannr t.n.v.',
            ];

            for ($x = 0; $x <= $maxOrderProducts; $x++) {
                $orderProductMapping =
                    [
                        'order_product_' . $x . '.product' => ('Product ' . ($x+1)),
                        'order_product_' . $x . '.description' => 'Omschrijving',
                        'order_product_' . $x . '.total' => 'Bedrag',
                        'order_product_' . $x . '.amount' => 'Aantal',
                        'order_product_' . $x . '.total' => 'Totaal bedrag',
                        'order_product_' . $x . '.percentage_reduction' => 'Korting percentage',
                        'order_product_' . $x . '.amount_reduction' => 'Korting bedrag',
                        'order_product_' . $x . '.date_start' => 'Begin datum',
                        'order_product_' . $x . '.date_end' => 'Eind datum',
                        'order_product_' . $x . '.period' => 'Periode'
                    ];
                $mapping = array_merge($mapping, $orderProductMapping);
            }

            $csv = $this->csvExporter->build($chunk, $mapping, $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

    private function formatFinancial($amount){
        return number_format($amount, 2, ',', '');
    }
}