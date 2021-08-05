<?php


namespace App\Helpers\Gmail;


use Google\Client;
use Google_Client;
use Google_Service_Gmail;
use http\Exception;
use Illuminate\Support\Facades\Response;

class GmailHelper
{
    private $mailbox;

    public function __construct($mailbox)
    {
        $this->mailbox = $mailbox;
    }

    public function connect()
    {
        $gmailApiSettings = $this->mailbox->gmailApiSettings;
        $token = $gmailApiSettings->token;

        $client = new Google_Client();
        $client->setApplicationName('Econobis');
        $client->setScopes([Google_Service_Gmail::GMAIL_MODIFY, Google_Service_Gmail::GMAIL_SEND]);

        $client->setAuthConfig([
            "web" => [
                "client_id" => $gmailApiSettings->client_id,
                "project_id" => $gmailApiSettings->project_id,
                "auth_uri"=> "https://accounts.google.com/o/oauth2/auth",
                "token_uri" => "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url" => "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret" => $gmailApiSettings->client_secret,
                "redirect_uris" => [config('app.url') . 'oauth/gmail/callback']
            ]
        ]);
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');

        $state = ['email' => $this->mailbox->email];

        $client->setState(base64_encode(json_encode($state)));

        // Load previously authorized token from the database, if it exists.
        if ($token != null) {
            $accessToken = json_decode($token, true);
            $client->setAccessToken($accessToken);
        }

        // If there is no previous token or it's expired.
        if ($client->isAccessTokenExpired()) {
            // Refresh the token if possible, else fetch a new one.
            if ($client->getRefreshToken()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            } else {
                // Request authorization from the user.
                return ['message' => 'gmail_unauthorised', 'description' => 'Not authorised for Google Gmail API', 'authUrl' =>  $client->createAuthUrl()];
            }

            // Save token in database
            $gmailApiSettings->token = json_encode($client->getAccessToken());
            $gmailApiSettings->save();
        }

        return $client;
    }
}