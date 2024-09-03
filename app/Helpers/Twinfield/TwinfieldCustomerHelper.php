<?php

namespace App\Helpers\Twinfield;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
use App\Eco\Twinfield\TwinfieldLog;
use ErrorException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use PhpTwinfield\ApiConnectors\CustomerApiConnector;
use PhpTwinfield\Customer;
use PhpTwinfield\CustomerAddress;
use PhpTwinfield\CustomerBank;
use PhpTwinfield\CustomerCollectMandate;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\OpenIdConnectAuthentication;
use PhpTwinfield\Secure\Provider\OAuthProvider;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Exception;
use PhpTwinfield\Services\FinderService;

class TwinfieldCustomerHelper
{
    private $connection;
    private $administration;
    private $fromInvoiceDateSent;
    private $office;
    private $redirectUri;
    private $customerApiConnector;
    public $messages;
    const BATCH_SIZE = 50; // Define the batch size

    /**
     * TwinfieldCustomerHelper constructor.
     *
     * @param Administration $administration, $twinFieldConnection
     */
    public function __construct(Administration $administration, $twinFieldConnection)
    {
        $this->administration = $administration;
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url_api') . '/twinfield';

        $this->fromInvoiceDateSent = $administration->date_sync_twinfield_contacts ?? null;

        if ($twinFieldConnection) {
            $this->connection = $twinFieldConnection;
        } else {
            if ($administration->twinfield_connection_type === "openid") {
                $provider = new OAuthProvider([
                    'clientId' => $administration->twinfield_client_id,
                    'clientSecret' => $administration->twinfield_client_secret,
                    'redirectUri' => $this->redirectUri,
                ]);
                if (!empty($administration->twinfield_refresh_token)) {
                    $this->connection = new OpenIdConnectAuthentication($provider, $administration->twinfield_refresh_token, $this->office);
                } else {
                    $this->connection = null;
                }
            }
        }

        $this->customerApiConnector = new CustomerApiConnector($this->connection);
        $this->messages = [];
    }

    public function processTwinfieldCustomer()
    {
        if (!$this->administration->uses_twinfield) {
            return "Deze administratie maakt geen gebruik van Twinfield.";
        }
        if (!$this->administration->twinfield_is_valid) {
            return "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.";
        }
        if (!$this->fromInvoiceDateSent) {
            return "Synchroniseren contacten datum vanaf niet gezet. Er worden geen contacten gesynchroniseerd.";
        }
        set_time_limit(0);

        $invoicesToProcess = $this->getInvoicesToBeChecked();
        $invoiceBatches = array_chunk($invoicesToProcess->toArray(), self::BATCH_SIZE);

        foreach ($invoiceBatches as $batch) {
            $this->processInvoiceBatch($batch);
        }

        if (count($this->messages) == 0) {
            array_push($this->messages, 'Geen nieuwe contacten gevonden voor synchronisatie.');
        }

        return implode(';', $this->messages);
    }

    private function getInvoicesToBeChecked()
    {
        return $this->administration->invoices()
            ->whereNull('twinfield_number')
            ->whereIn('status_id', ['sent', 'paid'])
            ->where('date_sent', '>=', $this->fromInvoiceDateSent);
    }

    private function processInvoiceBatch(array $batch)
    {
        foreach ($batch as $invoiceData) {
            $invoiceToBeChecked = (object)$invoiceData; // Convert array to object
            $twinfieldNumbers = $this->administration->twinfieldNumbers;
            $twinfieldNumber = $twinfieldNumbers->where('contact_id', '=', $invoiceToBeChecked->contact_id)->first();

            if (!$twinfieldNumber || !$twinfieldNumber->twinfield_number) {
                $contact = Contact::find($invoiceToBeChecked->contact_id);
                if ($contact) {
                    $this->createCustomer($contact);
                }
            }
        }
    }

