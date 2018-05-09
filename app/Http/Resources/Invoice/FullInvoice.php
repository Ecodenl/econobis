<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Order\FullOrder;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullInvoice extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'invoiceNumber' => $this->invoice_number,
                'number' => $this->number,

                'orderId' => $this->order_id,
                'order' => FullOrder::make($this->whenLoaded('order')),

                'payments' => GenericResource::make($this->whenLoaded('payments')),

                'invoiceProducts' => FullInvoiceProduct::collection($this->whenLoaded('invoiceProducts')),

                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'statusId' => $this->status_id,
                'status' => FullEnumWithIdAndName::make($this->getStatus()),
                'sendMethodId' => $this->send_method_id,
                'sendMethod' => FullEnumWithIdAndName::make($this->getSendMethod()),

                'amountOpen' => $this->amount_open,
                'datePaid' => $this->date_paid,
                'datePaymentDue' => $this->date_payment_due,
                'dateSent' => $this->date_sent,
                'dateCollection' => $this->date_collection,
                'dateReminder1' => $this->date_reminder_1,
                'dateReminder2' => $this->date_reminder_2,
                'dateReminder3' => $this->date_reminder_3,
                'dateExhortation' => $this->date_exhortation,
                'dateRequested' => $this->date_requested,

                'daysExpired' => $this->days_expired,
                'totalPriceInclVatAndReduction' => $this->total_price_incl_vat_and_reduction,

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),

                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
