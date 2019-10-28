<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\Portal\PortalUser;
use App\Eco\Title\Title;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Portal\Templates\PortalMail;
use Illuminate\Http\Request;
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
            // Voor aanmaak van Participant Mutations wordt created by and updated by via ParticipantMutationObserver altijd bepaald obv Auth::id
            // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
            $responsibleUserId = PortalSettings::get('responsibleUserId');
            if (!$responsibleUserId) {
                abort(501, 'Er is helaas een fout opgetreden (5).');
            }
            $emailTemplateNewAccountId = PortalSettings::get('emailTemplateNewAccountId');
            if (!$emailTemplateNewAccountId) {
                abort(501, 'Er is helaas een fout opgetreden (6).');
            }

            DB::transaction(function () use ($request, $responsibleUserId, $emailTemplateNewAccountId) {

                $data = $this->getDataFromRequest($request);
                $contact = $this->addContact($data['contact']);
                if ($contact) {
                    $this->sendNewAccountMail($contact, $responsibleUserId, $emailTemplateNewAccountId);
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
    protected function validateEmail(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->count() !== 0){
            abort(404, 'Er bestaat al een account met het e-mailadres dat je hebt ingevuld. Je kunt met dit e-mailadres inloggen als bestaand contact. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres.');
        }

        if(EmailAddress::where('email', $request->input('email'))
                ->whereHas('contact', function($query) use($request){
                    $query->whereHas('person', function($query) use($request){
                        $query->where('first_name', $request->input('personFirstName'));})
                    ;})
                ->whereHas('contact', function($query) use($request){
                    $query->whereHas('person', function($query) use($request){
                        $query->where('last_name', $request->input('personLastName'));})
                    ;})
                ->where('primary', true)->count() !== 0)
        {
            abort(405, 'Er bestaat al een contact met het e-mailadres, voornaam en achternaam dat je hebt ingevuld. Wil je een nieuw account aanmaken? Gebruik dan alsjeblieft een ander e-mailadres, voornaam of achternaam.');
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
                // ... ipv bijv. if(!array_key_exists() || is_null($var) || $var = '')
                $data[$groupname][$outputName] = trim($request->get($inputName, ''));
            }
        }

        return $data;
    }

    protected function addContact(array $data)
    {
        // Functie voor afvangen ongeldige waarden in title_id
        $titleValidator = function ($titleId) {
            if ($titleId != '') {
                $title = Title::find($titleId);
//                if (!$title) $this->error('Ongeldige waarde in titel_id');
                return $title->id;
            }
            return null;
        };

        if ($data['organisation_name']) {
            $contactOrganisation = Contact::create([
                'type_id' => ContactType::ORGANISATION,
                'status_id' => 'none',
            ]);

            $organisation = Organisation::create([
                'contact_id' => $contactOrganisation->id,
                'name' => $data['organisation_name'],
            ]);

            $contactPerson = Contact::create([
                'type_id' => ContactType::PERSON,
                'status_id' => 'none',
            ]);

            // Validatie op title_id

            $person = Person::create([
                'contact_id' => $contactPerson->id,
                'title_id' => $titleValidator($data['title_id']),
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'last_name_prefix' => $data['last_name_prefix'],
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

        $contact = Contact::create([
            'type_id' => ContactType::PERSON,
            'status_id' => 'none',
        ]);

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
            'last_name_prefix' => $data['last_name_prefix'],
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

    protected function sendNewAccountMail(Contact $contact, $responsibleUserId, $emailTemplateNewAccountId)
    {

        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();

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

//        $user = Auth::user();
//        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
//            'ik', $user);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,
            'contact', $contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';

        $subject = str_replace('{contactpersoon}', $contact->full_name, $subject);
        $htmlBody = str_replace('{contactpersoon}', $contact->full_name, $htmlBody);

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new PortalMail($mail, $htmlBody));


        return true;
    }

}
