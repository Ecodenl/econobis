<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Invoice;

use App\Eco\Order\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class InvoiceObserver
{

    public function creating(Invoice $invoice)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $userId = Auth::id();
        $invoice->number = 'temp';

        if(!$invoice->status_id ){
            $invoice->status_id = 'to-send';
        }

        $invoice->invoice_number = 0;
        $invoice->created_by_id = $userId;

        $order = Order::find($invoice->order_id);

        $invoice->administration_id = $order->administration_id;
        $invoice->payment_type_id = $order->payment_type_id;

        // Code voor Mollie om de factuur van buitenaf veilig op te kunnen roepen.
        $invoice->code = Str::random(32);
    }

    public function created(Invoice $invoice)
    {
        $invoice->number = 'F' . Carbon::now()->year . '-new';
        $invoice->setDaysToExpire();
        $invoice->setDaysLastReminder();
        $invoice->save();
    }

    public function saving(Invoice $invoice){
        $oldInvoiceStatusId = $invoice->getOriginal('status_id');

        // Als de status van is-sending naar verzonden wordt gezet, updaten we van alle orderregels de laatste nota datum.
        // Deze wordt later gebruikt om eenmalige producten te checken of ze betaald zijn en om de periode weer te geven op de nota.
        // Ook passen we de volgende nota geplande nota datum aan van de order
        if($invoice->status_id === 'sent' && ($oldInvoiceStatusId === 'is-sending' || $oldInvoiceStatusId === 'is-resending') ){
            $order = $invoice->order;

            $invoice->subject =  $order->subject;
            $invoice->invoice_text =  $order->invoice_text;
            $invoice->iban =  $order->contact->iban;
            $invoice->iban_attn =  $order->contact->iban_attn;
            $invoice->sent_to_contact_number = $order->contact->number ? $order->contact->number : '';
            $invoice->sent_to_name = $order->contact->full_name;

            if($order->contact->primaryAddress){
                $primaryAddress = $order->contact->primaryAddress;
                $invoice->sent_to_street = $primaryAddress->street ? $primaryAddress->street : '';
                $invoice->sent_to_street_number = $primaryAddress->number ? $primaryAddress->number : 0;
                $invoice->sent_to_addition = $primaryAddress->addition ? $primaryAddress->addition : '';
                $invoice->sent_to_postal_code = $primaryAddress->postal_code ? $primaryAddress->postal_code : '';
                $invoice->sent_to_country = $primaryAddress->country_id ? $primaryAddress->country->name : '';
            }

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

        $invoice->setDaysToExpire();
        $invoice->setDaysLastReminder();
    }
}
