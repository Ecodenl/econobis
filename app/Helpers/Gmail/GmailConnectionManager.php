<?php


namespace App\Helpers\Gmail;


use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxGmailApiSettings;
use Google\Client;
use Google_Client;
use Google_Service_Gmail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class GmailConnectionManager
{
    private Mailbox $mailbox;
    private MailboxGmailApiSettings $gmailApiSettings;
    private Google_Client $client;

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
            $accessToken = json_decode($token, true);
            $this->client->setAccessToken($accessToken);
        }

        // If there is no previous token or it's expired.
        if ($this->client->isAccessTokenExpired()) {
            // Refresh the token if possible, else fetch a new one.
            if ($this->client->getRefreshToken()) {
                $this->client->fetchAccessTokenWithRefreshToken($this->client->getRefreshToken());
            } else {
                $this->mailbox->valid = false;
                $this->mailbox->save();

                // Add mailbox email to state
                $state = ['email' => $this->mailbox->email];
                $this->client->setState(base64_encode(json_encode($state)));

                // Request authorization from the user.
                return ['message' => 'gmail_unauthorised', 'description' => 'Not authorised for Google Gmail API', 'authUrl' =>  $this->client->createAuthUrl()];
            }

            // Save token in database
            $this->storeAccessToken();
        }

        return $this->client;
    }

    public function callback(string $code): bool
    {
        // Exchange authorization code for an access token.
        $accessToken = $this->client->fetchAccessTokenWithAuthCode($code);

        // Check to see if there was an error.
        if (array_key_exists('error', $accessToken)) {
//            throw new Exception('GmailConnectionManager->callback error: ' . join(', ', $accessToken));
            return false;
        }

        $this->client->setAccessToken($accessToken);

        $this->storeAccessToken();

        $this->mailbox->valid = true;
        $this->mailbox->save();

        return true;
    }

    private function setClientConfig()
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName('Econobis');
        $this->client->setScopes([Google_Service_Gmail::GMAIL_MODIFY, Google_Service_Gmail::GMAIL_SEND]);

        $this->client->setAuthConfig([
            "web" => [
                "client_id" => $this->gmailApiSettings->client_id,
                "project_id" => $this->gmailApiSettings->project_id,
                "auth_uri"=> "https://accounts.google.com/o/oauth2/auth",
                "token_uri" => "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url" => "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret" => $this->gmailApiSettings->client_secret,
                "redirect_uris" => [config('app.url') . '/oauth/gmail/callback']
            ]
        ]);
        $this->client->setAccessType('offline');
        $this->client->setPrompt('select_account consent');
    }

    private function storeAccessToken()
    {
        $this->gmailApiSettings->token = json_encode($this->client->getAccessToken());
        $this->gmailApiSettings->save();
    }
}