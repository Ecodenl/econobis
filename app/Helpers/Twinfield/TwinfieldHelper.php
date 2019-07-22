<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Twinfield;


use App\Eco\Administration\Administration;
use Illuminate\Support\Facades\Log;
use PhpTwinfield\ApiConnectors\OfficeApiConnector;
use PhpTwinfield\Exception;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldHelper
{
    private $connection;
    private $office;

    /**
     * TwinfieldHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
        $this->office = Office::fromCode($administration->twinfield_office_code);
    }


    /**
     * @return bool - true if the connection did succeed, false if connection failed
     */
    public function testConnection()
    {
        $officeApiConnector = new OfficeApiConnector($this->connection);

        $result = true;

        try {
           $officeApiConnector->listAllWithoutOfficeCode();
        }
        catch(Exception $e){
            Log::error($e->getMessage());
            $result = false;
        }

        return $result;
    }
}