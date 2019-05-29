<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Twinfield;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
use ErrorException;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Boolean;
use PhpTwinfield\ApiConnectors\CustomerApiConnector;
use PhpTwinfield\Customer;
use PhpTwinfield\CustomerAddress;
use PhpTwinfield\CustomerBank;
use PhpTwinfield\CustomerCollectMandate;
use PhpTwinfield\Enums\Services;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Exception;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\WebservicesAuthentication;
use PhpTwinfield\Services\FinderService;

class TwinfieldCustomerHelper
{
    private $connection;
    private $office;
    private $administration;
    private $customerApiConnector;

    /**
     * TwinfieldCustomerHelper constructor.
     *
     * @param Administration $administration, WebservicesAuthentication $webservicesAuthentication
     */
    public function __construct(Administration $administration, $webservicesAuthentication)
    {
        //Indien we al een connection hebben gemaakt (bijv. vanuit TwinfieldSalsTransaction), dan gebruiken we die, anders nieuwe maken.
        if($webservicesAuthentication)
        {
            $this->connection = $webservicesAuthentication;
        }else{
            $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
        }
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->administration = $administration;
        $this->customerApiConnector = new CustomerApiConnector($this->connection);
    }

    public function createAllCustomers(){
        set_time_limit(0);
        $contacts = Contact::all();

        foreach ($contacts as $contact){
            $this->createCustomer($contact);
        }
    }

    public function createCustomer(Contact $contact){
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
        // Nog geen koppeling, dan aanmaken
        if(!$twinfieldCustomerNumber)
        {
            $customer = new Customer();
        }else{
            // Wel koppeling, check toch even of hij echt bestaat
            // Zo niet, dan nieuw aanmaken ?
            try {
                $customer = $this->getTwinfieldCustomerByCode($twinfieldCustomerNumber->twinfield_number);
            }
            catch(Exception $e){
                $customer = new Customer();
            }
            catch(ErrorException $e){
                $customer = new Customer();
            }
        }

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
            // Bij nieuwe koppeling, ook nieuw TwinfieldCustomerNumber aanmaken (twinfield nummer per contact/administratie
            if(!$twinfieldCustomerNumber)
            {
                $twinfieldCustomerNumber = new TwinfieldCustomerNumber();
                $twinfieldCustomerNumber->administration_id = $this->administration->id;
                $twinfieldCustomerNumber->contact_id = $contact->id;
                $twinfieldCustomerNumber->twinfield_number = $response->getCode();
                $twinfieldCustomerNumber->save();
            }

            return $response;

        } catch (PhpTwinfieldException $e) {
            Log::error('Error: ' . $e->getMessage());
            return 'Error: ' . $e->getMessage();
        }
    }

    public function updateCustomer(Contact $contact){

        $messages = [];
        // Check of contact / administratie al koppeling heeft met Twinfield
        $twinfieldCustomerNumber = $contact->twinfieldNumbers()->where('administration_id', $this->administration->id)->first();
        if($twinfieldCustomerNumber)
        {
            $customer = $this->getTwinfieldCustomerByCode($twinfieldCustomerNumber->twinfield_number);
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
                        array_push($messages, 'Contact ' . $contact->number . ' ' .  $contact->full_name . ' succesvol gesynchroniseerd.');
                    return null;

                } catch (PhpTwinfieldException $e) {
                    Log::error('Error: ' . $e->getMessage());
                    array_push($messages, 'Synchronisatie contact gaf de volgende foutmelding: ' . $e->getMessage());
                    return implode(';', $messages);
                }
            }
        }

    }

    public function fillCustomerDimension(Contact $contact, Customer $customer){
        $customer
            ->setCode("D".$contact->number)
            ->setName($contact->full_name)
            ->setOffice($this->office);
    }

    public function fillCustomerAddress(Address $address, Customer $customer, $idTeller, $type){

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

    public function fillCustomerFinancials(Contact $contact, Customer $customer){

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

    public function fillCustomerBank(Contact $contact, Customer $customer, $bankId){

        $customer_bank = new CustomerBank();

        if($bankId)
        {
            $customer_bank
                ->setID($bankId);
        }
        $customer_bank
            ->setDefault(true)
            ->setIban($contact->iban)
            ->setAscription($contact->iban_attn ? $contact->iban_attn : $contact->full_name);

        $customer->addBank($customer_bank);
    }


    public function getTwinfieldCustomerByCode($code){
        return $this->customerApiConnector->get($code, $this->office);
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
}