<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Twinfield;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use PhpTwinfield\ApiConnectors\CustomerApiConnector;
use PhpTwinfield\Customer;
use PhpTwinfield\CustomerAddress;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\WebservicesAuthentication;
use PhpTwinfield\Exception as PhpTwinfieldException;

class TwinfieldHelper
{
    private $connection;
    private $office;

    public function __construct($username, $password, $organization, $officeCode)
    {
        $this->connection = new WebservicesAuthentication($username, $password, $organization);
        $this->office = Office::fromCode($officeCode);
    }


    public function createCustomer(Contact $contact){

        $customerApiConnector = new CustomerApiConnector($this->connection);

        $customer = new Customer();

        //Standaard customer informatie
        $this->fillCustomerDimension($contact, $customer);

        //Addressen meegeven
        foreach ($contact->addresses as $address){
            $this->fillCustomerAddress($address, $customer);
        }

        try {
            $response = $customerApiConnector->send($customer);
            return $response;
        }
        catch (PhpTwinfieldException $e){
            return 'Error: ' . $e->getMessage();
        }
    }

    public function fillCustomerDimension(Contact $contact, Customer $customer){
        $customer
            ->setCode('98')
            ->setName($contact->full_name)
            ->setOffice($this->office)
            ->setEBilling(false);
    }

    public function fillCustomerAddress(Address $address, Customer $customer){
        $customer_address = new CustomerAddress();
        $customer_address
            ->setType('invoice')
            ->setDefault(false)
            ->setPostcode('1212 AB')
            ->setCity('TestCity')
            ->setCountry('NL')
            ->setTelephone('010-12345')
            ->setFax('010-1234')
            ->setEmail('johndoe@example.com');
        $customer->addAddress($customer_address);
    }
}