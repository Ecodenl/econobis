<?php
//require_once __DIR__ . '/bootstrap/autoload.php';

session_start();

$provider = new PhpTwinfield\Secure\Provider\OAuthProvider([
    'clientId'                => 'API000392',    // The client ID assigned to you by the provider
    'clientSecret'            => 'DYI5lJ4H2ZtUpGb8UO2jbfBZo4naxgWJ1A==',   // The client password assigned to you by the provider
    'redirectUri'             =>  $redirectUri,
]);

// If we don't have an authorization code then get one
if (!isset($_GET['code'])) {

    // Fetch the authorization URL from the provider; this returns the
    // urlAuthorize option and generates and applies any necessary parameters
    // (e.g. state).
    $authorizationUrl = $provider->getAuthorizationUrl();

    // Get the state generated for you and store it to the session.
    $_SESSION['oauth2state'] = $provider->getState();

    // Redirect the user to the authorization URL.
    header('Location: ' . $authorizationUrl);
    exit;

// Check given state against previously stored one to mitigate CSRF attack
} elseif (empty($_GET['state']) || (isset($_SESSION['oauth2state']) && $_GET['state'] !== $_SESSION['oauth2state'])) {

    if (isset($_SESSION['oauth2state'])) {
        unset($_SESSION['oauth2state']);
    }

    exit('Invalid state');

} else {

    try {

        // Try to get an access token using the authorization code grant.
        $accessToken = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        // We have an access token, which we may use in authenticated
        // requests against the service provider's API.
//        echo 'Access Token: ' . $accessToken->getToken() . "<br>";
//        echo 'Refresh Token: ' . $accessToken->getRefreshToken() . "<br>";
//        echo 'Expired in: ' . $accessToken->getExpires() . "<br>";
//        echo 'Already expired? ' . ($accessToken->hasExpired() ? 'expired' : 'not expired') . "<br>";

        $refreshToken = $accessToken->getRefreshToken();


    } catch (\Exception $e) {

        echo 'Fout getAccessToken!' . "<br>";
        // Failed to get the access token or user details.
        exit($e->getMessage());

    }

    try {
        $office = \PhpTwinfield\Office::fromCode("NLA000804");
        $connection = new \PhpTwinfield\Secure\OpenIdConnectAuthentication($provider, $refreshToken, $office);

//        print_r($connection);
        echo 'OpenIdConnection!' . "<br>";
    } catch (\Exception $e) {

        echo 'Fout OpenIdConnection!' . "<br>";
        exit($e->getMessage());

    }

    try {
        $officeApiConnector = new \PhpTwinfield\ApiConnectors\OfficeApiConnector($connection);
//    print_r($officeApiConnector);
        echo 'officeApiConnector!' . "<br>";

        $listAllWithoutOfficeCode = $officeApiConnector->listAllWithoutOfficeCode();
    print_r($listAllWithoutOfficeCode);

    } catch (\Exception $e) {
        echo 'Fout officeApiConnector->listAllWithoutOfficeCode!' . "<br>";
        exit($e->getMessage());
    }

}
