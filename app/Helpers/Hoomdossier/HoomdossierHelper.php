<?php


namespace App\Helpers\Hoomdossier;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Hoomdossier\Templates\HoomdossierMail;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
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

        $hoomAccountId = json_decode($hoomResponse)->account_id;

        // When success save hoomdossier id
        $this->contact->hoom_account_id = $hoomAccountId;
        $this->contact->save();

        // Add contact to contactGroup 'Hoom'
        if($this->cooperation && $this->cooperation->hoom_group_id) {
            $hoomdossierContactGroup = ContactGroup::find($this->cooperation->hoom_group_id);

            $hoomdossierContactGroup->contacts()->syncWithoutDetaching([ $this->contact->id => ['member_created_at' => \Illuminate\Support\Carbon::now(), 'member_to_group_since' => Carbon::now()]]);

            if($hoomdossierContactGroup->laposta_list_id){
                $lapostaMemberHelper = new LapostaMemberHelper($hoomdossierContactGroup, $this->contact, false);
                $lapostaMemberHelper->createMember();
            }
        }

        // Send email to contact
        if($this->cooperation && $this->cooperation->hoom_email_template_id && $this->cooperation->send_email) {
            $this->sendMail();
        }

        // Return hoomdossier id
        return $hoomAccountId;
    }

    private function validateRequiredFields()
    {
        $errorsCheckBefore = [];

        if($this->contact->hoom_account_id) {
            $errorsCheckBefore[] = 'Koppeling hoomdossier bestaat al';
        }

        if(!$this->contact->primaryEmailAddress) {
            $errorsCheckBefore[] = 'Primair mailadres ontbreekt';
        }

        if($this->contact->type_id == 'person') {
            if(!$this->contact->person->first_name) {
                $errorsCheckBefore[] = 'Voornaam ontbreekt';
            }

            if(!$this->contact->person->last_name) {
                $errorsCheckBefore[] = 'Achternaam ontbreekt';
            }
        } else {
            $errorsCheckBefore[] = 'Bedrijven kunnen niet worden aangemaakt bij Hoomdossier';
        }

        if(!$this->contact->primaryAddress) {
            $errorsCheckBefore[] = 'Primair adres ontbreekt';
        }else{
            if(!$this->contact->primaryAddress->postal_code || empty($this->contact->primaryAddress->postal_code)) {
                $errorsCheckBefore[] = 'Postcode in adres ontbreekt';
            }
            if(!$this->contact->primaryAddress->street || empty($this->contact->primaryAddress->street)) {
                $errorsCheckBefore[] = 'Straat in adres ontbreekt';
            }
            if(!$this->contact->primaryAddress->number || empty($this->contact->primaryAddress->number)) {
                $errorsCheckBefore[] = 'Huisnummer in adres ontbreekt';
            }
            if(!$this->contact->primaryAddress->city || empty($this->contact->primaryAddress->city)) {
                $errorsCheckBefore[] = 'Plaats in adres ontbreekt';
            }
// niet verplicht
//            if(!$this->contact->primaryAddress->housingfile) {
//                $errorsCheckBefore[] = 'Woningdossier ontbreekt';
//            }
        }
        $errors = null;
        if(count($errorsCheckBefore)) {
            $errors = array("econobis" => $errorsCheckBefore);
        };
        if($errors) throw ValidationException::withMessages($errors);

        return true;
    }

    private function sendToHoomdossier()
    {
        if(!$this->cooperation){
            return;
        }
        // If hoom link contains .test then return fake id
        if($this->cooperation && strpos($this->cooperation->hoom_link, '.test')) {
            $testResponse = json_encode(["account_id" => rand(1,3000),
                "user_id" => rand(1,3000)]);
            return $testResponse;
        }

        if($this->contact->person->last_name_prefix != '') {
            $lastName = $this->contact->person->last_name_prefix . ' ' . $this->contact->person->last_name;
        } else {
            $lastName = $this->contact->person->last_name;
        }

        //calculate the total electricity usage (consumption_high + consumption_low - return_high - return_low)
        $totalEnergy = 0;
        if($this->contact->primaryAddress && $this->contact->primaryAddress->addressEnergyConsumptionElectricityPeriods()->count() > 0) {
            $consumptionRow = $this->contact->primaryAddress->addressEnergyConsumptionElectricityPeriods()->get()->reverse()->first();
            $consumptionHigh = $consumptionRow->consumption_high;
            $consumptionLow = $consumptionRow->consumption_low;
            $returnHigh = $consumptionRow->return_high;
            $returnLow = $consumptionRow->return_low;

            $totalEnergy = $consumptionHigh + $consumptionLow - $returnHigh - $returnLow;
        }
        //calculate the total gas usage
        $totalGas = 0;
        if($this->contact->primaryAddress && $this->contact->primaryAddress->addressEnergyConsumptionGasPeriods()->count() > 0) {
            $totalGas = $this->contact->primaryAddress->addressEnergyConsumptionGasPeriods()->get()->reverse()->first()->consumption;
        }

        // number of residents (default 2)
        $numberOfResidents = 2;
        if($this->contact->primaryAddress && $this->contact->primaryAddress->housingFile) {
            $numberOfResidents = $this->contact->primaryAddress->housingFile->number_of_residents;
        }

        $payload = [
            'extra' => ['contact_id' => $this->contact->id],
            'email' => $this->contact->primaryEmailAddress->email ? $this->contact->primaryEmailAddress->email : '',
            'first_name' => $this->contact->person->first_name ? $this->contact->person->first_name : '',
            'last_name' => $lastName ? $lastName : '',
            'postal_code' => $this->contact->primaryAddress->postal_code ? $this->contact->primaryAddress->postal_code : '',
            'number' => $this->contact->primaryAddress->number ? $this->contact->primaryAddress->number : '',
            'house_number_extension' => $this->contact->primaryAddress->addition ? $this->contact->primaryAddress->addition : '',
            'street' => $this->contact->primaryAddress->street ? $this->contact->primaryAddress->street : '',
            'city' => $this->contact->primaryAddress->city ? $this->contact->primaryAddress->city : '',
            'phone_number' => $this->contact->primaryphoneNumber ? $this->contact->primaryphoneNumber->number : '',

            'tool_questions' => [
                'resident-count' => $numberOfResidents,
                'amount-gas' => $totalGas,
                'amount-electricity' => $totalEnergy,
            ],

            'roles' => [
                'resident',
            ]
        ];
        $client = new Client;
        $headers = [
            'Authorization' => 'Bearer ' . $this->cooperation->hoom_key,
            'Accept'        => 'application/json',
        ];

        try {
            $response = $client->post($this->cooperation->hoom_link, ['headers' => $headers, 'json' => $payload]);
            return $response->getBody();
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                Log::error('Er is iets misgegaan met het verzenden naar Hoomdossier voor contact id ' . $this->contact->id .  ', melding: ' . $e->getCode() . ' - ' . $e->getResponse()->getBody() );
                abort($e->getCode(), $e->getResponse()->getBody());
            } else {
                Log::error('Er is iets misgegaan met het verzenden naar Hoomdossier voor contact id ' . $this->contact->id .  ', melding: ' . $e->getCode() );
                abort($e->getCode(), 'Er is iets misgegaan met het verzenden naar Hoomdossier');
            }
        }
    }

    public function connectCoachToHoomdossier(QuotationRequest $quotationRequest)
    {
        if(!$this->cooperation
            || !$this->cooperation->hoom_connect_coach_link
            || !$quotationRequest->organisationOrCoach->exists()
            || !$quotationRequest->organisationOrCoach->hoom_account_id
            || !$quotationRequest->opportunity->exists()
            || !$quotationRequest->opportunity->intake->exists()
            || !$quotationRequest->opportunity->intake->contact->hoom_account_id
            || !in_array( $quotationRequest->opportunity->intake->campaign_id, $this->cooperation->hoomCampaigns->pluck('campaign_id')->toArray() )
        )
        {
            return;
        }

        $coach = $quotationRequest->organisationOrCoach;

        $payload = [
            'building_coach_statuses' => [
                'coach_contact_id' => $coach->id,
                'resident_contact_id' => $this->contact->id,
            ],
        ];

        $client = new Client;
        $headers = [
            'Authorization' => 'Bearer ' . $this->cooperation->hoom_key,
            'Accept' => 'application/json',
        ];

        try {
            $response = $client->post($this->cooperation->hoom_connect_coach_link, ['headers' => $headers, 'json' => $payload]);
            return $response->getBody();
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                Log::error('Er is iets misgegaan met het koppelen van een coach aan het Hoomdossier met de coach id ' . $this->contact->id . ', melding: ' . $e->getCode() . ' - ' . $e->getResponse()->getBody());
                abort($e->getCode(), $e->getResponse()->getBody());
            } else {
                Log::error('Er is iets misgegaan met het koppelen van een coach aan het Hoomdossier met de coach id ' . $this->contact->id . ', melding: ' . $e->getCode());
                abort($e->getCode(), 'Er is iets misgegaan met het koppelen van een coach aan het Hoomdossier');
            }
        }
    }

    private function sendMail()
    {
//        $mail = Mail::to($this->contact->primaryEmailAddress);

        if ($this->cooperation->hoom_mailbox_id) {
            $mailbox = Mailbox::find($this->cooperation->hoom_mailbox_id);
            if (!$mailbox) {
                $mailbox = Mailbox::getDefault();
            }
        } else {
            $mailbox = Mailbox::getDefault();
        }

        $mail = Mail::fromMailbox($mailbox)->to($this->contact->primaryEmailAddress);

        $emailTemplate = EmailTemplate::find($this->cooperation->hoom_email_template_id);

        $subject = $emailTemplate->subject ? $emailTemplate->subject : 'Bevestiging nieuw account Hoomdossier';
        $htmlBody = $emailTemplate->html_body;

        $subject = str_replace('{cooperatie_naam}', $this->cooperation->name, $subject);
        $subject = str_replace('{contactpersoon}', $this->contact->full_name, $subject);
        $subject = TemplateVariableHelper::replaceTemplateVariables($subject,'contact', $this->contact);

        $htmlBody = str_replace('{cooperatie_naam}', $this->cooperation->name, $htmlBody);
        $htmlBody = str_replace('{contactpersoon}', $this->contact->full_name, $htmlBody);
        $htmlBody = TemplateVariableHelper::replaceTemplateVariables($htmlBody,'contact', $this->contact);

        $htmlBody = TemplateVariableHelper::stripRemainingVariableTags($htmlBody);

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head>'
            . $htmlBody . '</html>';


        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new HoomdossierMail($mail, $htmlBody, $emailTemplate->default_attachment_document_id));

        return true;
    }
}