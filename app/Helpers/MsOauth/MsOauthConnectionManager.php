<?php

namespace App\Helpers\MsOauth;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxOauthApiSettings;
use App\Http\Controllers\Controller;
use App\TokenStore\TokenCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;
class MsOauthConnectionManager extends Controller
{
    private ?Mailbox $mailbox = null;
    private ?MailboxOauthApiSettings $oauthApiSettings = null;
    private ?Graph $appClient = null;
    private ?GenericProvider $clientProvider = null;

    public function __construct(?Mailbox $mailbox = null)
    {
        if ($mailbox) {
            $this->setMailbox($mailbox);
        }
    }

    public function connect()
    {
        if (!$this->mailbox || !$this->oauthApiSettings) {
            throw new \RuntimeException('Mailbox not set for connect()');
        }

        $options = [];
        $prompt = $this->getAuthPrompt();
        if ($prompt) {
            $options['prompt'] = $prompt;
        }

        $authUrl = $this->clientProvider->getAuthorizationUrl($options);

        $state = $this->clientProvider->getState();

        Cache::put("ms_oauth_state:$state", [
            'mailbox_id' => $this->mailbox->id,
            'created_at' => time(),
        ], now()->addMinutes(10));

        if (app()->environment('local')) {
            Log::info('MS OAuth connect state created', [
                'mailbox_id' => $this->mailbox->id,
                'state' => $state,
            ]);
        }

        return [
            'message' => 'ms_oauth_unauthorised',
            'description' => 'Not authorised for MS oauth API',
            'authUrl' => $authUrl,
        ];

    }

    public function callback(Request $request)
    {
//        Log::info('callback !!');

        // Validate state
        $providedState = (string) $request->query('state', '');
        $stateData = Cache::pull("ms_oauth_state:$providedState"); // pull = lezen + verwijderen

        if (!$stateData) {
            Log::error('OAuth state missing/unknown (cache miss/expired)', [
                'providedState' => $providedState,
            ]);

            $appUrl = config('app.url');
            return redirect("{$appUrl}/#/mailboxen")
                ->with('error', 'Invalid auth state')
                ->with('errorDetail', 'OAuth state missing/expired');
        }

        $mailboxId = $stateData['mailbox_id'] ?? null;
        if (!$mailboxId) {
            Log::error('OAuth state data invalid (no mailbox_id)', ['stateData' => $stateData]);

            $appUrl = config('app.url');
            return redirect("{$appUrl}/#/mailboxen")
                ->with('error', 'Invalid auth state')
                ->with('errorDetail', 'OAuth state data invalid');
        }

        $mailbox = Mailbox::find($mailboxId);
        if (!$mailbox) {
            Log::error('Mailbox not found for OAuth state', ['mailboxId' => $mailboxId]);

            $appUrl = config('app.url');
            return redirect("{$appUrl}/#/mailboxen")
                ->with('error', 'Invalid auth state')
                ->with('errorDetail', 'Mailbox not found');
        }

        // Zorg dat je verderop met de juiste mailbox/settings werkt:
        $this->setMailbox($mailbox);

        if (app()->environment('local')) {
            Log::info('MS OAuth callback state hit', [
                'mailbox_id' => $mailboxId,
                'state' => $providedState,
            ]);
        }

        // Authorization code should be in the "code" query param
        $authCode = $request->query('code');

        if (isset($authCode)) {
            try {
                // Make the token request
                $accessToken = $this->clientProvider->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);

                $this->appClient = new Graph();
                $this->appClient->setAccessToken($accessToken->getToken());

                $msOauthApiSettings = MailboxOauthApiSettings::where('client_id', $this->oauthApiSettings->client_id)
                    ->where('project_id', $this->oauthApiSettings->project_id)->get();
                foreach ($msOauthApiSettings as $msOauthApiSetting) {
                    $msOauthApiSetting->token = json_encode($accessToken);
                    $msOauthApiSetting->save();
                }

                $this->oauthApiSettings->force_reconnect = false;
                $this->oauthApiSettings->force_select_account = false;
                $this->oauthApiSettings->save();

                $this->mailbox->valid = true;
                $this->mailbox->save();

                $appUrl = config('app.url');
                return redirect("{$appUrl}/#/mailbox/{$this->mailbox->id}");
            }
            catch (IdentityProviderException $e) {
                $this->mailbox->valid = false;
                $this->mailbox->save();

                Log::error('Error requesting access token');
                Log::error(json_encode($e->getResponseBody()));

                $appUrl = config('app.url');
                return redirect("{$appUrl}/#/mailbox/{$mailboxId}")
                    ->with('error', 'Error requesting access token')
                    ->with('errorDetail', json_encode($e->getResponseBody()));
            }
        }

