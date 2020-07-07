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
use PhpTwinfield\Secure\Provider\OAuthProvider;
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
//        $this->administration = $administration;
//        $this->office = Office::fromCode($administration->twinfield_office_code);

//        $token = null;
//        if ($administration->twinfield_type_connection === "openid") {
//            $provider = new OAuthProvider([
//                'clientId' => $administration->twinfield_client_id,
//                'clientSecret' => $administration->twinfield_client_secret,
//                'redirectUri' => 'https://localhost:8080/'
//            ]);
//            $accessToken = $provider->getAccessToken("authorization_code", ["code" => $administration->twinfield_organization_code]);
//            $refreshToken = $accessToken->getRefreshToken();
//            $this->connection = new \PhpTwinfield\Secure\OpenIdConnectAuthentication($provider, $refreshToken, $this->office);
//        }else{
//            $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
//        }
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