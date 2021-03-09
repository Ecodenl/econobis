<?php

namespace App\Http\Resources\Invoice;

use App\Http\Resources\Email\FullEmail;
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
                'molliePayments' => GenericResource::collection($this->whenLoaded('molliePayments')),

                'invoiceProducts' => FullInvoiceProduct::collection($this->whenLoaded('invoiceProducts')),

                'document' => GenericResource::make($this->whenLoaded('document')),

                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'statusId' => $this->status_id,
                'status' => FullEnumWithIdAndName::make($this->getStatus()),
                'subStatus' => $this->sub_status,
                'usesTwinfield' => $this->administration->uses_twinfield,
                'usesMollie' => $this->administration->uses_mollie,
                'isPaidByMollie' => $this->is_paid_by_mollie,
                'invoiceInTwinfield' => ($this->administration->uses_twinfield && $this->twinfield_number && !empty($this->twinfield_number)) ? true : false,
                'twinfieldNumber' => $this->twinfield_number,

                'amountOpen' => $this->amount_open,
                'datePaid' => $this->date_paid,
                'paymentReference' => $this->payment_reference,
                'datePaymentDue' => $this->date_payment_due,
                'dateSent' => $this->date_sent,
                'emailedTo' => $this->emailed_to,
                'sentToName' => $this->sent_to_name,
                'dateCollection' => $this->date_collection,
                'dateReminder1' => $this->date_reminder_1,
                'dateReminder2' => $this->date_reminder_2,
                'dateReminder3' => $this->date_reminder_3,
                'dateExhortation' => $this->date_exhortation,
                'emailReminder1' => $this->email_reminder_1,
                'emailReminder2' => $this->email_reminder_2,
                'emailReminder3' => $this->email_reminder_3,
                'emailExhortation' => $this->email_exhortation,
                'dateRequested' => $this->date_requested,

                'subject' => $this->subject,
                'invoiceText' => $this->invoice_text,
                'iban' => $this->iban,

                'daysToExpire' => $this->days_to_expire,
                'daysLastReminder' => $this->days_last_reminder,
                'totalInclVatInclReduction' => $this->getTotalInclVatInclReductionAttribute(),

                'taskCount' => $this->tasks()->count(),
                'relatedTasks' => FullTask::collection($this->whenLoaded('tasks')),

                'emailCount' => $this->emails()->count(),
                'relatedEmails' => FullEmail::collection($this->whenLoaded('emails')),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),

                'emailToAddress' => $this->emailToAddress ? $this->emailToAddress : 'Geen e-mail bekend',

                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
