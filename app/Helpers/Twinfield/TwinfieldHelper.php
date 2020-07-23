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
use Illuminate\Support\Facades\Storage;

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

        $this->administration = $administration;
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url') . '/api/twinfield';

        if ($administration->twinfield_connection_type === "openid") {
            $provider = new OAuthProvider([
                'clientId' => $administration->twinfield_client_id,
                'clientSecret' => $administration->twinfield_client_secret,
                'redirectUri' => $this->redirectUri
            ]);

            if (!isset($_GET['code'])) {

                // If we don't have an authorization code then get one
                $authUrl = $provider->getAuthorizationUrl();
                $_SESSION['oauth2state'] = $provider->getState();
                //Storage::disk('local')->put('file.txt', $authUrl);
                header('Location: '.$authUrl);
                exit;

            // Check given state against previously stored one to mitigate CSRF attack
            } elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
                //Storage::disk('local')->put('file2.txt', 'Check given state against previously stored one to mitigate CSRF attack');
                unset($_SESSION['oauth2state']);
                exit('Invalid state');

            } else {
                //Storage::disk('local')->put('file3.txt', 'weer een stapje verder');
                $accessToken = $provider->getAccessToken('authorization_code', [
                    'code' => $_GET['code']
                ]);

                // We have an access token, which we may use in authenticated
                // requests against the service provider's API.
                //echo 'Access Token: ' . $accessToken->getToken() . "<br>";
                //echo 'Refresh Token: ' . $accessToken->getRefreshToken() . "<br>";
                //echo 'Expired in: ' . $accessToken->getExpires() . "<br>";
                //dd('Already expired? ' . ($accessToken->hasExpired() ? 'expired' : 'not expired'));

                $refreshToken = $accessToken->getRefreshToken();
                $this->connection = new \PhpTwinfield\Secure\OpenIdConnectAuthentication($provider, $refreshToken, $this->office);
            }
        }else{
            Storage::disk('local')->put('file.txt', 'hahah');
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