<?php


namespace App\Helpers\Hoomdossier;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Hoomdossier\Templates\HoomdossierMail;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class HoomdossierHelper
{
    private $contact;
    private $cooperation;

    public function __construct(Contact $contact)
    {
        $this->contact= $contact;
        $this->cooperation = Cooperation::first();
    }

    public function make() {
        // Check if all necessary fields are filled
        $this->validateRequiredFields();

        // Send to hoomdossier url
        $hoomAccountId = $this->sendToHoomdossier();

        // When success save hoomdossier id
        $this->contact->hoom_account_id = $hoomAccountId;
        $this->contact->save();

        // Add contact to contactGroup 'Hoom'
        if($this->cooperation->hoom_group_id) {
            $hoomdossierContactGroup = ContactGroup::find($this->cooperation->hoom_group_id);

            $hoomdossierContactGroup->contacts()->attach($this->contact);
        }

        // Send email to contact
        if($this->cooperation->hoom_email_template_id) {
            $this->sendMail();
        }

        // Return hoomdossier id
        return $hoomAccountId;
    }

    private function validateRequiredFields()
    {
        $errors = [];

        if(!$this->contact->primaryEmailAddress) {
            $errors[] = 'Primair mailadres ontbreekt';
        }

        if($this->contact->type_id == 'person') {
            if(!$this->contact->person->first_name) {
                $errors[] = 'Voornaam ontbreekt';
            }

            if(!$this->contact->person->last_name) {
                $errors[] = 'Achternaam ontbreekt';
            }
        }

        if(!$this->contact->primaryAddress) {
            $errors[] = 'Primair adres ontbreekt';
        }

        if(count($errors)) throw ValidationException::withMessages($errors);

        return true;
    }

    private function sendToHoomdossier()
    {
        // If hoom link contains .test then return fake id
        if(strpos ($this->cooperation->hoom_link, '.test')) return rand(1,3000);

        if($this->contact->person->last_name_prefix != '') {
            $lastName = $this->contact->person->last_name_prefix . ' ' . $this->contact->person->last_name;
        } else {
            $lastName = $this->contact->person->last_name;
        }

        $payload = [
            'key' => $this->cooperation->hoom_key,
            'contact_id' => $this->contact->id,
            'email' => $this->contact->primaryEmailAddress->email,
            'first_name' => $this->contact->person->first_name,
            'last_name' => $lastName,
            'postal_code' => $this->contact->primaryAddress->postal_code,
            'number' => $this->contact->primaryAddress->number,
            'house_number_extension' => $this->contact->primaryAddress->addition,
            'street' => $this->contact->primaryAddress->street,
            'city' => $this->contact->primaryAddress->city,
            'phone_number' => $this->contact->primaryphoneNumber ? $this->contact->primaryphoneNumber->number : '',
        ];

        $client = new Client;

        try {
            $response = $client->post($this->cooperation->hoom_link, $payload);
            return $response->getBody();
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                abort($e->getCode(), Psr7\str($e->getResponse()));
            } else {
                abort($e->getCode(), 'Er is iets misgegaan met het verzenden naar Hoomdossier');
            }
        }
    }

    private function sendMail()
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $mail = Mail::to($this->contact->primaryEmailAddress);

        $emailTemplate = EmailTemplate::find($this->cooperation->hoom_email_template_id);

        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bevestiging nieuw account Hoomdossier';
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $this->cooperation->name, $subject);
        $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);

        $htmlBody = str_replace('{cooperatie_naam}', $this->cooperation->name, $htmlBody);
        $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);

        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $this->contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new HoomdossierMail($mail, $htmlBody));

        return true;
    }
}