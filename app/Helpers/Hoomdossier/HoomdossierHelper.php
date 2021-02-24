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
use GuzzleHttp\Psr7;
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
        $hoomResponse = $this->sendToHoomdossier();
// todo WM: opschonen dd
//dd($hoomResponse);

//        $test = json_encode(["account_id" => 1336,
//            "user_id" => 1685]);
//        dd(json_decode($test)->account_id);

        $hoomAccountId = json_decode($hoomResponse)->account_id;
//        dd($hoomAccountId);

        // When success save hoomdossier id
        $this->contact->hoom_account_id = $hoomAccountId;
        $this->contact->save();

        // Add contact to contactGroup 'Hoom'
        if($this->cooperation->hoom_group_id) {
            $hoomdossierContactGroup = ContactGroup::find($this->cooperation->hoom_group_id);

            $hoomdossierContactGroup->contacts()->syncWithoutDetaching($this->contact);
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

        if($this->contact->hoom_account_id) {
            $errors[] = 'Koppeling hoomdossier bestaat al';
        }

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
        } else {
            $errors[] = 'Bedrijven kunnen niet worden aangemaakt bij Hoomdossier';
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
        if(strpos ($this->cooperation->hoom_link, '.test')) {
            $testResponse = json_encode(["account_id" => rand(1,3000),
                "user_id" => rand(1,3000)]);
            return $testResponse;
        }

        if($this->contact->person->last_name_prefix != '') {
            $lastName = $this->contact->person->last_name_prefix . ' ' . $this->contact->person->last_name;
        } else {
            $lastName = $this->contact->person->last_name;
        }

        $payload = [
            'extra' => ['contact_id' => $this->contact->id],
// todo WM: weer terugzetten juiste vulling email
//            'email' => $this->contact->primaryEmailAddress->email ? $this->contact->primaryEmailAddress->email : '',
            'email' => '',
            'first_name' => $this->contact->person->first_name ? $this->contact->person->first_name : '',
            'last_name' => $lastName ? $lastName : '',
            'postal_code' => $this->contact->primaryAddress->postal_code ? $this->contact->primaryAddress->postal_code : '',
            'number' => $this->contact->primaryAddress->number ? $this->contact->primaryAddress->number : '',
            'house_number_extension' => $this->contact->primaryAddress->addition ? $this->contact->primaryAddress->addition : '',
            'street' => $this->contact->primaryAddress->street ? $this->contact->primaryAddress->street : '',
            'city' => $this->contact->primaryAddress->city ? $this->contact->primaryAddress->city : '',
            'phone_number' => $this->contact->primaryphoneNumber ? $this->contact->primaryphoneNumber->number : '',
        ];
// todo WM: opschonen dd
//dd(json_encode($payload));
        $client = new Client;
        $headers = [
            'Authorization' => 'Bearer ' . $this->cooperation->hoom_key,
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
//            'data-raw'      => '{"extra":{"contact_id":62},"email":"","first_name":"Wim","last_name":"Test1","postal_code":"1111 AA","number":1,"house_number_extension":"a","street":"straat","city":"woonplaats","phone_number":""}',
        ];
        $body = ['json' => $payload];

// todo WM: uitzoeken hoe we nu body/json goed kunnen meesturen in post
//        $body = ['body'      => '{
//    "email": "",
//    "first_name": "Wim",
//    "extra": {
//        "contact_id": "128"
//    },
//    "last_name": "Mosman",
//    "postal_code": "",
//    "number": "",
//    "house_number_extension": "",
//    "street": "",
//    "city": "",
//    "phone_number": ""
//}' ];
//dd($headers);
        try {
            $response = $client->request('POST', $this->cooperation->hoom_link, compact('headers'), ['json' => $payload]);
//            $response = $client->post($this->cooperation->hoom_link, compact('headers'), ['json' => $payload] );
            return $response->getBody();
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
//                dd($e->getRequest()->getBody()->getContents());
//                dd($e->getResponse()->getBody());
//                dd(Psr7\str($e->getMessage()));
//                abort($e->getCode(), Psr7\str($e->getResponse()));
//                dd(json_decode($e->getResponse()->getBody()));
                abort($e->getCode(), $e->getResponse()->getBody());
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