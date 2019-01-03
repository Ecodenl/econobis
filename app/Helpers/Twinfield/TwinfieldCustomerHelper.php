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
use PhpTwinfield\ApiConnectors\CustomerApiConnector;
use PhpTwinfield\Customer;
use PhpTwinfield\CustomerAddress;
use PhpTwinfield\CustomerBank;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Exception;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldCustomerHelper
{
    private $connection;
    private $office;
    private $administration;
    private $customerApiConnector;

    /**
     * TwinfieldCustomerHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
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

            $this->checkIfCustomerExists($contact);

            try {
                $customer = $this->getTwinfieldCustomerByCode($contact->twinfieldNumbers()->where('administration_id', $this->administration->id)->first()->twinfield_number);
            }
            catch(Exception $e){
                $customer = new Customer();
            }
            catch(ErrorException $e){
                $customer = new Customer();
            }

            $this->fillCustomerDimension($contact, $customer);

            if($contact->primaryAddress) {
                $this->fillCustomerAddress($contact->primaryAddress, $customer);
            }

            if($contact->iban) {
                $this->fillCustomerBank($contact, $customer);
            }

            try {
                $response = $this->customerApiConnector->send($customer);

                $twinfieldCustomerNumber = new TwinfieldCustomerNumber();
                $twinfieldCustomerNumber->administration_id = $this->administration->id;
                $twinfieldCustomerNumber->contact_id = $contact->id;
                $twinfieldCustomerNumber->twinfield_number = $response->getCode();
                $twinfieldCustomerNumber->save();

                return $response;

            } catch (PhpTwinfieldException $e) {
                Log::error('Error: ' . $e->getMessage());
                return 'Error: ' . $e->getMessage();
            }
    }

    public function fillCustomerDimension(Contact $contact, Customer $customer){
        $customer
            ->setName($contact->full_name)
            ->setOffice($this->office);
    }

    public function fillCustomerAddress(Address $address, Customer $customer){

        $customer_address = new CustomerAddress();

        $customer_address
            ->setID(1)
            ->setType('invoice')
            ->setDefault(true)
            ->setPostcode($address->postal_code)
            ->setCity($address->city)
            ->setCountry($address->country_id)
            ->setContact($address->contact->full_name);

        $customer->addAddress($customer_address);
    }

    public function fillCustomerBank(Contact $contact, Customer $customer){

        $customer_bank = new CustomerBank();

        $customer_bank
            ->setId(1)
            ->setDefault(true)
            ->setIban($contact->iban)
            ->setAscription($contact->iban_attn ? $contact->iban_attn : $contact->full_name);

        $customer->addBank($customer_bank);
    }

    /**
     * @param Contact $contact
     *
     * @return bool - if customer already exists in twinfield return true.
     */
    public function checkIfCustomerExists(Contact $contact){
        //todo
        //Kijken op een aantal waardes(naam + postcode?)
        //Als hij al bestaat twinfield debiteuren nummer opslaan.
        return false;
    }

    public function getTwinfieldCustomerByCode($code){
        return $this->customerApiConnector->get($code, $this->office);
    }
}