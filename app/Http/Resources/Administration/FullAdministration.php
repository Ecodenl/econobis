<?php

namespace App\Http\Resources\Administration;

use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullAdministration extends JsonResource
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
                'administrationCode' => $this->administration_code,
                'address' => $this->address,
                'postalCode' => $this->postal_code,
                'city' => $this->city,

                'countryId' => $this->country_id,
                'country' => GenericResource::make($this->whenLoaded('country')),
                'ledgers' => GenericResource::make($this->whenLoaded('ledgers')),

                'emailTemplateIdCollection' => $this->email_template_id_collection,
                'emailTemplateCollection' => FullEmailTemplate::make($this->whenLoaded('emailTemplateCollection')),

                'emailTemplateIdTransfer' => $this->email_template_id_transfer,
                'emailTemplateTransfer' => FullEmailTemplate::make($this->whenLoaded('emailTemplateTransfer')),

                'emailTemplateReminderId' => $this->email_template_reminder_id,
                'emailTemplateReminder' => FullEmailTemplate::make($this->whenLoaded('emailTemplateReminder')),

                'emailTemplateExhortationId' => $this->email_template_exhortation_id,
                'emailTemplateExhortation' => FullEmailTemplate::make($this->whenLoaded('emailTemplateExhortation')),

                'emailTemplateFinancialOverviewId' => $this->email_template_financial_overview_id,
                'emailTemplateFinancialOverview' => FullEmailTemplate::make($this->whenLoaded('emailTemplateFinancialOverview')),

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
                'numberOfInvoiceReminders' => $this->number_of_invoice_reminders,
                'logoFilename' => $this->logo_filename,
                'logoName' => $this->logo_name,

                'createdById' => $this->created_by_id,
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),

                'users' => FullUser::collection($this->whenLoaded('users')),

                'products' => FullProduct::collection($this->whenLoaded('products')),

                'sepas' => FullSepa::collection($this->whenLoaded('sepas')),

                //todo WM: nog wijzigen (zie bijv. FullIntake
                'documentCountNotOnPortal' => $this->documentsNotOnPortal()->count(),
                'documentCountOnPortal' => $this->documentsOnPortal()->count(),
                'relatedDocumentsNotOnPortal' => FullDocument::collection($this->whenLoaded('documentsNotOnPortal')),
                'relatedDocumentsOnPortal' => FullDocument::collection($this->whenLoaded('documentsOnPortal')),

                'totalOrders' => $this->total_orders,
                'totalOrdersConcepts' => $this->total_orders_concepts,
                'totalOrdersUpcoming' => $this->total_orders_upcoming,
                'totalOrdersToCreateInvoices' => $this->total_orders_to_create_invoices,
                'totalOrdersInProgressInvoices' => $this->total_orders_in_progress_invoices,
                'totalOrdersToSendInvoices' => $this->total_orders_to_send_invoices,
                'totalOrdersClosed' => $this->total_orders_closed,

                'totalInvoices' => $this->total_invoices,
                'totalInvoicesToSendCollection' => $this->total_invoices_to_send_collection,
                'totalInvoicesToSendTransfer' => $this->total_invoices_to_send_transfer,
                'totalInvoicesErrorSendingCollection' => $this->total_invoices_error_sending_collection,
                'totalInvoicesErrorSendingTransfer' => $this->total_invoices_error_sending_transfer,
                'totalInvoicesSent' => $this->total_invoices_sent,
                'totalInvoicesExported' => $this->total_invoices_exported,
                'totalInvoicesReminder' => $this->total_invoices_reminder,
                'totalInvoicesExhortation' => $this->total_invoices_exhortation,
                'totalInvoicesPaid' => $this->total_invoices_paid,
                'totalInvoicesIrrecoverable' => $this->total_invoices_irrecoverable,

                'totalInvoicesInProgress' => $this->total_invoices_in_progress,
                'totalInvoicesIsSending' => $this->total_invoices_is_sending,
                'totalInvoicesErrorMaking' => $this->total_invoices_error_making,
                'totalInvoicesIsResending' => $this->total_invoices_is_resending,

                'totalInvoicesIsExporting' => $this->total_invoices_is_exporting,
                'totalInvoicesErrorExporting' => $this->total_invoices_error_exporting,

                'totalPaymentInvoices' => $this->total_payment_invoices,
                'totalPaymentInvoicesConcepts' => $this->total_payment_invoices_concepts,
                'totalPaymentInvoicesSent' => $this->total_payment_invoices_sent,
                'totalPaymentInvoicesNotPaid' => $this->total_payment_invoices_not_paid,

                'canCreateInvoices' => $this->can_create_invoices,
                'canCreatePaymentInvoices' => $this->can_create_payment_invoices,
                'canCreateFinancialOverviewContacts' => $this->can_create_financial_overview_contacts,

                'usesTwinfield' => $this->uses_twinfield,
//                'twinfieldConnectionType' => $this->twinfield_connection_type,
//                'twinfieldConnectionTypeWithIdAndName' => FullEnumWithIdAndName::make($this->getTwinfieldConnectionTypeWithIdAndName()),
                'twinfieldHasRefreshToken' => (!empty($this->twinfield_refresh_token) ? 'Ja' : 'Nee'),
                'twinfieldRedirectUri' => $this->uses_twinfield ? (\Config::get('app.url_api') . '/twinfield') : '',
                'twinfieldUsername' => $this->twinfield_username,
//                'twinfieldPassword' => $this->twinfield_password,
                'twinfieldPassword' => '',
                'twinfieldClientId' => $this->twinfield_client_id,
//                'twinfieldClientSecret' => $this->twinfield_client_secret,
                'twinfieldClientSecret' => '',
                'twinfieldOrganizationCode' => $this->twinfield_organization_code,
                'twinfieldOfficeCode' => $this->twinfield_office_code,
                'twinfieldIsValid' => $this->twinfield_is_valid,
                'dateSyncTwinfieldContacts' => $this->date_sync_twinfield_contacts,
                'dateSyncTwinfieldPayments' => $this->date_sync_twinfield_payments,
                'dateSyncTwinfieldInvoices' => $this->date_sync_twinfield_invoices,
                'prefixInvoiceNumber' => $this->prefix_invoice_number,

                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,

                'mailboxId' => $this->mailbox_id,
                'mailboxEmail' => optional($this->mailbox)->email,

                'usesVat' => $this->uses_vat,

                'emailBccNotas' => $this->email_bcc_notas,
                'lastYearFinancialOverviewDefinitive' => $this->last_year_financial_overview_definitive,
                'pendingInvoicesPresent' => $this->pending_invoices_present,
                'oldestUnpaidInvoiceDate' => $this->oldest_unpaid_invoice_date,
                'oldestTwinfieldInvoiceDate' => $this->oldest_twinfield_invoice_date,
                'portalSettingsLayoutId' => $this->portal_settings_layout_id,
                'portalSettingsLayout' => $this->portalSettingsLayout,

                'usesMollie' => $this->uses_mollie,
                'mollieApiKey' => $this->mollie_api_key,
            ];
    }
}
