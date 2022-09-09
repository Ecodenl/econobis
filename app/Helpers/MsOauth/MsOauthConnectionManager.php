<?php

namespace App\Helpers\MsOauth;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxGmailApiSettings;
use App\Http\Controllers\Controller;
use App\TokenStore\TokenCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model\User;

class MsOauthConnectionManager extends Controller
{
    private Mailbox $mailbox;
    private MailboxGmailApiSettings $gmailApiSettings;
    private Graph $graph;

    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;
        $this->gmailApiSettings = $mailbox->gmailApiSettings;
        $this->setClientConfig();
    }

    public function connect()
    {
        $token = $this->gmailApiSettings->token;

        // Load previously authorized token from the database, if it exists.
        if ($token != null) {
            $graph = new Graph();
            $graph->setAccessToken($token);

        }
//todo oauth WM: hier gebleven @@NOG
        $authUrl = $this->client->getAuthorizationUrl();
        // Save client state so we can validate in callback
        // And save mailbox email
        session(['oauthState' => $this->client->getState(), 'msOauthMailboxId' => $this->mailbox->id]);
        return ['message' => 'ms_oauth_unauthorised', 'description' => 'Not authorised for MS oauth API', 'authUrl' =>  $authUrl];
    }

    public function callback(Request $request, Mailbox $mailbox)
    {
        // Validate state
        $expectedState = Session('oauthState');
        $request->session()->forget('oauthState');
        $providedState = $request->query('state');

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
//        Log::info('client_id: ' . $this->gmailApiSettings->client_id);
//        Log::info('client_secret: ' . $this->gmailApiSettings->client_secret);

        if (isset($authCode)) {
            $this->client = new \League\OAuth2\Client\Provider\GenericProvider([
                'clientId'                => $this->gmailApiSettings->client_id,
                'clientSecret'            => $this->gmailApiSettings->client_secret,
                'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
                'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
                'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
                'urlResourceOwnerDetails' => '',
                'scopes'                  => config('azure.scopes'),
            ]);

            try {
//                Log::info('getAccessToken');
                // Make the token request
                $accessToken = $this->client->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);
// todo WM oauth: nog testen en opschonen
//
                Log::info('accessToken (full): ' . $accessToken);
                Log::info('accessToken: ' . $accessToken->getToken());
                Log::info('refreshToken: ' . $accessToken->getRefreshToken());
                Log::info('tokenExpires: ' . $accessToken->getExpires());

                $graph = new Graph();
                $graph->setAccessToken($accessToken->getToken());

                $user = $graph->createRequest('GET', '/me?$select=displayName,mail,mailboxSettings,userPrincipalName')
                    ->setReturnType(User::class)
                    ->execute();

                Log::info('userName: ' . $user->getDisplayName());
                Log::info('userEmail: ' . null !== $user->getMail() ? $user->getMail() : $user->getUserPrincipalName());
                Log::info('userTimeZone: ' . $user->getMailboxSettings()->getTimeZone());
//'accessToken' => $accessToken->getToken(),
//'refreshToken' => $accessToken->getRefreshToken(),
//'tokenExpires' => $accessToken->getExpires(),
//'userName' => $user->getDisplayName(),
//'userEmail' => null !== $user->getMail() ? $user->getMail() : $user->getUserPrincipalName(),
//'userTimeZone' => $user->getMailboxSettings()->getTimeZone()

                $this->gmailApiSettings->token = json_encode($accessToken->getToken());
                $this->gmailApiSettings->save();

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
//        Log::info('client_id uit gmailApiSettigns: ' . $this->gmailApiSettings->client_id);
//        Log::info('client_secret uit gmailApiSettigns: ' . $this->gmailApiSettings->client_secret);
//        Log::info('project_id uit gmailApiSettigns: ' . $this->gmailApiSettings->project_id);

//        Log::info('client_id uit config azure: ' . config('azure.appId'));
//        Log::info('client_secret uit config azure: ' . config('azure.appSecret'));

        // Initialize the OAuth client
        $this->client = new \League\OAuth2\Client\Provider\GenericProvider([
            'clientId'                => $this->gmailApiSettings->client_id,
            'clientSecret'            => $this->gmailApiSettings->client_secret,
            'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
            'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
            'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
            'urlResourceOwnerDetails' => '',
            'scopes'                  => config('azure.scopes'),
        ]);
    }

}