        $this->mailbox->valid = false;
        $this->mailbox->save();

        Log::error($request->query('error'));
        Log::error($request->query('error_description'));

        $appUrl = config('app.url');

        return redirect("{$appUrl}/#/mailbox/{$this->mailbox->id}")
            ->with('error', $request->query('error'))
            ->with('errorDetail', $request->query('error_description'));
    }

    public function signout()
    {
        $tokenCache = new TokenCache();
        $tokenCache->clearTokens();
        $appUrl = config('app.url');
        return redirect("{$appUrl}/#/mailboxen");
    }

    private function setMailbox(Mailbox $mailbox): void
    {
        $this->mailbox = $mailbox;
        $this->oauthApiSettings = $mailbox->oauthApiSettings;
        $this->setClientConfig();
    }
    private function setClientConfig()
    {
        // Initialize the OAuth client
        $authority = $this->authorityBase();

        $this->clientProvider = new GenericProvider([
            'clientId'                => $this->oauthApiSettings->client_id,
            'clientSecret'            => $this->oauthApiSettings->client_secret,
            'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
            'urlAuthorize'            => $authority . config('azure.authorizeEndpoint'),
            'urlAccessToken'          => $authority . config('azure.tokenEndpoint'),
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

            $this->setClientConfig();

            try {
                // Make the token request
                $accessToken = $this->clientProvider->getAccessToken('refresh_token', [
                    'refresh_token' => $token['refresh_token']
                ]);
                $this->appClient = new Graph();
                $this->appClient->setAccessToken($accessToken->getToken());

                $msOauthApiSettings = MailboxOauthApiSettings::where('client_id', $this->oauthApiSettings->client_id)
                    ->where('project_id', $this->oauthApiSettings->project_id)->get();
                foreach ($msOauthApiSettings as $msOauthApiSetting) {
                    $msOauthApiSetting->token = json_encode($accessToken);
                    $msOauthApiSetting->save();
                }

                $this->mailbox->valid = true;
                $this->mailbox->save();

                return $this->appClient;
            } catch (IdentityProviderException $e) {
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

    private function authorityBase(): string
    {
        // config('azure.authority') is waarschijnlijk ".../common"
        $defaultAuthority = rtrim((string) config('azure.authority'), '/');

        $tenantId = trim((string) ($this->oauthApiSettings->tenant_id ?? ''));

        if ($tenantId === '') {
            // legacy gedrag behouden
            return $defaultAuthority;
        }

        // vervang trailing "/common" (of "/organizations") door "/{tenantId}"
        // en als er geen herkenbare suffix is: zet hem toch goed
        $defaultAuthority = preg_replace('~/+(common|organizations|consumers)$~i', '', $defaultAuthority);

        return $defaultAuthority . '/' . $tenantId;
    }

    private function getAuthPrompt(): ?string
    {
        if ($this->oauthApiSettings->force_reconnect) {
            return 'login';
        }

        if ($this->oauthApiSettings->force_select_account) {
            return 'select_account';
        }

        return null;
    }
}
