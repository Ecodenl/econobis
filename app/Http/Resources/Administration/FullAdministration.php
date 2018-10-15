<?php

namespace App\Http\Resources\Administration;

use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullAdministration extends Resource
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
                'name' => $this->name,
                'administrationNumber' => $this->administration_number,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,

                'countryId' => $this->country_id,
                'country' => GenericResource::make($this->whenLoaded('country')),

                'emailTemplateId' => $this->email_template_id,
                'emailTemplate' => FullEmailTemplate::make($this->whenLoaded('emailTemplate')),

                'emailTemplateReminderId' => $this->email_template_reminder_id,
                'emailTemplateReminder' => FullEmailTemplate::make($this->whenLoaded('emailTemplateReminder')),

                'emailTemplateExhortationId' => $this->email_template_exhortation_id,
                'emailTemplateExhortation' => FullEmailTemplate::make($this->whenLoaded('emailTemplateExhortation')),

                'kvkNumber' => $this->kvk_number,
                'btwNumber' => $this->btw_number,
                'IBAN' => $this->IBAN,
                'ibanAttn' => $this->iban_attn,
                'email' => $this->email,
                'website' => $this->website,
                'bic' => $this->bic,
                'sepaContractName' => $this->sepa_contract_name,
                'sepaCreditorId' => $this->sepa_creditor_id,
                'rsinNumber' => $this->rsin_number,
                'defaultPaymentTerm' => $this->default_payment_term,
                'logoFilename' => $this->logo_filename,
                'logoName' => $this->logo_name,

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),

                'users' => FullUser::collection($this->whenLoaded('users')),

                'products' => FullProduct::collection($this->whenLoaded('products')),

                'sepas' => FullSepa::collection($this->whenLoaded('sepas')),

                'totalOrders' => $this->total_orders,
                'totalOrdersConcepts' => $this->total_orders_concepts,
                'totalOrdersUpcoming' => $this->total_orders_upcoming,
                'totalOrdersToCreateInvoices' => $this->total_orders_to_create_invoices,
                'totalOrdersToSendInvoices' => $this->total_orders_to_send_invoices,
                'totalOrdersClosed' => $this->total_orders_closed,

                'totalInvoices' => $this->total_invoices,
                'totalInvoicesChecked' => $this->total_invoices_checked,
                'totalInvoicesSent' => $this->total_invoices_sent,
                'totalInvoicesExported' => $this->total_invoices_exported,
                'totalInvoicesReminder' => $this->total_invoices_reminder,
                'totalInvoicesExhortation' => $this->total_invoices_exhortation,
                'totalInvoicesPaid' => $this->total_invoices_paid,
                'totalInvoicesIrrecoverable' => $this->total_invoices_irrecoverable,

                'totalPaymentInvoices' => $this->total_payment_invoices,
                'totalPaymentInvoicesConcepts' => $this->total_payment_invoices_concepts,
                'totalPaymentInvoicesSent' => $this->total_payment_invoices_sent,
                'totalPaymentInvoicesNotPaid' => $this->total_payment_invoices_not_paid,
                
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

            ];
    }
}
