<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace App\Helpers\MsGraph;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxGmailApiSettings;
use App\Http\Controllers\Controller;
use App\TokenStore\TokenCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;

class MsGraphConnectionManager extends Controller
{
    private Mailbox $mailbox;
    private MailboxGmailApiSettings $gmailApiSettings;
    private GenericProvider $client;

    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;
        $this->gmailApiSettings = $mailbox->gmailApiSettings;
        $this->setClientConfig();
    }

    public function connect()
    {
        $authUrl = $this->client->getAuthorizationUrl();
        Log::info('oauthState: ' . $this->client->getState());
        Log::info('authUrl: ' . $authUrl);
        // Save client state so we can validate in callback
//        session(['oauthState' => $this->client->getState(), 'msGraphMailboxEmail' => $this->mailbox->email]);
        session(['oauthState' => $this->client->getState(), 'msGraphMailboxEmail' => $this->mailbox->email]);

        // Redirect to AAD signin page
        return redirect()->away($authUrl);

//        $redirectUrl = '/oauth/ms-graph/redirect?authUrl=' . $authUrl;
//        Log::info('redirectUrl: ' . $redirectUrl);
//        return redirect()->to($redirectUrl);
//        Log::info( 'komen we hier nog aaa ????????????');

//        return $authUrl;
//        die();
    }

    public function callback(Request $request)
    {
        Log::info(session()->all());
        Log::info(session('oauthState'));
        Log::info(session('msGraphMailboxEmail'));
//        Log::info($request->getSession()->get('msGraphMailboxEmail'));
//        Log::info(session('msGraphMailboxEmail'));
        // Validate state
        $expectedState = session('oauthState');
        $request->session()->forget('oauthState');
        $request->session()->forget('msGraphMailboxEmail');
        $providedState = $request->query('state');

        if (!isset($expectedState)) {
            // If there is no expected state in the session,
            // do nothing and redirect to the home page.
            return redirect('/');
        }

        if (!isset($providedState) || $expectedState != $providedState) {
            return redirect('/')
                ->with('error', 'Invalid auth state')
                ->with('errorDetail', 'The provided auth state did not match the expected value');
        }

        // Authorization code should be in the "code" query param
        $authCode = $request->query('code');
        if (isset($authCode)) {
            // Initialize the OAuth client
            $this->client = new \League\OAuth2\Client\Provider\GenericProvider([
                'clientId'                => config('azure.appId'),
                'clientSecret'            => config('azure.appSecret'),
//                'authTenant'              => config('azure.authTenant'),
                'redirectUri'             => config('azure.redirectUri'),
                'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
                'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
                'urlResourceOwnerDetails' => '',
                'scopes'                  => config('azure.scopes')
            ]);

            // <StoreTokensSnippet>
            try {
                // Make the token request
                $accessToken = $this->client->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);

                $graph = new Graph();
                $graph->setAccessToken($accessToken->getToken());

                $user = $graph->createRequest('GET', '/me?$select=displayName,mail,mailboxSettings,userPrincipalName')
                    ->setReturnType(Model\User::class)
                    ->execute();

                $tokenCache = new TokenCache();
                $tokenCache->storeTokens($accessToken, $user);

                return redirect('/');
            }
                // </StoreTokensSnippet>
            catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                return redirect('/')
                    ->with('error', 'Error requesting access token')
                    ->with('errorDetail', json_encode($e->getResponseBody()));
            }
        }

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
        // Initialize the OAuth client
        $this->client = new \League\OAuth2\Client\Provider\GenericProvider([
            'clientId'                => config('azure.appId'),
            'clientSecret'            => config('azure.appSecret'),
//            'authTenant'              => config('azure.authTenant'),
            'redirectUri'             => config('azure.redirectUri'),
            'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
            'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
            'urlResourceOwnerDetails' => '',
            'scopes'                  => config('azure.scopes'),
        ]);

    }


}
