<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Administration;


use App\Eco\Administration\Administration;
use App\Eco\Administration\Sepa;
use App\Eco\User\User;
use App\Helpers\Delete\Models\DeleteAdministration;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Helpers\Twinfield\TwinfieldHelper;
use App\Helpers\Twinfield\TwinfieldInvoicePaymentHelper;
use App\Helpers\Twinfield\TwinfieldSalesTransactionHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Administration\Grid\RequestQuery;
use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Administration\GridAdministration;
use App\Http\Resources\Administration\TwinfieldInfoAdministration;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\UserPeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdministrationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Administration::class);

        $administrations = $requestQuery->get();

        $administrations->load(['country']);

        return GridAdministration::collection($administrations)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function show(Administration $administration)
    {
        $administration->load([
            'country',
            'users',
            'createdBy',
            'emailTemplateCollection',
            'emailTemplateTransfer',
            'emailTemplateReminder',
            'emailTemplateExhortation',
            'emailTemplateFinancialOverview',
            'portalSettingsLayout',
            'sepas',
            'documentsNotOnPortal',
            'documentsOnPortal',
        ]);

        return FullAdministration::make($administration);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', Administration::class);

        $data = $input
            ->string('name')->validate('required')->next()
            ->string('administrationCode')->whenMissing(null)->onEmpty(null)->alias('administration_code')->next()
            ->string('address')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('city')->next()
            ->string('countryId')->validate('nullable|exists:countries,id')->whenMissing(null)->onEmpty(null)->alias('country_id')->next()
            ->integer('kvkNumber')->whenMissing(null)->onEmpty(null)->alias('kvk_number')->next()
            ->string('btwNumber')->whenMissing(null)->onEmpty(null)->alias('btw_number')->next()
            ->string('IBAN')->whenMissing('')->next()
            ->string('ibanAttn')->whenMissing(null)->onEmpty(null)->alias('iban_attn')->next()
            ->string('email')->whenMissing(null)->onEmpty(null)->next()
            ->string('website')->whenMissing(null)->onEmpty(null)->next()
            ->string('bic')->whenMissing(null)->onEmpty(null)->next()
            ->string('sepaContractName')->whenMissing(null)->onEmpty(null)->alias('sepa_contract_name')->next()
            ->string('sepaCreditorId')->whenMissing(null)->onEmpty(null)->alias('sepa_creditor_id')->next()
            ->string('rsinNumber')->whenMissing(null)->onEmpty(null)->alias('rsin_number')->next()
            ->integer('defaultPaymentTerm')->whenMissing(null)->onEmpty(null)->alias('default_payment_term')->next()
            ->integer('numberOfInvoiceReminders')->whenMissing(3)->onEmpty(3)->alias('number_of_invoice_reminders')->next()
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->integer('emailTemplateFinancialOverviewId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_financial_overview_id')->next()
            ->integer('mailboxId')->validate('nullable|exists:mailboxes,id')->onEmpty(null)->whenMissing(null)->alias('mailbox_id')->next()
            ->string('twinfieldConnectionType')->whenMissing(null)->onEmpty(null)->alias('twinfield_connection_type')->next()
            ->string('twinfieldRefreshToken')->whenMissing(null)->onEmpty(null)->alias('twinfield_refresh_token')->next()
            ->string('twinfieldUsername')->whenMissing(null)->onEmpty(null)->alias('twinfield_username')->next()
            ->string('twinfieldPassword')->whenMissing(null)->onEmpty(null)->alias('twinfield_password')->next()
            ->string('twinfieldClientId')->whenMissing(null)->onEmpty(null)->alias('twinfield_client_id')->next()
            ->string('twinfieldClientSecret')->whenMissing(null)->onEmpty(null)->alias('twinfield_client_secret')->next()
            ->string('twinfieldOrganizationCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_organization_code')->next()
            ->string('twinfieldOfficeCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_office_code')->next()
            ->string('dateSyncTwinfieldContacts')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_contacts')->next()
            ->string('dateSyncTwinfieldPayments')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_payments')->next()
            ->string('dateSyncTwinfieldInvoices')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_invoices')->next()
            ->string('prefixInvoiceNumber')->whenMissing(null)->onEmpty(null)->alias('prefix_invoice_number')->next()
            ->string('emailBccNotas')->whenMissing(null)->onEmpty(null)->alias('email_bcc_notas')->next()
            ->integer('portalSettingsLayoutId')->validate('nullable|exists:portal_settings_layouts,id')->onEmpty(null)->whenMissing(null)->alias('portal_settings_layout_id')->next()
            ->string('logoName')->whenMissing(null)->onEmpty(null)->alias('logo_name')->next()
            ->get();

        //bool als string? waarschijnlijk door formdata
        $usesTwinfield = $request->input('usesTwinfield');

        if($usesTwinfield == 'false' || $usesTwinfield == '0'){
            $usesTwinfield = false;
        }
        if($usesTwinfield == 'true' || $usesTwinfield == '1'){
            $usesTwinfield = true;
        }

        $data['uses_twinfield'] = $usesTwinfield;

        //bool als string? waarschijnlijk door formdata
        $usesVat = $request->input('usesVat');

        if($usesVat == 'false' || $usesVat == '0'){
            $usesVat = false;
        }
        if($usesVat == 'true' || $usesVat == '1'){
            $usesVat = true;
        }

        $data['uses_vat'] = $usesVat;

        $data['uses_mollie'] = false;
        $data['mollie_api_key'] = '';
        if(\Auth::user()->email === 'support@econobis.nl' || \Auth::user()->email === 'software@xaris.nl'){
            $data['uses_mollie'] = (bool) $request->input('usesMollie') && $request->input('usesMollie') !== 'false';
            $data['mollie_api_key'] = $request->input('mollieApiKey');
        }

        $administration = new Administration($data);

        if($administration->uses_twinfield) {
            $twinfieldHelper = new TwinfieldHelper($administration);
            try {
                $administration->twinfield_is_valid = $twinfieldHelper->testConnection();
            }
            catch(\Exception $e){
                Log::error($e->getMessage());
                $administration->twinfield_is_valid = 0;
            }
        }else{
            $administration->twinfield_is_valid = 0;
        }

        $administration->save();

        $this->checkStorageDir($administration->id);

        //get attachments
        $logo = $request->file('attachment')
            ? $request->file('attachment') : false;

        if($logo){
            $this->storeLogo($logo, $administration);
        }

        return $this->show($administration);
    }


    public function update(RequestInput $input, Request $request, Administration $administration)
    {
        $this->authorize('manage', Administration::class);
        $data = $input
            ->string('name')->validate('required')->next()
            ->string('administrationCode')->whenMissing(null)->onEmpty(null)->alias('administration_code')->next()
            ->string('address')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('city')->next()
            ->string('countryId')->validate('nullable|exists:countries,id')->whenMissing(null)->onEmpty(null)->alias('country_id')->next()
            ->integer('kvkNumber')->whenMissing(null)->onEmpty(null)->alias('kvk_number')->next()
            ->string('btwNumber')->whenMissing(null)->onEmpty(null)->alias('btw_number')->next()
            ->string('IBAN')->whenMissing('')->next()
            ->string('ibanAttn')->whenMissing(null)->onEmpty(null)->alias('iban_attn')->next()
            ->string('email')->whenMissing(null)->onEmpty(null)->next()
            ->string('website')->whenMissing(null)->onEmpty(null)->next()
            ->string('bic')->whenMissing(null)->onEmpty(null)->next()
            ->string('sepaContractName')->whenMissing(null)->onEmpty(null)->alias('sepa_contract_name')->next()
            ->string('sepaCreditorId')->whenMissing(null)->onEmpty(null)->alias('sepa_creditor_id')->next()
            ->string('rsinNumber')->whenMissing(null)->onEmpty(null)->alias('rsin_number')->next()
            ->integer('defaultPaymentTerm')->whenMissing(null)->onEmpty(null)->alias('default_payment_term')->next()
            ->integer('numberOfInvoiceReminders')->whenMissing(3)->onEmpty(3)->alias('number_of_invoice_reminders')->next()
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->integer('emailTemplateFinancialOverviewId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_financial_overview_id')->next()
            ->integer('mailboxId')->validate('nullable|exists:mailboxes,id')->onEmpty(null)->whenMissing(null)->alias('mailbox_id')->next()
            ->string('twinfieldConnectionType')->whenMissing(null)->onEmpty(null)->alias('twinfield_connection_type')->next()
            ->string('twinfieldUsername')->whenMissing(null)->onEmpty(null)->alias('twinfield_username')->next()
            ->string('twinfieldPassword')->whenMissing($administration->twinfield_password)->onEmpty($administration->twinfield_password)->alias('twinfield_password')->next()
            ->string('twinfieldClientId')->whenMissing(null)->onEmpty(null)->alias('twinfield_client_id')->next()
            ->string('twinfieldClientSecret')->whenMissing($administration->twinfield_client_secret)->onEmpty($administration->twinfield_client_secret)->alias('twinfield_client_secret')->next()
            ->string('twinfieldOrganizationCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_organization_code')->next()
            ->string('twinfieldOfficeCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_office_code')->next()
            ->string('dateSyncTwinfieldContacts')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_contacts')->next()
            ->string('dateSyncTwinfieldPayments')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_payments')->next()
            ->string('dateSyncTwinfieldInvoices')->whenMissing(null)->onEmpty(null)->alias('date_sync_twinfield_invoices')->next()
            ->string('prefixInvoiceNumber')->whenMissing(null)->onEmpty(null)->alias('prefix_invoice_number')->next()
            ->string('emailBccNotas')->whenMissing(null)->onEmpty(null)->alias('email_bcc_notas')->next()
            ->integer('portalSettingsLayoutId')->validate('nullable|exists:portal_settings_layouts,id')->onEmpty(null)->whenMissing(null)->alias('portal_settings_layout_id')->next()
            ->string('logoName')->whenMissing(null)->onEmpty(null)->alias('logo_name')->next()
            ->get();

        //bool als string? waarschijnlijk door formdata
        $usesTwinfield = $request->input('usesTwinfield');

        if($usesTwinfield == 'false' || $usesTwinfield == '0'){
            $usesTwinfield = false;
        }
        if($usesTwinfield == 'true' || $usesTwinfield == '1'){
            $usesTwinfield = true;
        }

        $data['uses_twinfield'] = $usesTwinfield;

        //bool als string? waarschijnlijk door formdata
        $usesVat = $request->input('usesVat');

        if($usesVat == 'false' || $usesVat == '0'){
            $usesVat = false;
        }
        if($usesVat == 'true' || $usesVat == '1'){
            $usesVat = true;
        }

        $data['uses_vat'] = $usesVat;

        if(\Auth::user()->email === 'support@econobis.nl' || \Auth::user()->email === 'software@xaris.nl'){
            $data['uses_mollie'] = (bool) $request->input('usesMollie') && $request->input('usesMollie') !== 'false';
            $data['mollie_api_key'] = $request->input('mollieApiKey');
        }

        $administration->fill($data);

        if($administration->uses_twinfield) {
            $twinfieldHelper = new TwinfieldHelper($administration);
            try {
                $administration->twinfield_is_valid = $twinfieldHelper->testConnection();
            }
            catch(\Exception $e){
                Log::error($e->getMessage());
                $administration->twinfield_is_valid = 0;
            }
        }else{
            $administration->twinfield_is_valid = 0;
            $administration->twinfield_refresh_token = null;
        }
        $administration->save();

        $this->checkStorageDir($administration->id);

        //get attachments
        $logo = $request->file('attachment')
            ? $request->file('attachment') : false;

        if($logo){
            $this->storeLogo($logo, $administration);
        }

        return $this->show($administration);
    }

    public function destroy(Administration $administration)
    {
        $this->authorize('manage', Administration::class);

        try {
            DB::beginTransaction();

            $deleteAdministration = new DeleteAdministration($administration);
            $result = $deleteAdministration->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }


    public function checkStorageDir($administration_id){
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->path(DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'logos');

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    public function storeLogo($attachment, $administration)
    {
        //store logo
        if (!$attachment->isValid()) {
            abort('422', 'Error uploading file');
        }

        $filename = $attachment->store('administration_' . $administration->id
            . DIRECTORY_SEPARATOR . 'logos', 'administrations');

        $administration->logo_filename = $filename;

        $administration->save();
    }

    public function attachUser(Administration $administration, User $user)
    {
        $this->authorize('manage', Administration::class);

        $administration->users()->attach($user->id);

        return UserPeek::make($user);
    }

    public function detachUser(Administration $administration, User $user)
    {
        $this->authorize('manage', Administration::class);

        $administration->users()->detach($user->id);
    }

    public function peek()
    {
        return AdministrationPeek::collection(Administration::orderBy('id')->get());
    }

    public function twinfieldInfoAdministrations()
    {
        return TwinfieldInfoAdministration::collection(Administration::orderBy('id')->get());
    }

    public function downloadSepa(Sepa $sepa){
        $filePath = Storage::disk('administrations')
            ->path($sepa->filename);
        header('X-Filename:' . $sepa->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $sepa->name, ['Content-Type: application/xml']);
    }

    public function deleteSepa(Sepa $sepa){
        //soft delete
        $sepa->delete();
    }

    public function syncSentContactsToTwinfield(Administration $administration){
        $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
        return $twinfieldCustomerHelper->processTwinfieldCustomer();
    }

    public function syncSentInvoicesToTwinfield(Administration $administration){
        $twinfieldSalesTransactionHelper = new TwinfieldSalesTransactionHelper($administration);
        return $twinfieldSalesTransactionHelper->procesTwinfieldSalesTransaction();
    }

    public function syncSentInvoicesFromTwinfield(RequestInput $requestInput, Administration $administration){

        $inputData = $requestInput
            ->string('fromDateSent')->onEmpty(null)->next()
            ->get();
        $twinfieldInvoicePaymentHelper = new TwinfieldInvoicePaymentHelper($administration, $inputData['fromDateSent']);
        return $twinfieldInvoicePaymentHelper->processTwinfieldInvoicePayment();
    }

    public function getLogoDetails(Administration $administration)
    {
        $logoFilenameSrc = '';
        if ($administration->logo_filename) {
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $administration->logo_filename);
            $logo = file_get_contents($path);
            $logoFilenameSrc = 'data:' . mime_content_type($path)
                . ';charset=binary;base64,' . base64_encode($logo);
            $logoFilenameSrc = str_replace(" ", "", $logoFilenameSrc);
        }

        return ['logoFilenameSrc' => $logoFilenameSrc];
    }

    public function getTotalsInfoAdministration(Administration $administration)
    {
        $totalsInfo = [
            'totalOrders' => $administration->total_orders,
            'totalOrdersConcepts' => $administration->total_orders_concepts,
            'totalOrdersUpcoming' => $administration->total_orders_upcoming,
            'totalOrdersToCreateInvoices' => $administration->total_orders_to_create_invoices,
            'totalOrdersInProgressInvoices' => $administration->total_orders_in_progress_invoices,
            'totalOrdersToSendInvoices' => $administration->total_orders_to_send_invoices,
            'totalOrdersClosed' => $administration->total_orders_closed,

            'totalInvoices' => $administration->total_invoices,
            'totalInvoicesToSendCollection' => $administration->total_invoices_to_send_collection,
            'totalInvoicesToSendTransfer' => $administration->total_invoices_to_send_transfer,
            'totalInvoicesErrorSendingCollection' => $administration->total_invoices_error_sending_collection,
            'totalInvoicesErrorSendingTransfer' => $administration->total_invoices_error_sending_transfer,
            'totalInvoicesSent' => $administration->total_invoices_sent,
            'totalInvoicesExported' => $administration->total_invoices_exported,
            'totalInvoicesReminder' => $administration->total_invoices_reminder,
            'totalInvoicesExhortation' => $administration->total_invoices_exhortation,
            'totalInvoicesPaid' => $administration->total_invoices_paid,
            'totalInvoicesIrrecoverable' => $administration->total_invoices_irrecoverable,

            'totalInvoicesInProgress' => $administration->total_invoices_in_progress,
            'totalInvoicesIsSending' => $administration->total_invoices_is_sending,
            'totalInvoicesErrorMaking' => $administration->total_invoices_error_making,
            'totalInvoicesIsResending' => $administration->total_invoices_is_resending,

            'totalPaymentInvoices' => $administration->total_payment_invoices,
            'totalPaymentInvoicesConcepts' => $administration->total_payment_invoices_concepts,
            'totalPaymentInvoicesSent' => $administration->total_payment_invoices_sent,
            'totalPaymentInvoicesNotPaid' => $administration->total_payment_invoices_not_paid,
        ];

        return $totalsInfo;
    }

}