    public function createCustomer(Contact $contact)
    {
        if (!$this->administration->uses_twinfield) {
            $message = 'Deze administratie maakt geen gebruik van Twinfield.';
            TwinfieldLog::create([
                'invoice_id' => null,
                'contact_id' => $contact->id,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'contact',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            array_push($this->messages, $message);
            return false;
        }
// Check of Customer al bestaat in Twinfield. We doen hier nog niets mee.
//        if( $this->checkIfCustomerNameExists($contact) )
//        {
//            return 'Error: Contact naam komt al voor bij TwinField' ;
//        };
//        if( $this->checkIfCustomerIbanExists($contact) );
//        {
//            return 'Error: Iban komt al voor bij TwinField' ;
//        };
        // Check of contact / administratie al koppeling heeft met Twinfield
        $twinfieldCustomerNumber = $contact->twinfieldNumbers()->where('administration_id', $this->administration->id)->first();

        $createNew = false;
        // Nog geen koppeling, dan aanmaken
        if (!$twinfieldCustomerNumber) {
            $customer = new Customer();
            $createNew = true;
        } else {
            // Wel koppeling, check toch even of hij echt bestaat
            // Check of twinfieldnumber nog correct is
            if ($twinfieldCustomerNumber->twinfield_number != "D" . $contact->number) {
                $message = 'Synchronisatie contact ' . $contact->number . ' niet gelukt. Mismatch Twinfieldnummer, in Econobis: ' . "D" . $contact->number . ' in Twinfield: ' . $twinfieldCustomerNumber->twinfield_number . '.';
                TwinfieldLog::create([
                    'invoice_id' => null,
                    'contact_id' => $contact->id,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'contact',
                    'user_id' => Auth::user()->id,
                    'is_error' => true,
                ]);
                array_push($this->messages, $message);
                return false;
            }
            // Check in Twinfield, bestaat hij daar echt, zo niet dan ook nieuw aanmaken ?
            try {
                $customer = $this->getTwinfieldCustomerByCode($twinfieldCustomerNumber->twinfield_number, $contact);
                if (!$customer || $customer->getUID() == null) {
                    $customer = new Customer();
                    $createNew = true;
                }
            } catch (Exception $e) {
                $customer = new Customer();
                $createNew = true;
            }
        }

        if ($createNew) {
            $this->fillCustomer($contact, $customer);

            if ($contact->iban) {
                $this->fillCustomerBank($contact, $customer, null);
            }
            if ($contact->is_collect_mandate) {
                $this->fillCustomerFinancials($contact, $customer);
            }

            try {
                // Synchroniseren contact naar Twinfield customer
                $response = $this->customerApiConnector->send($customer);

                if ($response && $response->getCode()) {
                    $message = 'Contact ' . $contact->number . ' ' . $contact->full_name . ' succesvol gesynchroniseerd (' . $response->getCode() . ')';
                    TwinfieldLog::create([
                        'invoice_id' => null,
                        'contact_id' => $contact->id,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'contact',
                        'user_id' => Auth::user()->id,
                        'is_error' => false,
                    ]);
                    // Bij nieuwe koppeling, ook nieuw TwinfieldCustomerNumber aanmaken (twinfield nummer per contact/administratie
                    if (!$twinfieldCustomerNumber) {
                        $twinfieldCustomerNumber = new TwinfieldCustomerNumber();
                        $twinfieldCustomerNumber->administration_id = $this->administration->id;
                        $twinfieldCustomerNumber->contact_id = $contact->id;
                        $twinfieldCustomerNumber->twinfield_number = $response->getCode();
                        $twinfieldCustomerNumber->save();
                    }
                    array_push($this->messages, $message);
                    return $response;
                } else {
                    $message = 'Synchronisatie contact ' . $contact->number . ' niet gelukt. Onbekende fout.';
                    TwinfieldLog::create([
                        'invoice_id' => null,
                        'contact_id' => $contact->id,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'contact',
                        'user_id' => Auth::user()->id,
                        'is_error' => true,
                    ]);
                    array_push($this->messages, $message);
                }
            } catch (PhpTwinfieldException $exceptionTwinfield) {
                $message = 'Synchronisatie contact ' . $contact->number . ' gaf de volgende twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
                Log::info($message);
                TwinfieldLog::create([
                    'invoice_id' => null,
                    'contact_id' => $contact->id,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'contact',
                    'user_id' => Auth::user()->id,
                    'is_error' => true,
                ]);
                array_push($this->messages, $message);
            } catch (Exception $e) {
                $message = 'Synchronisatie contact ' . $contact->number . ' gaf de volgende foutmelding: ' . $e->getMessage();
                Log::info($message);
                TwinfieldLog::create([
                    'invoice_id' => null,
                    'contact_id' => $contact->id,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'contact',
                    'user_id' => Auth::user()->id,
                    'is_error' => true,
                ]);
                array_push($this->messages, $message);
            }

        }
        return null;
    }

    public function updateCustomer(Contact $contact){

        $response = null;

        // Check of contact / administratie al koppeling heeft met Twinfield
        $twinfieldCustomerNumber = $contact->twinfieldNumbers()->where('administration_id', $this->administration->id)->first();
        if($twinfieldCustomerNumber)
        {
            $customer = $this->getTwinfieldCustomerByCode($twinfieldCustomerNumber->twinfield_number, $contact);
            if($customer)
            {
                $this->fillCustomer($contact, $customer);
                if ($contact->iban) {
                    $this->fillCustomerBank($contact, $customer, 1);
                }
                if ($contact->is_collect_mandate) {
                    $this->fillCustomerFinancials($contact, $customer);
                }

                try {
                    // Synchroniseren contact naar Twinfield customer
                    $response = $this->customerApiConnector->send($customer);

                    if($response && $response->getCode()) {
                        $message = 'Contact ' . $contact->number . ' ' .  $contact->full_name . ' succesvol gesynchroniseerd (' . $response->getCode() . ')';
                        TwinfieldLog::create([
                            'invoice_id' => null,
                            'contact_id' => $contact->id,
                            'message_text' => substr($message, 0, 256),
                            'message_type' => 'contact',
                            'user_id' => Auth::user()->id,
                            'is_error' => false,
                        ]);
                        array_push($this->messages, $message);
                        return $response;
                    }else{
                        $message = 'Synchronisatie contact ' . $contact->number . ' niet gelukt. Onbekende fout.';
                        TwinfieldLog::create([
                            'invoice_id' => null,
                            'contact_id' => $contact->id,
                            'message_text' => substr($message, 0, 256),
                            'message_type' => 'contact',
                            'user_id' => Auth::user()->id,
                            'is_error' => true,
                        ]);
                        array_push($this->messages, $message);
                    }

                } catch (PhpTwinfieldException $exceptionTwinfield) {
                    $message = 'Synchronisatie contact ' . $contact->number . ' gaf de volgende twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
                    Log::info($message);
                    TwinfieldLog::create([
                        'invoice_id' => null,
                        'contact_id' => $contact->id,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'contact',
                        'user_id' => Auth::user()->id,
                        'is_error' => true,
                    ]);
                    array_push($this->messages, $message);
                } catch (Exception $e) {
                    $message = 'Synchronisatie contact ' . $contact->number . ' gaf de volgende foutmelding: ' . $e->getMessage();
                    Log::info($message);
                    TwinfieldLog::create([
                        'invoice_id' => null,
                        'contact_id' => $contact->id,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'contact',
                        'user_id' => Auth::user()->id,
                        'is_error' => true,
                    ]);
                    array_push($this->messages, $message);
                }
            }
        }

        return $response;
    }

    public function getTwinfieldCustomerByCode($code, $contact)
    {
        try {
//            $response = $this->customerApiConnector->get($code, $this->office);
//            return $response ? $response->getResult() : null;
            return $this->customerApiConnector->get($code, $this->office);

        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Synchronisatie contact ' . $contact->number . ' (twinfieldcode: ' . $code . ') gaf de volgende twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => null,
                'contact_id' => $contact->id,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'contact',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            array_push($this->messages, $message);
        } catch (Exception $e) {
            $message = 'Synchronisatie contact ' . $contact->number . ' (twinfieldcode: ' . $code . ') gaf de volgende foutmelding: ' . $e->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => null,
                'contact_id' => $contact->id,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'contact',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            array_push($this->messages, $message);
        }

    }

    public function checkIfCustomerNameExists(Contact $contact){
        //Kijken of Customer al bestaat met zelfde naam
        $searchValue  = '*'.$contact->full_name.'*';
        $field        = 2;
        return $this->checkIfCustomerExists($searchValue, $field);
    }

    /**
     * todo Bij Twinfield kan je volgens alleen nog maar zoeken op "oude" bankrekeningnummer en niet op hele IBAN
     * Bij NL20INGB0001234567 slaat Twinfield dus 1234567 op als bankrekeningnummer, daar zou je nu evt. wel op
     * op kunnen zoeken
     */
    public function checkIfCustomerIbanExists(Contact $contact){
        //Kijken of Customer al bestaat met zelfde iban
        //Mmm. field 3 = (bank) accountnumber, niet iban !!? voor iban zie ik in API geen field id?
//        $searchValue = $contact->iban;
//        $field       = 3;
//        return $this->checkIfCustomerExists($searchValue, $field);
          return false;
    }

    /**
     * @param Contact $contact
     *        String $searchValue
     *        int field 	Fields searched
     *        0             code and name
     *        1         	code
     *        2 	        name
     *        3 	        bank account number
     *        4 	        address fields
     * @return bool - if customer already exists with specific searchvalue in twinfield return true.
     */
    public function checkIfCustomerExists($searchValue, $field){
        $pattern  = $searchValue;
        $field    = $field;
        $firstRow = 1;
        $maxRows  = 1;
        $options  = ["office"=>$this->office, "matchtype"=>'DEB'];

        $response = $this->connection->getAuthenticatedClient(Services::FINDER())->searchFinder(FinderService::TYPE_DIMENSIONS_FINANCIALS, $pattern, $field, $firstRow, $maxRows, $options);

//        dd($response); die();

        return $response->data->TotalRows>0;
    }

    /**
     * @param Contact  $contact
     * @param Customer $customer
     */
    private function fillCustomer(Contact $contact, Customer $customer)
    {
        $this->fillCustomerDimension($contact, $customer);

        $idTeller = 1;
        if (Address::where('contact_id', $contact->id)->where('type_id', 'visit')->exists()) {
            $visitAddresses = Address::where('contact_id', $contact->id)->where('type_id', 'visit')->get();
            foreach ($visitAddresses as $visitAddress) {
                $this->fillCustomerAddress($visitAddress, $customer, $idTeller, 'contact');
                $idTeller++;
            }
        }
        if (Address::where('contact_id', $contact->id)->where('type_id', 'invoice')->exists()) {
            $invoiceAddresses = Address::where('contact_id', $contact->id)->where('type_id', 'invoice')->get();
            foreach ($invoiceAddresses as $invoiceAddress) {
                $this->fillCustomerAddress($invoiceAddress, $customer, $idTeller, 'invoice');
                $idTeller++;
            }
        }
        if (Address::where('contact_id', $contact->id)->where('type_id', 'postal')->exists()) {
            $postAddresses = Address::where('contact_id', $contact->id)->where('type_id', 'postal')->get();
            foreach ($postAddresses as $postAddress) {
                $this->fillCustomerAddress($postAddress, $customer, $idTeller, 'postal');
                $idTeller++;
            }
        }
    }

    private function fillCustomerDimension(Contact $contact, Customer $customer){
        $customer
            ->setCode("D".$contact->number)
            ->setName(substr($contact->full_name, 0, 40))
            ->setOffice($this->office);
    }

    private function fillCustomerAddress(Address $address, Customer $customer, $idTeller, $type){

        $customer_address = new CustomerAddress();

        $customer_address
            ->setID($idTeller)
            ->setType($type)
            ->setDefault($address->primary)
            ->setPostcode($address->postal_code)
            ->setField2($address->present()->streetAndNumber())
            ->setCity($address->city)
            ->setCountry($address->country_id)
            ->setContact(substr($address->contact->full_name, 0, 40));

        $customer->addAddress($customer_address);
    }

    private function fillCustomerFinancials(Contact $contact, Customer $customer){

        $customer_collect_mandate = new CustomerCollectMandate();

        $customer_collect_mandate
            ->setID($contact->collect_mandate_code)
            ->setSignatureDate(new \DateTime( $contact->collect_mandate_signature_date) )
            ->setFirstRunDate(new \DateTime( $contact->collect_mandate_first_run_date) );

        $customer
            ->setPayAvailable(true)
            ->setPayCode('SEPANLDD')
            ->setCollectMandate($customer_collect_mandate);
    }

    private function fillCustomerBank(Contact $contact, Customer $customer, $bankId){

        $customer_bank = new CustomerBank();

        if($bankId)
        {
            $customer_bank
                ->setID($bankId);
        }
        $customer_bank
            ->setDefault(true)
            ->setIban($contact->iban)
            ->setAscription($contact->iban_attn ? substr($contact->iban_attn, 0, 40) : substr($contact->full_name, 0, 40));

        $customer->addBank($customer_bank);
    }

}
