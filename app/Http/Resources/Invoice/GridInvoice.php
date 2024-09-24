<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Invoice;


use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Order\FullOrder;
use Illuminate\Http\Resources\Json\JsonResource;

class GridInvoice extends JsonResource
{
    public function toArray($request)
    {
        //datum is aanvraagdatum, maar als hij verzonden is, de verzenddatum
        $date = null;

        if($this->status_id === 'to-send'){
            $date = $this->date_requested;
        }
        else{
            $date = $this->date_sent;
        }

        $invoiceInTwinfield = ($this->administration->uses_twinfield && $this->twinfield_number && !empty($this->twinfield_number)) ? true : false;
        $invoicePaidInTwinfield = $invoiceInTwinfield && (
            !$this->administration->date_sync_twinfield_invoices || $this->date_sent >= $this->administration->date_sync_twinfield_invoices );

        return [
            'id' => $this->id,
            'number' => $this->number,
            'date' => $date,
            'subject' => $this->subject,

            'orderContactFullName' => $this->order->contact->full_name,

            'daysToExpire' => $this->days_to_expire,
            'daysLastReminder' => $this->days_last_reminder,
            'totalInclVatInclReduction' => $this->total_incl_vat_incl_reduction,
            'amountOpen' => $this->amount_open,

            'ibanContactOrInvoice' => $this->ibanContactOrInvoice,

            'dateReminder1' => $this->date_reminder_1,
            'dateReminder2' => $this->date_reminder_2,
            'dateReminder3' => $this->date_reminder_3,
            'dateExhortation' => $this->date_exhortation,
            'numberOfInvoiceReminders' => $this->number_of_invoice_reminders,

            'paymentTypeId' => $this->payment_type_id,
            'paymentType' =>  FullEnumWithIdAndName::make($this->getPaymentType()),
            'statusId' => $this->status_id,
            'status' =>  FullEnumWithIdAndName::make($this->getStatus()),
            'subStatus' => $this->sub_status,
            'usesTwinfield' => $this->administration->uses_twinfield,
            'invoiceInTwinfield' => $invoiceInTwinfield,
            'invoicePaidInTwinfield' => $invoicePaidInTwinfield,
            'compatibleWithTwinfield' => $this->isInvoiceFullyCompatibleWithTwinfield(),
            'twinfieldNumber' => $this->twinfield_number,
            'okForSepa' => $this->isInvoiceOkForSepa(),

            'emailToAddress' => $this->emailToAddress ? $this->emailToAddress : 'Geen e-mail bekend',

            'isPaidByMollie' => $this->is_paid_by_mollie,
        ];
    }
}