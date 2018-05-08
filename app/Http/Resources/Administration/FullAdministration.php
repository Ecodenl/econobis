<?php

namespace App\Http\Resources\Administration;

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

                'kvkNumber' => $this->kvk_number,
                'btwNumber' => $this->btw_number,
                'IBAN' => $this->IBAN,
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

                'totalOrders' => $this->total_orders,
                'totalOrdersConcepts' => $this->total_orders_concepts,
                'totalOrdersInvoices' => $this->total_orders_invoices,
                'totalOrdersCollections' => $this->total_orders_collections,
                'totalOrdersClosed' => $this->total_orders_closed,

                'totalInvoices' => $this->total_invoices,
                'totalInvoicesConcepts' => $this->total_invoices_concepts,
                'totalInvoicesChecked' => $this->total_invoices_checked,
                'totalInvoicesSent' => $this->total_invoices_sent,
                'totalInvoicesExported' => $this->total_invoices_exported,
                'totalInvoicesReminder' => $this->total_invoices_reminder,
                'totalInvoicesExhortation' => $this->total_invoices_exhortation,
                'totalInvoicesPaid' => $this->total_invoices_paid,
                'totalInvoicesIrrecoverable' => $this->total_invoices_irrecoverable,

                'deletedAt' => $this->deleted_at,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

            ];
    }
}
