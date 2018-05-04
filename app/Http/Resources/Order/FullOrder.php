<?php

namespace App\Http\Resources\Order;

use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
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

                'emailTemplateId' => $this->email_template_id,
                'emailTemplate' => FullEmailTemplate::make($this->whenLoaded('emailTemplate')),

                'emailTemplateReminderId' => $this->email_template_reminder_id,
                'emailTemplateReminder' => FullEmailTemplate::make($this->whenLoaded('emailTemplateReminder')),

                'emailTemplateExhortationId' => $this->email_template_exhortation_id,
                'emailTemplateExhortation' => FullEmailTemplate::make($this->whenLoaded('emailTemplateExhortation')),

                'totalPriceInclVat' => $this->total_price_incl_vat,
                'poNumber' => $this->po_number,
                'IBAN' => $this->IBAN,
                'ibanAttn' => $this->iban_attn,
                'invoiceText' => $this->invoice_text,
                'dateRequested' => $this->date_requested,
                'dateStart' => $this->date_start,
                'dateEnd' => $this->date_end,

                'collectionFrequencyId' => $this->collection_frequency_id,
                'collectionFrequency' => FullEnumWithIdAndName::make($this->getCollectionFrequency()),
                'paymentTypeId' => $this->payment_type_id,
                'paymentType' => FullEnumWithIdAndName::make($this->getPaymentType()),
                'statusId' => $this->status_id,
                'status' => FullEnumWithIdAndName::make($this->getStatus()),

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),

                'deletedAt' => $this->deleted_at,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}
