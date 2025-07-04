<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\Portal\PortalUser;
use App\Eco\Title\Title;
use App\Eco\User\User;
use App\Eco\PortalSettings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Portal\Templates\PortalMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class NewAccountController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function createNewAccount(Request $request)
    {
        $this->validateEmail($request);

        // Hier gekomen, dan zijn de validaties ok.

        $existingContactIds = EmailAddress::where('email', $request->input('email'))
            ->whereHas('contact', function($query) use($request) {
                $query->whereHas('person', function($query) use($request) {
                    $query->where('first_name', $request->input('personFirstName'));
                });
            })
            ->whereHas('contact', function($query) use($request) {
                $query->whereHas('person', function($query) use($request) {
                    $query->where('last_name', $request->input('personLastName'));
                });
            })
            ->where('primary', true)
            ->pluck('contact_id')->toArray();

        $contact = null;
        if(!empty($existingContactIds)){
            $contact = Contact::whereIn('id', $existingContactIds)
                ->orderBy('created_at', 'asc')->first();
        }


        $url = config('services.google.re_captcha_server_side_url');
        $data = [
            'secret' => config('services.google.re_captcha_server_side_key'),
            'response' => $request->reCaptchaToken
        ];

        $options = [
          'http' => [
              'header' => "Content-type: application/x-www-form-urlencoded\r\n",
              'method' => "POST",
              'content' => http_build_query($data),
          ]
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $resultJson = json_decode($result);

        if($resultJson->success) {
            // Voor aanmaak van Contact wordt created by and updated by via ContactObserver altijd bepaald obv Auth::id
            $responsibleUserId = PortalSettings::first()?->responsible_user_id;
            if (!$responsibleUserId) {
                abort(501, 'Er is helaas een fout opgetreden (5).');
            }
            $emailTemplateNewAccountId = PortalSettings::first()?->email_template_new_account_id;
            if (!$emailTemplateNewAccountId) {
                abort(501, 'Er is helaas een fout opgetreden (6).');
            }

            $responsibleUser = User::find($responsibleUserId);
            if (!$responsibleUser) {
                abort(501, 'Er is helaas een fout opgetreden (7).');
            }

            $responsibleUser->occupation = '@portal-update@';
            Auth::setUser($responsibleUser);

            DB::transaction(function () use ($request, $contact, $responsibleUserId, $emailTemplateNewAccountId) {

                $data = $this->getDataFromRequest($request);

                if(!$contact){
                    $contact = $this->addContact($data['contact']);
                }
                if ($contact) {
                    $contact = Contact::find($contact->id);
                    $organisationName = null;
                    if ($data['contact']['organisation_name']) {
                        $organisationName = $data['contact']['organisation_name'];
                    }
                    $this->sendNewAccountMail($contact, $organisationName, $responsibleUserId, $emailTemplateNewAccountId);
                } else {
                    abort(501, 'Er is helaas een fout opgetreden (7).');
                }
            });


        } else {
            abort(501, 'Er is helaas een fout opgetreden met de CAPTCHA verificatie.');
        }
    }

    /**
     * Validate the email for the given request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateEmail(Request $request) {

        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->count() !== 0) {
            abort(404, 'Er bestaat al een account met het e-mailadres dat je hebt ingevuld. Je kunt met dit e-mailadres inloggen als bestaand contact. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres.');
        }

        $emailAddressCount = EmailAddress::where('email', $request->input('email'))
            ->whereHas('contact', function($query) use($request) {
                $query->whereHas('person', function($query) use($request) {
                    $query->where('first_name', $request->input('personFirstName'));
                });
            })
            ->whereHas('contact', function($query) use($request) {
                $query->whereHas('person', function($query) use($request) {
                    $query->where('last_name', $request->input('personLastName'));
                });
            })
            ->whereHas('contact', function($query) use($request) {
                $query->whereNull('portal_registration_code');
            })
            ->where('primary', true)
            ->count();

        if($emailAddressCount !== 0) {
            abort(405, 'Er bestaat al een contact met het e-mailadres, voornaam en achternaam dat je hebt ingevuld. 
                   Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres, voornaam of achternaam.'
            );
        }
    }

    protected function getDataFromRequest(Request $request)
    {
        $mapping = [
            'contact' => [
                // Contact
                'contactType' => 'type_id',
                'personTitleId' => 'title_id',
                'personFirstName' => 'first_name',
                'personLastNamePrefix' => 'last_name_prefix',
                'personLastNamePrefixId' => 'last_name_prefix_id',
                'personLastName' => 'last_name',
                // Organisation
                'organisationName' => 'organisation_name',
                // ContactEmail
                'email' => 'email_address',
            ],
        ];
        $data = [];
        foreach ($mapping as $groupname => $fields) {
            foreach ($fields as $inputName => $outputName) {
                // Alle input standaard waarde '' meegeven.
                // Op deze manier hoeven we later alleen op lege string te checken...
                // ... ipv bijv. if(!isset() || is_null($var) || $var = '')
                $data[$groupname][$outputName] = trim($request->get($inputName, ''));
            }
        }

        return $data;
    }

    protected function addContact(array $data)
    {
        // Functie voor afvangen ongeldige waarden in title_id
        $titleValidator = function ($titleId) {
            if ($titleId && $titleId != '') {
                $title = Title::find($titleId);
                return $title->id;
            }
            return null;
        };

        if ($data['organisation_name']) {
            $contactOrganisation = Contact::create([
                'type_id' => ContactType::ORGANISATION,
                'status_id' => 'portal',
                'created_with' => 'portal',
            ]);

            $organisation = Organisation::create([
                'contact_id' => $contactOrganisation->id,
                'name' => $data['organisation_name'],
                'statutory_name' => '',
            ]);

            $contactPerson = Contact::create([
                'type_id' => ContactType::PERSON,
                'status_id' => 'portal',
                'created_with' => 'portal',
            ]);

            // Validatie op title_id

            $lnp = null;
            if(isset($data['last_name_prefix_id']) && $data['last_name_prefix_id']){
                $lnp = LastNamePrefix::where('id', $data['last_name_prefix_id'])->pluck('name')[0];
            }
            $person = Person::create([
                'contact_id' => $contactPerson->id,
                'title_id' => $titleValidator($data['title_id']),
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'last_name_prefix' => $lnp,
                'organisation_id' => $organisation->id,
            ]);

            OccupationContact::create([
                'occupation_id' => 14, // Relatie type "medewerker"
                'primary_contact_id' => $organisation->contact_id,
                'contact_id' => $person->contact_id,
                'primary' => true,
            ]);

            // Overige gegevens aan organisation hangen
            $this->addEmailToContact($data, $contactPerson);

            return $contactPerson;
        }
        $contactResponsibleOwnerUserId = PortalSettings::first()?->contact_responsible_owner_user_id;

        $contact = Contact::create([
            'type_id' => ContactType::PERSON,
            'status_id' => 'portal',
            'created_with' => 'portal',
            'owner_id' => $contactResponsibleOwnerUserId,
        ]);

        $lnp = null;
        if(isset($data['last_name_prefix_id']) && $data['last_name_prefix_id']){
            $lnp = LastNamePrefix::where('id', $data['last_name_prefix_id'])->pluck('name')[0];
        }

        $lastName = $data['last_name'];
        if (!$lastName) {
            $emailParts = explode('@', $data['email_address']);
            $lastName = $emailParts[0];
        }
        $person = Person::create([
            'contact_id' => $contact->id,
            'title_id' => $titleValidator($data['title_id']),
            'first_name' => $data['first_name'],
            'last_name' => $lastName,
            'last_name_prefix' => $lnp,
        ]);

        // Overige gegevens aan persoon hangen
        $this->addEmailToContact($data, $contact);

        return $contact;
    }

    protected function addEmailToContact(array $data, $contact)
    {
        if ($data['email_address']) {
            // Er is voldoende email data meegegeven om een emailadres te kunnen maken
            if (!$contact->emailAddresses()
                ->where('email', $data['email_address'])
                ->exists()) {
                // Emailadres met deze gegevens bestaat nog niet, eailadres toevoegen met type "prive"
                $emailaddress = EmailAddress::create([
                    'contact_id' => $contact->id,
                    'type_id' => 'home',
                    'email' => $data['email_address'],
                ]);
            }
        }
    }

    protected function sendNewAccountMail(Contact $contact, $organisationName, $responsibleUserId, $emailTemplateNewAccountId)
    {
        if (!$contact->primaryEmailAddress) {
            return false;
        }
        $mail = Mail::to($contact->primaryEmailAddress);

        $emailTemplate = EmailTemplate::find($emailTemplateNewAccountId);
        if (!$emailTemplate) {
            return false;
        }else{
            $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bevestiging nieuw account';
            $htmlBody = $emailTemplate->html_body;
        }

        $portalName = PortalSettings::first()?->portal_name;
        $cooperativeName = PortalSettings::first()?->cooperative_name;
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
        $subject = str_replace('{contactpersoon}', $contact->full_name, $subject);
        $htmlBody = str_replace('{contactpersoon}', $contact->full_name, $htmlBody);
        if($organisationName){
            $htmlBody = str_replace('{organisatie_naam}', $organisationName, $htmlBody);
        }

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $contact);
        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBody,'contacten_portal' );
        $htmlBody = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBody,'cooperatie' );

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new PortalMail($mail, $htmlBody, $emailTemplate->default_attachment_document_id));

        return true;
    }

}
