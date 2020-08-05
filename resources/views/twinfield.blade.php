<?php

use App\Eco\Administration\Administration;

session_start();

if($administration && !isset($_SESSION['twinfieldAdministrationId'])){
    $_SESSION['twinfieldAdministrationId'] = $administration->id;
}
if(!$administration && isset($_SESSION['twinfieldAdministrationId'])){
    $administration = Administration::find($_SESSION['twinfieldAdministrationId']);
}
$provider = new PhpTwinfield\Secure\Provider\OAuthProvider([
    'clientId'                => $administration ? $administration->twinfield_client_id : '',    // The client ID assigned to you by the provider
    'clientSecret'            => $administration ? $administration->twinfield_client_secret : '',   // The client password assigned to you by the provider
    'redirectUri'             => $redirectUri,
]);
$office = \PhpTwinfield\Office::fromCode($administration ? $administration->twinfield_office_code : '' );

// If we don't have an refresh token then get one
if (empty($administration->twinfield_refresh_token)) {

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
        if (isset($_SESSION['twinfieldAdministrationId'])) {
            unset($_SESSION['twinfieldAdministrationId']);
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
            $refreshToken = $accessToken->getRefreshToken();

            // Get the refreshToken generated for you and store it to the session.
            $administration->twinfield_refresh_token = $accessToken->getRefreshToken();
            $administration->save();
//            echo 'refreshToken: ' . $administration->twinfield_refresh_token . "<br>";

            if (isset($_SESSION['twinfieldAdministrationId'])) {
                unset($_SESSION['twinfieldAdministrationId']);
            }
            // Redirect the user to the administration URL.
            header('Location: ' . $administrationUrl . '/' . $administration->id);
            exit;

        } catch (\Exception $e) {

            echo 'Fout getAccessToken/getRefreshToken !' . "<br>";
            // Failed to get the access token or user details.

            if ($administration) {
                $administration->twinfield_refresh_token = null;
                $administration->save();
            }

            if (isset($_SESSION['twinfieldAdministrationId'])) {
                unset($_SESSION['twinfieldAdministrationId']);
            }
            exit($e->getMessage());

            
        }
    }
}else{
    if (isset($_SESSION['twinfieldAdministrationId'])) {
        unset($_SESSION['twinfieldAdministrationId']);
    }

}

