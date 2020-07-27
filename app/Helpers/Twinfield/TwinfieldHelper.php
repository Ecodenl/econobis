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
use PhpTwinfield\Secure\OpenIdConnectAuthentication;
use PhpTwinfield\Secure\Provider\OAuthProvider;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldHelper
{
    private $connection;
    private $office;
    private $redirectUri;

    /**
     * TwinfieldHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url_api') . '/twinfield';

        if ($administration->twinfield_connection_type === "openid") {

            $provider = new OAuthProvider([
                'clientId'                => $administration ? $administration->twinfield_client_id : '',    // The client ID assigned to you by the provider
                'clientSecret'            => $administration ? $administration->twinfield_client_secret : '',   // The client password assigned to you by the provider
                'redirectUri'             => $this->redirectUri,
            ]);
            $this->connection = new OpenIdConnectAuthentication($provider, $administration->twinfield_refresh_token, $this->office);

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