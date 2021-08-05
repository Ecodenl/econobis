<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\Mailbox;
use App\Http\Controllers\Controller;
use Exception;
use Google\Client;
use Google_Client;
use Google_Service_Gmail;
use http\Header;
use Illuminate\Http\Request;

class GmailController extends Controller
{
    //
    public function auth(Mailbox $mailbox)
    {
        $client = $this->getClient($mailbox);
        $service = new Google_Service_Gmail($client);

        $user = 'me';

//        dd($service->users->getProfile($user));
        $results = $service->users_messages->listUsersMessages($user);

        if($results->resultSizeEstimate > 0) {
            foreach($results->getMessages() as $message) {
                $mail = $service->users_messages->get($user, $message->id);

                dd($mail);
            }
        }

        dd($service->users_messages->listUsersMessages($user));

        // Print the labels in the user's account.
        $results = $service->users_labels->listUsersLabels($user);

        dd($results);
    }

    public function callback(Request $request)
    {
        $client = new Google_Client();
        $client->setApplicationName('Econobis');
        $client->setScopes(Google_Service_Gmail::GMAIL_READONLY);

        $state = json_decode(base64_decode($request->state));

        $mailbox = Mailbox::where('email', $state->email)->first();

        $gmailApiSettings = $mailbox->gmailApiSettings;

        $client->setAuthConfig([
            "web" => [
                "client_id" => $gmailApiSettings->client_id,
                "project_id" => $gmailApiSettings->project_id,
                "auth_uri"=> "https://accounts.google.com/o/oauth2/auth",
                "token_uri" => "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url" => "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret" => $gmailApiSettings->client_secret,
                "redirect_uris" => [config('app.url') . '/oauth/gmail/callback']
            ]
        ]);

        // Exchange authorization code for an access token.
        $accessToken = $client->fetchAccessTokenWithAuthCode($request->code);

        // Check to see if there was an error.
        if (array_key_exists('error', $accessToken)) {
            throw new Exception(join(', ', $accessToken));
        }

        $client->setAccessToken($accessToken);

        $gmailApiSettings->token = json_encode($client->getAccessToken());
        $gmailApiSettings->save();

        // TODO Return to mailbox default page
        $this->auth($mailbox);
    }

    protected function getClient($mailbox)
    {
        $gmailApiSettings = $mailbox->gmailApiSettings;
        $token = $gmailApiSettings->token;

        $client = new Google_Client();
        $client->setApplicationName('Econobis');
        $client->setScopes([Google_Service_Gmail::GMAIL_MODIFY, Google_Service_Gmail::GMAIL_SEND]);

        // TODO get config from database
        $client->setAuthConfig([
            "web" => [
                "client_id" => $gmailApiSettings->client_id,
                "project_id" => $gmailApiSettings->project_id,
                "auth_uri"=> "https://accounts.google.com/o/oauth2/auth",
                "token_uri" => "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url" => "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret" => $gmailApiSettings->client_secret,
                "redirect_uris" => [config('app.url') . '/oauth/gmail/callback']
              ]
        ]);
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');

        $state = ['email' => $mailbox->email];

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
                $authUrl = $client->createAuthUrl();

                header('Location: ' . $authUrl);
                exit;
            }

            // Save token in database
            $gmailApiSettings->token = json_encode($client->getAccessToken());
            $gmailApiSettings->save();
        }
        return $client;
    }
}
