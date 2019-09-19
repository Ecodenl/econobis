<?php


namespace App\Http\Controllers\Portal\Contact;


use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Contact\Contact;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Eco\Project\Project;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ContactController extends ApiController
{
    public function update(Contact $contactOrgineel, Request $request)
    {
        if (!isset($request) || !isset($request->id) || !isset($request->typeId) ) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        // todo wellicht met binnenkomend contactOrigineel checken of contact ondertussen gewijzigd is?

        DB::transaction(function () use ($request) {

            $contact = Contact::find($request->id);
            if($request->typeId == 'person') {

                $contactData = $request->validate([
                    'iban' => '',
                    'ibanAttn' => '',
                    'didAgreeAvg' => 'boolean',
                ]);

                $contact->fill($this->arrayKeysToSnakeCase($contactData));
                $contact->save();

                $person = $contact->person;
                $personData = $request->person;
                if($person) {
                    $lnp = $person->last_name_prefix;
                    if(isset($personData['lastNamePrefixId']) && $personData['lastNamePrefixId']){
                        if($personData['lastNamePrefixId'] === 'null') {
                            $lnp = '';
                        }
                        else{
                            $lnp = LastNamePrefix::where('id', $personData['lastNamePrefixId'])->pluck('name')[0];
                        }
                    }
                    $personData['lastNamePrefix'] = $lnp;

                    unset($personData['lastNamePrefixId']);

                    $person->fill($this->arrayKeysToSnakeCase($personData));
                    $person->save();
                }

                if(isset($request['emailCorrespondence']) )
                {
                    $emailCorrespondenceData = $request['emailCorrespondence'];
                    if(isset($emailCorrespondenceData['id']))
                    {
                        $emailCorrespondence = $contact->emailAddresses->find($emailCorrespondenceData['id']);
                        if($emailCorrespondence) {
                            $emailCorrespondence->fill($this->arrayKeysToSnakeCase($emailCorrespondenceData));
                        }

                    }else{
                        $emailCorrespondenceData['typeId'] = EmailAddressType::ADMINISTRATION;
                        $emailCorrespondenceData['primary'] = true;

                        Validator::make($emailCorrespondenceData, [
                            'typeId' => new EnumExists(EmailAddressType::class),
                            'email' => '',
                            'primary' => 'boolean',
                        ]);

                        $emailCorrespondenceData = $this->sanitizeData($emailCorrespondenceData, [
                            'typeId' => 'nullable',
                            'primary' => 'boolean',
                        ]);
                        $emailCorrespondence = new EmailAddress($this->arrayKeysToSnakeCase($emailCorrespondenceData));
                        $emailCorrespondence->contact_id = $contact->id;
                    }
                    $emailCorrespondence->save();
                }

                if(isset($request['emailInvoice']) )
                {
                    $emailInvoiceData = $request['emailInvoice'];
                    if(isset($emailInvoiceData['id']))
                    {
                        $emailInvoice = $contact->emailAddresses->find($emailInvoiceData['id']);
                        if($emailInvoice) {
                            $emailInvoice->fill($this->arrayKeysToSnakeCase($emailInvoiceData));
                        }

                    }else{
                        $emailInvoiceData['typeId'] = EmailAddressType::INVOICE;
                        $emailInvoiceData['primary'] = false;

                        Validator::make($emailInvoiceData, [
                            'typeId' => new EnumExists(EmailAddressType::class),
                            'email' => '',
                            'primary' => 'boolean',
                        ]);

                        $emailInvoiceData = $this->sanitizeData($emailInvoiceData, [
                            'typeId' => 'nullable',
                            'primary' => 'boolean',
                        ]);

                        $emailInvoice = new EmailAddress($this->arrayKeysToSnakeCase($emailInvoiceData));
                        $emailInvoice->contact_id = $contact->id;
                    }
                    $emailInvoice->save();
                }

                if(isset($request['phoneNumberPrimary']) )
                {
                    $phoneNumberPrimaryData = $request['phoneNumberPrimary'];
                    if(isset($phoneNumberPrimaryData['id']))
                    {
                        $phoneNumberPrimary = $contact->phoneNumbers->find($phoneNumberPrimaryData['id']);
                        if($phoneNumberPrimary) {
                            $phoneNumberPrimary->fill($this->arrayKeysToSnakeCase($phoneNumberPrimaryData));
                        }

                    }else{
                        $phoneNumberPrimaryData['typeId'] = PhoneNumberType::HOME;
                        $phoneNumberPrimaryData['primary'] = true;

                        Validator::make($phoneNumberPrimaryData, [
                            'typeId' => new EnumExists(PhoneNumberType::class),
                            'number' => '',
                            'primary' => 'boolean',
                        ]);

                        $phoneNumberPrimaryData = $this->sanitizeData($phoneNumberPrimaryData, [
                            'typeId' => 'nullable',
                            'primary' => 'boolean',
                        ]);

                        $phoneNumberPrimary = new PhoneNumber($this->arrayKeysToSnakeCase($phoneNumberPrimaryData));
                        $phoneNumberPrimary->contact_id = $contact->id;
                    }
                    $phoneNumberPrimary->save();
                }
                if(isset($request['phoneNumberTwo']) )
                {
                    $phoneNumberTwoData = $request['phoneNumberTwo'];
                    if(isset($phoneNumberTwoData['id']))
                    {
                        $phoneNumberTwo = $contact->phoneNumbers->find($phoneNumberTwoData['id']);
                        if($phoneNumberTwo) {
                            $phoneNumberTwo->fill($this->arrayKeysToSnakeCase($phoneNumberTwoData));
                        }

                    }else{
                        $phoneNumberTwoData['typeId'] = PhoneNumberType::HOME;
                        $phoneNumberTwoData['primary'] = false;

                        Validator::make($phoneNumberTwoData, [
                            'typeId' => new EnumExists(PhoneNumberType::class),
                            'number' => '',
                            'primary' => 'boolean',
                        ]);

                        $phoneNumberTwoData = $this->sanitizeData($phoneNumberTwoData, [
                            'typeId' => 'nullable',
                            'primary' => 'boolean',
                        ]);

                        $phoneNumberTwo = new PhoneNumber($this->arrayKeysToSnakeCase($phoneNumberTwoData));
                        $phoneNumberTwo->contact_id = $contact->id;
                    }
                    $phoneNumberTwo->save();
                }

                if(isset($request['primaryAddress']) )
                {
                    $primaryAddressData = $request['primaryAddress'];
                    if(isset($primaryAddressData['id']))
                    {
                        $primaryAddress = $contact->addresses->find($primaryAddressData['id']);
                        if($primaryAddress) {
                            $primaryAddress->fill($this->arrayKeysToSnakeCase($primaryAddressData));
                        }

                    }else{
                        $primaryAddressData['typeId'] = 'invoice';
                        $primaryAddressData['primary'] = true;

                        Validator::make($primaryAddressData, [
                            'typeId' => new EnumExists(AddressType::class),
                            'number' => '',
                            'primary' => 'boolean',
                        ]);

                        $primaryAddressData = $this->sanitizeData($primaryAddressData, [
                            'typeId' => 'nullable',
                            'primary' => 'boolean',
                        ]);

                        $primaryAddress = new Address($this->arrayKeysToSnakeCase($primaryAddressData));
                        $primaryAddress->contact_id = $contact->id;
                    }
                    $primaryAddress->save();
                }

            }

        });

    }

    public function previewDocument(Contact $contact, Project $project, Request $request)
    {
        //load template parts todo Deze moeten we nog uit settings.json halen!!!
        $documentTemplate = DocumentTemplate::find(6);
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $portalUser = Auth::user();
        $portalUserContact = $portalUser ? $portalUser->contact : null;

        $documentBody = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $documentBody .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '','');
        } else {
            $documentBody .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }
        $documentBody .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'vertegenwoordigde', $portalUserContact);
        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'contact', $contact);
        $documentBody = TemplateVariableHelper::replaceTemplateVariables($documentBody,'project', $project);
        $documentBody = TemplateVariableHelper::stripRemainingVariableTags($documentBody);

        return $documentBody;
    }


}