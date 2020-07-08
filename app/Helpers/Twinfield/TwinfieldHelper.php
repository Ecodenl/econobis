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
        $this->administration = $administration;
        $this->office = Office::fromCode($administration->twinfield_office_code);

        if ($administration->twinfield_connection_type === "openid") {
        print_r($administration->twinfield_client_id . "\n");
        print_r($administration->twinfield_client_secret . "\n");
        print_r($administration->twinfield_connection_type . "\n");
        print_r($administration->twinfield_organization_code . "\n");
        print_r($administration->twinfield_office_code . "\n");
            $provider = new OAuthProvider([
                'clientId' => $administration->twinfield_client_id,
                'clientSecret' => $administration->twinfield_client_secret,
                'redirectUri' => 'https://test.econobis.nl/#/twinfield'
            ]);
            print_r($provider);
            print_r( "\n");
            die("even tot hier");
            $accessToken = $provider->getAccessToken("authorization_code", ["code" => $administration->twinfield_office_code]);
            $refreshToken = $accessToken->getRefreshToken();

            print_r($accessToken);
            print_r($refreshToken);
            print_r( "\n");
        die("even tot hier");

            $this->connection = new \PhpTwinfield\Secure\OpenIdConnectAuthentication($provider, $refreshToken, $this->office);
        }else{
            $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
        }
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