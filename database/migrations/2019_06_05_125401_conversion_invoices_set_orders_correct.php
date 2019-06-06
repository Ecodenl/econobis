<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;

class ConversionInvoicesSetOrdersCorrect extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $invoices = Invoice::whereIn('status_id', ['sent', 'paid', 'exported'])->whereDate('created_at', '>=', '2019-05-22')->whereDate('created_at', '<', '2019-06-07')->get();

        foreach ($invoices as $invoice){
            $order = $invoice->order;

            $invoice->subject =  $order->subject;
            $invoice->invoice_text =  $order->invoice_text;
            $invoice->iban =  $order->IBAN ? $order->IBAN : $order->contact->iban;
            $invoice->iban_attn =  $order->iban_attn ? $order->iban_attn : $order->contact->iban_attn;
            $invoice->sent_to_contact_number = $order->contact->number ? $order->contact->number : '';
            $invoice->sent_to_name = $order->contact->full_name;

            if($order->contact->primaryAddress){
                $primaryAddress = $order->contact->primaryAddress;
                $invoice->sent_to_street = $primaryAddress->street ? $primaryAddress->street : '';
                $invoice->sent_to_street_number = $primaryAddress->number ? $primaryAddress->number : '';
                $invoice->sent_to_addition = $primaryAddress->addition ? $primaryAddress->addition : '';
                $invoice->sent_to_postal_code = $primaryAddress->postal_code ? $primaryAddress->postal_code : '';
                $invoice->sent_to_country = $primaryAddress->country_id ? $primaryAddress->country->name : '';
            }
            $invoice->save();

            foreach ($invoice->order->orderProducts as $orderProduct){
                if($orderProduct->date_last_invoice){
                    $dateLastInvoice = $order->addDurationToDate(Carbon::parse($orderProduct->date_last_invoice));
                }
                else if($orderProduct->date_period_start_first_invoice){
                    $dateLastInvoice = $order->addDurationToDate(Carbon::parse($orderProduct->date_period_start_first_invoice));
                }
                else{
                    $dateLastInvoice = $order->addDurationToDate(Carbon::parse($orderProduct->date_start));
                }

                $orderProduct->date_last_invoice = $dateLastInvoice;
                $orderProduct->save();
            }

            if($order->collection_frequency_id === 'once'){
                $order->date_next_invoice = null;
            }
            else {
                $order->date_next_invoice = $order->addDurationToDate(Carbon::parse($order->date_next_invoice));
            }
            $order->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
