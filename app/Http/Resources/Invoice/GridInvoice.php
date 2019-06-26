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
use Illuminate\Http\Resources\Json\Resource;

class GridInvoice extends Resource
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

        return [
            'id' => $this->id,
            'number' => $this->number,
            'date' => $date,
            'subject' => $this->subject,

            'orderContactFullName' => $this->order->contact->full_name,

            'daysToExpire' => $this->days_to_expire,
            'daysLastReminder' => $this->days_last_reminder,
            'totalPriceInclVatAndReduction' => $this->total_price_incl_vat_and_reduction,
            'amountOpen' => $this->amount_open,

            'iban' => $this->iban,

            'dateReminder1' => $this->date_reminder_1,
            'dateReminder2' => $this->date_reminder_2,
            'dateReminder3' => $this->date_reminder_3,
            'dateExhortation' => $this->date_exhortation,

            'paymentTypeId' => $this->payment_type_id,
            'paymentType' =>  FullEnumWithIdAndName::make($this->getPaymentType()),
            'statusId' => $this->status_id,
            'status' =>  FullEnumWithIdAndName::make($this->getStatus()),
            'subStatus' => $this->sub_status,
            'usesTwinfield' => $this->administration->uses_twinfield,

            'emailToAddress' => $this->emailToAddress ? $this->emailToAddress : 'Geen e-mail bekend'
        ];
    }
}