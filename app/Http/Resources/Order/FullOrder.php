<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Invoice\FullInvoice;
use App\Http\Resources\Invoice\InvoicePeek;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullOrder extends Resource
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
                'number' => $this->number,
                'subject' => $this->subject,

                'contactId' => $this->contact_id,
                'contact' => FullContact::make($this->whenLoaded('contact')),

                'administrationId' => $this->administration_id,
                'administration' => FullAdministration::make($this->whenLoaded('administration')),

                'orderProducts' => FullOrderProduct::collection($this->whenLoaded('orderProducts')),

                'emailTemplateIdCollection' => $this->email_template_id_collection,
                'emailTemplateCollection' => FullEmailTemplate::make($this->whenLoaded('emailTemplateCollection')),

                'emailTemplateIdTransfer' => $this->email_template_id_transfer,
                'emailTemplateTransfer' => FullEmailTemplate::make($this->whenLoaded('emailTemplateTransfer')),

                'emailTemplateReminderId' => $this->email_template_reminder_id,
                'emailTemplateReminder' => FullEmailTemplate::make($this->whenLoaded('emailTemplateReminder')),

                'emailTemplateExhortationId' => $this->email_template_exhortation_id,
                'emailTemplateExhortation' => FullEmailTemplate::make($this->whenLoaded('emailTemplateExhortation')),

                'totalPriceInclVat' => $this->total_price_incl_vat,
                'totalPriceInclVatPerYear' => $this->total_price_incl_vat_per_year,
                'poNumber' => $this->po_number,
                'IBAN' => $this->IBAN,
                'ibanAttn' => $this->iban_attn,
                'invoiceText' => $this->invoice_text,
                'dateNextInvoice' => $this->date_next_invoice,
                'dateRequested' => $this->date_requested,

                'collectionFrequencyId' => $this->collection_frequency_id,
                'collectionFrequency' => FullEnumWithIdAndName::make($this->getCollectionFrequency()),
                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'statusId' => $this->status_id,
                'status' => FullEnumWithIdAndName::make($this->getStatus()),

                'invoiceCount' => $this->invoices()->count(),
                'relatedInvoices' => FullInvoice::collection($this->whenLoaded('invoices')),
                'invoicePaidCollectionCount' => $this->invoicesPaidCollection()->count(),
                'relatedInvoicesPaidCollection' => FullInvoice::collection($this->whenLoaded('invoicesPaidCollection')),
                'invoicePaidTransferCount' => $this->invoicesPaidTransfer()->count(),
                'relatedInvoicesPaidTransfer' => FullInvoice::collection($this->whenLoaded('invoicesPaidTransfer')),

                'taskCount' => $this->tasks()->count(),
                'relatedTasks' => FullTask::collection($this->whenLoaded('tasks')),

                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),

                'emailCount' => $this->emails()->count(),
                'relatedEmails' => FullEmail::collection($this->whenLoaded('emails')),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

                'canCreateInvoice' => $this->can_create_invoice,
                'canEdit' => !$this->invoices()->where('invoices.status_id', 'to-send')->exists()
            ];
    }
}
