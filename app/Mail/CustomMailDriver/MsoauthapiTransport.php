<?php

namespace App\Mail\CustomMailDriver;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxGmailApiSettings;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use Exception;
use Illuminate\Mail\Transport\Transport;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model\ItemBody;
use Microsoft\Graph\Model\Message;
use Microsoft\Graph\Model\EmailAddress;
use Microsoft\Graph\Model\Recipient;
use Microsoft\Graph\Model\FileAttachment;
use Swift_Mime_SimpleMessage;
use GuzzleHttp\Client;

class MsoauthapiTransport extends Transport
{
    private Mailbox $mailbox;
    private string $user = 'me';
//    private Client $tokenClient;
//    private Graph $graph;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();
        $this->user= $user;
//        $this->tokenClient = new Client();

//        $this->initMsOauthConfig();
    }

    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        $messageGraph = new Message();
        $messageGraph->setSubject( $message->getSubject());
        $body = new ItemBody();
        $body->setContent($message->getBody());
        $body->setContentType('HTML');
        $messageGraph->setBody($body);

        if($message->getTo()) {
            $recipientsTo = array();
            foreach ($message->getTo() as $toEmail => $toName) {
                $emailAddress = new EmailAddress();
                $emailAddress->setAddress($toEmail);
                $emailAddress->setName($toName);
                $recipient = new Recipient();
                $recipient->setEmailAddress($emailAddress);
                array_push($recipientsTo, $recipient);
            }
            $messageGraph->setToRecipients($recipientsTo);
        }

        if($message->getCc()){
            $recipientsCc = array();
            foreach ( $message->getCc() as $ccEmail => $ccName) {
                $emailAddress = new EmailAddress();
                $emailAddress->setAddress($ccEmail);
                $emailAddress->setName($ccName);
                $recipient = new Recipient();
                $recipient->setEmailAddress($emailAddress);
                array_push($recipientsCc, $recipient);
            }
            $messageGraph->setCcRecipients($recipientsCc);

        }

        if($message->getBcc()){
            $recipientsBcc = array();
            foreach ( $message->getBcc() as $bccEmail => $bccName) {
                $emailAddress = new EmailAddress();
                $emailAddress->setAddress($bccEmail);
                $emailAddress->setName($bccName);
                $recipient = new Recipient();
                $recipient->setEmailAddress($emailAddress);
                array_push($recipientsBcc, $recipient);
            }
            $messageGraph->setBccRecipients($recipientsBcc);
        }

// todo oauth WM: attachments toevoegen !

        if($message->getChildren()) {
            $attachments = array();

            foreach ($message->getChildren() as $child) {
                Log::info('Attachment test');
//                Log::info($child);
//                Log::info($child->toString());
                if($child->getHeaders() && $child->getHeaders()->get('content-disposition')){
//                    Log::info($child->getHeaders());
                    $filename = str_replace('attachment; filename=', null, $child->getHeaders()->get('content-disposition')->getFieldBody());
                    Log::info($filename);
//                    Log::info($child->getHeaders()->get('data'));

                    $attachment = new FileAttachment();
                    $attachment->setName($filename);
                    $attachment->setContentBytes(chunk_split(base64_decode("R0lGODdhEAYEAA7")));
                    $attachment->setODataType("#microsoft.graph.fileAttachment");
                    array_push($attachments, $attachment);
                } else {
                    Log::info('Geen headers');
                    Log::info($child->getHeaders());

                }

            }

            $messageGraph->setAttachments($attachments);
        }

        $messageToSend = array ('message' => $messageGraph);

// todo oauth WM: opschonen !
//        LOG::info('messageToSend');
//        LOG::info($messageToSend);
//        return;

        $token = $this->mailbox->gmailApiSettings->token;

