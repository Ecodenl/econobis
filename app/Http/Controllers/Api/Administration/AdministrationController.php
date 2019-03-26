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
use App\Helpers\Twinfield\TwinfieldHelper;
use App\Helpers\Twinfield\TwinfieldInvoiceHelper;
use App\Helpers\Twinfield\TwinfieldSalesTransactionHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Administration\Grid\RequestQuery;
use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Administration\GridAdministration;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdministrationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $administrations = $requestQuery->get();

        $administrations->load(['country']);

        return GridAdministration::collection($administrations)
            ->additional(['meta' => [
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
            'sepas',
        ]);

        return FullAdministration::make($administration);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', Administration::class);

        $data = $input
            ->string('name')->validate('required')->next()
            ->integer('administrationNumber')->whenMissing(null)->onEmpty(null)->alias('administration_number')->next()
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
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->integer('mailboxId')->validate('nullable|exists:mailboxes,id')->onEmpty(null)->whenMissing(null)->alias('mailbox_id')->next()
            ->string('twinfieldUsername')->whenMissing(null)->onEmpty(null)->alias('twinfield_username')->next()
            ->string('twinfieldPassword')->whenMissing(null)->onEmpty(null)->alias('twinfield_password')->next()
            ->string('twinfieldOrganizationCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_organization_code')->next()
            ->string('twinfieldOfficeCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_office_code')->next()
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

        $administration = new Administration($data);

        if($administration->uses_twinfield) {
            $twinfieldHelper = new TwinfieldHelper($administration);
            $administration->twinfield_is_valid = $twinfieldHelper->testConnection();
        }
        else{
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
            ->integer('administrationNumber')->whenMissing(null)->onEmpty(null)->alias('administration_number')->next()
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
            ->integer('emailTemplateIdCollection')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_collection')->next()
            ->integer('emailTemplateIdTransfer')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_transfer')->next()
            ->integer('emailTemplateReminderId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_reminder_id')->next()
            ->integer('emailTemplateExhortationId')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_exhortation_id')->next()
            ->integer('mailboxId')->validate('nullable|exists:mailboxes,id')->onEmpty(null)->whenMissing(null)->alias('mailbox_id')->next()
            ->string('twinfieldUsername')->whenMissing(null)->onEmpty(null)->alias('twinfield_username')->next()
            ->string('twinfieldPassword')->whenMissing(null)->onEmpty(null)->alias('twinfield_password')->next()
            ->string('twinfieldOrganizationCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_organization_code')->next()
            ->string('twinfieldOfficeCode')->whenMissing(null)->onEmpty(null)->alias('twinfield_office_code')->next()
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

        $administration->fill($data);

        if($administration->uses_twinfield) {
            $twinfieldHelper = new TwinfieldHelper($administration);
            $administration->twinfield_is_valid = $twinfieldHelper->testConnection();
        }
        else{
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
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'logos';

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
        $administration->logo_name = $attachment->getClientOriginalName();

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

    public function downloadSepa(Sepa $sepa){
        $filePath = Storage::disk('administrations')->getDriver()
            ->getAdapter()->applyPathPrefix($sepa->filename);
        header('X-Filename:' . $sepa->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $sepa->name, ['Content-Type: application/xml']);
    }

    public function deleteSepa(Sepa $sepa){
        //soft delete
        $sepa->delete();
    }

//    public function syncSentInvoicesToTwinfield(Administration $administration){
//        $twinfieldInvoiceHelper = new TwinfieldInvoiceHelper($administration);
//        return $twinfieldInvoiceHelper->createAllInvoices();
//    }
    public function syncSentInvoicesToTwinfield(Administration $administration){
        $twinfieldInvoiceHelper = new TwinfieldSalesTransactionHelper($administration);
        return $twinfieldInvoiceHelper->createAllSalesTransactions();
    }

    public function syncSentInvoicesFromTwinfield(Administration $administration){
        $twinfieldInvoiceHelper = new TwinfieldInvoiceHelper($administration);
        return $twinfieldInvoiceHelper->processPaidInvoices();
    }

}