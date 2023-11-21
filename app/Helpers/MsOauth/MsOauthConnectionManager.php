<?php

namespace App\Helpers\MsOauth;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxOauthApiSettings;
use App\Http\Controllers\Controller;
use App\TokenStore\TokenCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;

class MsOauthConnectionManager extends Controller
{
    private Mailbox $mailbox;
    private MailboxOauthApiSettings $oauthApiSettings;
    private Graph $appClient;
    private GenericProvider $clientProvider;

    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;
        $this->oauthApiSettings = $mailbox->oauthApiSettings;
        $this->setClientConfig();
    }

    public function connect()
    {
        $token = $this->oauthApiSettings->token;

        if ($token != null) {
//todo oauth WM: opschonen
//
//            Log::info('Token in connect: ');
//            Log::info(json_decode($token, true));

            $this->appClient = new Graph();
            $this->appClient->setAccessToken($token);

        } else {
            Log::info('Token null !!');

        }

        $authUrl = $this->clientProvider->getAuthorizationUrl();
        // Save client state so we can validate in callback
        // And save mailbox email
        session(['oauthState' => $this->clientProvider->getState(), 'msOauthMailboxId' => $this->mailbox->id]);
        return ['message' => 'ms_oauth_unauthorised', 'description' => 'Not authorised for MS oauth API', 'authUrl' =>  $authUrl];
    }

    public function callback(Request $request, Mailbox $mailbox)
    {
        Log::info('callback !!');

        // Validate state
        $expectedState = Session('oauthState');
        $request->session()->forget('oauthState');
        $providedState = $request->query('state');
// todo WM oauth: opschonen
//
//        Log::info('expectedState: ' . $expectedState);
//        Log::info('providedState: ' . $providedState);

        if (!isset($expectedState)) {
            // If there is no expected state in the session,
            // do nothing and redirect to the home page.
            return redirect('/');
        }

        if (!isset($providedState) || $expectedState != $providedState) {
            Log::error('The provided auth state did not match the expected value');

            return redirect('/')
                ->with('error', 'Invalid auth state')
                ->with('errorDetail', 'The provided auth state did not match the expected value');
        }

        // Authorization code should be in the "code" query param
        $authCode = $request->query('code');
// todo WM oauth: nog testen en opschonen
//
//        Log::info('authCode: ' . $authCode);
//        Log::info('client_id: ' . $this->oauthApiSettings->client_id);
//        Log::info('client_secret: ' . $this->oauthApiSettings->client_secret);

        if (isset($authCode)) {
            $this->clientProvider = new GenericProvider([
                'clientId'                => $this->oauthApiSettings->client_id,
                'clientSecret'            => $this->oauthApiSettings->client_secret,
                'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
                'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
                'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
                'urlResourceOwnerDetails' => '',
                'scopes'                  => config('azure.scopes'),
            ]);

            try {
//                Log::info('getAccessToken');
                // Make the token request
                $accessToken = $this->clientProvider->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);
// todo WM oauth: nog testen en opschonen
//
//                Log::info('accessToken (full): ' . $accessToken);
//                Log::info('accessToken: ' . $accessToken->getToken());
//                Log::info('refreshToken: ' . $accessToken->getRefreshToken());
//                Log::info('tokenExpires: ' . $accessToken->getExpires());

                $this->appClient = new Graph();
                $this->appClient->setAccessToken(json_encode($accessToken));

                Log::info('accessToken (json_encode): ' . json_encode($accessToken));

//                Log::info('client_id:  ' . $this->oauthApiSettings->client_id );
//                Log::info('project_id:  ' . $this->oauthApiSettings->project_id );
//                Log::info('client_secret:  ' . $this->oauthApiSettings->client_secret );
                $msOauthApiSettings = MailboxOauthApiSettings::where('client_id', $this->oauthApiSettings->client_id)
                    ->where('project_id', $this->oauthApiSettings->project_id)->get();
//                    ->where('client_secret', $this->oauthApiSettings->client_secret)->get();
//                Log::info('aantal:  ' . $msOauthApiSettings->count() );
                foreach ($msOauthApiSettings as $msOauthApiSetting) {
//                    Log::info('Save oauthApiSettings id: ' . $msOauthApiSetting->id);
                    $msOauthApiSetting->token = json_encode($accessToken);
                    $msOauthApiSetting->save();
                }

                $this->mailbox->valid = true;
                $this->mailbox->save();

                return redirect('/');
            }
            catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                $this->mailbox->valid = false;
                $this->mailbox->save();

                Log::error('Error requesting access token');
                Log::error(json_encode($e->getResponseBody()));

                return redirect('/')
                    ->with('error', 'Error requesting access token')
                    ->with('errorDetail', json_encode($e->getResponseBody()));
            }
        }

        $this->mailbox->valid = false;
        $this->mailbox->save();

        Log::error($request->query('error'));
        Log::error($request->query('error_description'));

        return redirect('/')
            ->with('error', $request->query('error'))
            ->with('errorDetail', $request->query('error_description'));
    }

    // <SignOutSnippet>
    public function signout()
    {
        $tokenCache = new TokenCache();
        $tokenCache->clearTokens();
        return redirect('/');
    }
    // </SignOutSnippet>

    private function setClientConfig()
    {
// todo WM oauth: nog testen en opschonen
//
//        Log::info('client_id uit oauthApiSettings: ' . $this->oauthApiSettings->client_id);
//        Log::info('client_secret uit oauthApiSettings: ' . $this->oauthApiSettings->client_secret);
//        Log::info('project_id uit oauthApiSettings: ' . $this->oauthApiSettings->project_id);

//        Log::info('client_id uit config azure: ' . config('azure.appId'));
//        Log::info('client_secret uit config azure: ' . config('azure.appSecret'));

        // Initialize the OAuth client
        $this->clientProvider = new GenericProvider([
            'clientId'                => $this->oauthApiSettings->client_id,
            'clientSecret'            => $this->oauthApiSettings->client_secret,
            'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
            'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
            'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
            'urlResourceOwnerDetails' => '',
            'scopes'                  => config('azure.scopes'),
        ]);
    }

    /**
     * @param $token
     * @return array
     */
    public function setAccessTokenFromRefreshToken()
    {
        $token = json_decode($this->oauthApiSettings->token, true);
        if (isset($token['refresh_token'])) {

            $clientProvider = new GenericProvider([
                'clientId' => $this->oauthApiSettings->client_id,
                'clientSecret' => $this->oauthApiSettings->client_secret,
                'redirectUri' => config('app.url') . '/' . config('azure.redirectUri'),
                'urlAuthorize' => config('azure.authority') . config('azure.authorizeEndpoint'),
                'urlAccessToken' => config('azure.authority') . config('azure.tokenEndpoint'),
                'urlResourceOwnerDetails' => '',
                'scopes' => config('azure.scopes'),
            ]);

            try {
                // Make the token request
                $accessToken = $clientProvider->getAccessToken('refresh_token', [
                    'refresh_token' => $token['refresh_token']
                ]);
                $appClient = new Graph();
                $appClient->setAccessToken($accessToken->getToken());

                $msOauthApiSettings = MailboxOauthApiSettings::where('client_id', $this->oauthApiSettings->client_id)
                    ->where('project_id', $this->oauthApiSettings->project_id)->get();
//                    ->where('client_secret', $this->oauthApiSettings->client_secret)->get();
//                Log::info('aantal:  ' . $msOauthApiSettings->count() );
                foreach ($msOauthApiSettings as $msOauthApiSetting) {
//                    Log::info('Save oauthApiSettings id: ' . $msOauthApiSetting->id);
                    $msOauthApiSetting->token = json_encode($accessToken);
                    $msOauthApiSetting->save();
                }

                $this->mailbox->valid = true;
                $this->mailbox->save();

                return $appClient;
            } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                $this->mailbox->valid = false;
                $this->mailbox->save();

                Log::error('Error requesting access token (1) for mailbox: ' . $this->mailbox->id);
                Log::error(json_encode($e->getResponseBody()));

//                return json_encode($e->getResponseBody());
            }
        } else {
            $this->mailbox->valid = false;
            $this->mailbox->save();

            Log::error('Error requesting access token (2) for mailbox: ' . $this->mailbox->id);

//            return json_encode('Error requesting access token (2)');
        }

    }

}