// todo oauth WM: opschonen !
//        testje
//        $this::getUserToken();

        if ($token != null) {

//todo oauth WM: opschonen
//
            Log::info('Token in send: ');
            Log::info(json_decode($token, true));

            if (isset(json_decode($token, true)['refresh_token'])) {
                $clientProvider = new GenericProvider([
                    'clientId'                => $this->mailbox->gmailApiSettings->client_id,
                    'clientSecret'            => $this->mailbox->gmailApiSettings->client_secret,
                    'redirectUri'             => config('app.url') . '/' . config('azure.redirectUri'),
                    'urlAuthorize'            => config('azure.authority').config('azure.authorizeEndpoint'),
                    'urlAccessToken'          => config('azure.authority').config('azure.tokenEndpoint'),
                    'urlResourceOwnerDetails' => '',
                    'scopes'                  => config('azure.scopes'),
                ]);

                try {
                    Log::info('Before: accessToken (full): ');
                    Log::info(json_decode($token, true));
                    Log::info('accessToken: ' . json_decode($token, true)['access_token']);
                    Log::info('refreshToken: ' . json_decode($token, true)['refresh_token']);
                    Log::info('tokenExpires: ' . json_decode($token, true)['expires']);

                    Log::info('getAccessToken');
                    // Make the token request
                    $accessToken = $clientProvider->getAccessToken('refresh_token', [
                        'refresh_token' => json_decode($token, true)['refresh_token']
                    ]);
// todo WM oauth: nog testen en opschonen
//
                    Log::info('After: accessToken (full): ' . $accessToken);
                    Log::info('accessToken: ' . $accessToken->getToken());
                    Log::info('refreshToken: ' . $accessToken->getRefreshToken());
                    Log::info('tokenExpires: ' . $accessToken->getExpires());

                    $graph = new Graph();
                    $graph->setAccessToken($accessToken->getToken());

//                Log::info('client_id:  ' . $this->mailbox->gmailApiSettings->client_id );
//                Log::info('project_id:  ' . $this->mailbox->gmailApiSettings->project_id );
//                Log::info('client_secret:  ' . $this->mailbox->gmailApiSettings->client_secret );
                    $msOauthApiSettings = MailboxGmailApiSettings::where('client_id', $this->mailbox->gmailApiSettings->client_id)
                        ->where('project_id', $this->mailbox->gmailApiSettings->project_id)->get();
//                    ->where('client_secret', $this->mailbox->gmailApiSettings->client_secret)->get();
//                Log::info('aantal:  ' . $msOauthApiSettings->count() );
                    foreach ($msOauthApiSettings as $msOauthApiSetting) {
//                    Log::info('Save gmailApiSettings id: ' . $msOauthApiSetting->id);
                        $msOauthApiSetting->token = json_encode($accessToken);
                        $msOauthApiSetting->save();
                    }

                    $this->mailbox->valid = true;
                    $this->mailbox->save();
                }
                catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                    $this->mailbox->valid = false;
                    $this->mailbox->save();

                    Log::error('Error requesting access token (1)');
                    Log::error(json_encode($e->getResponseBody()));

                    return json_encode($e->getResponseBody());
                }
            } else {
                $this->mailbox->valid = false;
                $this->mailbox->save();

                Log::error('Error requesting access token (2)');

                return json_encode('Error requesting access token (2)');
            }

            try {
              $response = $graph->createRequest("POST", "/me/sendmail")
                    ->attachBody($messageToSend)
                    ->execute();

// todo oauth WM: nog iets met response doen ?
//              Log::info('response');
//              Log::info($response->getMessage());

// todo oauth WM: zie wellicht in MailTest ?
//            $mailFolderMessages = $graph->createRequest("GET", "/me/mailFolders/sentItems/messages?\$filter=subject eq '\$message->getSubject()'")
//                ->setReturnType(Model\Message::class)
//                ->execute();
//            $this->assertNotNull($mailFolderMessages);

            } catch (\Exception $e) {
                Log::error('An error occurred: ' . $e->getMessage());
//                print 'An error occurred: ' . $e->getMessage();
                throw new Exception("Fout bij versturen met MS oauth api:".  $e->getMessage());
            }
        }
    }


//    public function getUserToken(): string {
//        Log::info('Test getUserToken');
//
//        // If we already have a user token, just return it
//        // Tokens are valid for one hour, after that it needs to be refreshed
////        if (isset(GraphHelper::$userToken)) {
////            return GraphHelper::$userToken;
////        }
//
//        $tokenRequestUrl = config('azure.authority').config('azure.tokenEndpoint');
//        $token = json_decode($this->tokenClient->post($tokenRequestUrl, [
//            'form_params' => [
//                'client_id'     => config('azure.appId'),
//                'client_secret' => config('azure.appSecret'),
//                'scope' => config('azure.scopes'),
//            ],
//        ])->getBody()->getContents());
//
//        Log::info('token');
//        Log::info($token);
//        Log::info($token->access_token);
//        Log::info($token->expires);


//        // https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-device-code
//        $deviceCodeRequestUrl = config('azure.authority').'/oauth2/v2.0/devicecode';
//        $tokenRequestUrl = config('azure.authority').config('azure.tokenEndpoint');
//
//        // First POST to /devicecode
//        $deviceCodeResponse = json_decode($this->tokenClient->post($deviceCodeRequestUrl, [
//            'form_params' => [
//                'client_id' => $this->mailbox->gmailApiSettings->client_id,
//                'scope' => config('azure.scopes'),
//            ]
//        ])->getBody()->getContents());
//
//        // Display the user prompt
//        Log::info('deviceCodeResponse->message');
//        Log::info($deviceCodeResponse->message);

//        // Response also indicates how often to poll for completion
//        // And gives a device code to send in the polling requests
//        $interval = (int)$deviceCodeResponse->interval;
//        $device_code = $deviceCodeResponse->device_code;
//
//        // Do polling - if attempt times out the token endpoint
//        // returns an error
//        while (true) {
//            sleep($interval);
//
//            // POST to the /token endpoint
//            $tokenResponse = GraphHelper::$tokenClient->post($tokenRequestUrl, [
//                'form_params' => [
//                    'client_id' => GraphHelper::$clientId,
//                    'grant_type' => 'urn:ietf:params:oauth:grant-type:device_code',
//                    'device_code' => $device_code
//                ],
//                // These options are needed to enable getting
//                // the response body from a 4xx response
//                'http_errors' => false,
//                'curl' => [
//                    CURLOPT_FAILONERROR => false
//                ]
//            ]);
//
//            if ($tokenResponse->getStatusCode() == 200) {
//                // Return the access_token
//                $responseBody = json_decode($tokenResponse->getBody()->getContents());
//                GraphHelper::$userToken = $responseBody->access_token;
//                return $responseBody->access_token;
//            } else if ($tokenResponse->getStatusCode() == 400) {
//                // Check the error in the response body
//                $responseBody = json_decode($tokenResponse->getBody()->getContents());
//                if (isset($responseBody->error)) {
//                    $error = $responseBody->error;
//                    // authorization_pending means we should keep polling
//                    if (strcmp($error, 'authorization_pending') != 0) {
//                        throw new Exception('Token endpoint returned '.$error, 100);
//                    }
//                }
//            }
//        }
//    }


    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * @inheritDoc
     */
//    private function initMsOauthConfig(): void
//    {
////todo oauth WM: opschonen
////
//        Log::info('connect in transport');
//        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);
//        $client = $msOauthConnectionManager->connect();
//        Log::info('na connect in transport');
//
//        // Todo improve failure message
//        if (!($client instanceof Graph) && isset($client['message']) && $client['message'] === 'msOauth_unauthorised') {
//            throw new Exception('InitMsOauthConfig: ' . $client['message']);
//        }
//
//    }
}