<?php

namespace App\Eco\Mailbox;


use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\EmailAddress\EmailAddress;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use App\Http\Traits\Email\EmailRelations;
use App\Http\Traits\Email\Storage;
use App\Http\Traits\GmailApi\Attachment;
use App\Http\Traits\GmailApi\FormatHeaders;
use App\Http\Traits\GmailApi\HasDecodableBody;
use App\Http\Traits\GmailApi\HasParts;
use Carbon\Carbon;
use Exception;
use Google_Client;
use Google_Service_Gmail;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Http\GraphCollectionRequest;
use Microsoft\Graph\Model\Message;
use Microsoft\Graph\Model\User;


class MailFetcherMsOauth
{
    use FormatHeaders, HasParts, HasDecodableBody, Attachment, Storage, EmailRelations;

    /**
     * @var Mailbox
     */
    private Mailbox $mailbox;
    private array $fetchedEmails = [];
    private Collection $parts;

    /**
     * @throws Exception
     */
    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;

        $this->initStorageDir();
//        $this->initMsOauthConfig();
    }

    public function fetchNew()
    {
        Log::info("Check fetchNew mailbox " . $this->mailbox->id);

        if ($this->mailbox->date_last_fetched) {
            $dateLastFetched = Carbon::parse($this->mailbox->date_last_fetched)->subDay()->format('Y-m-d');
        } else {
            $dateLastFetched = Carbon::now()->subDay()->format('Y-m-d');
        }

        $dateTime = Carbon::now();

        $token = $this->mailbox->gmailApiSettings->token;

        $moreAvailable = true;

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

//        $graph = new Graph();
////todo oauth WM: opschonen
////
////                Log::info('Access token: ');
////                Log::info(json_decode($token, true)['access_token']);
////                Log::info('Expires: ');
////                Log::info(json_decode($token, true)['expires'] . ' - ' . Carbon::parse(json_decode($token, true)['expires']));
////                Log::info('Refresh token: ');
////                Log::info(json_decode($token, true)['refresh_token']);
//
//        $graph->setAccessToken(json_decode($token, true)['access_token']);
//
//        $user = $graph->createRequest('GET', '/me?$select=displayName,mail,mailboxSettings,userPrincipalName')
//            ->setReturnType(User::class)
//            ->execute();

// todo WM oauth: opschonen
//
//        Log::info('userId: ' . $user->getId());
//        Log::info('userName: ' . $user->getDisplayName());
//        Log::info('principalName: ' . $user->getUserPrincipalName());
//        Log::info('userEmail: ' . null !== $user->getMail() ? $user->getMail() : $user->getUserPrincipalName());
//        Log::info('userTimeZone: ' . $user->getMailboxSettings()->getTimeZone());

        while ($moreAvailable) {
            try {
                // Only request specific properties
                $select = '$select=internetMessageId,sender,from,toRecipients,ccRecipients,bccRecipients,receivedDateTime,sentDateTime,subject,bodyPreview,body,isRead,hasAttachments';
                // Sort by received time, newest first
                $orderBy = '$orderBy=receivedDateTime DESC';
                $requestUrl = '/me/mailFolders/inbox/messages?'.$select.'&'.$orderBy;
//                $requestUrl = '/users/' . $user->getId() . '/mailFolders/inbox/messages?'.$select.'&'.$orderBy;

                Log::info("createCollectionRequest ");

                $messages = $graph->createCollectionRequest('GET', $requestUrl)
                    ->setReturnType(Message::class)
                    ->setPageSize(25);

                $moreAvailable = $this->processMessages($messages);
            } catch (Exception $e) {
                Log::error('Error getting user\'s inbox: '.$e->getMessage());
//                $this->mailbox->valid = false;
//                $this->mailbox->save();

                return $e->getMessage();

            }

        }

        $this->mailbox->date_last_fetched = $dateTime;
        $this->mailbox->save();
    }

    private function processMessages(GraphCollectionRequest $listMessages): bool
    {
        foreach ($listMessages->getPage() as $message) {
            $msOauthMessageId = $message->getId();
//todo oauth WM: opschonen
//        Log::info('Message: '.$message->getSubject());
//        Log::info('  Sender: '.$message->getSender()->getEmailAddress()->getAddress());
//        Log::info('  From: '.$message->getFrom()->getEmailAddress()->getAddress());

            if(!Email::whereMailboxId($this->mailbox->id)
                ->whereGmailMessageId($msOauthMessageId)
                ->exists()){
                $this->fetchEmail($message);
            }
        }

        return $listMessages->isEnd() ? false : true;

    }

//    private function initMsOauthConfig(): void
//    {
//        Log::info('Hallo initMsOauthConfig');
//        $gmailConnectionManager = new MsOauthConnectionManager($this->mailbox);
//        $this->authUrl = $gmailConnectionManager->connectWithRefresh();
//        Log::info('Na connect, komen we hier ????');
//        if (isset($client['message']) && $client['message'] == 'ms_oauth_unauthorised') {
//            Log::info($client);
////            return response()->json($client, 401);
//        }
////
////        // Todo improve failure message
////        if (!($client instanceof Google_Client) && isset($client['message']) && $client['message'] === 'gmail_unauthorised') {
////            throw new Exception('InitGmailConfig: ' . $client['message']);
////        }
////
////        $this->service = new Google_Service_Gmail($client);
//    }

    private function fetchEmail(Message $message)
    {
//        $messagePayload = $message->getPayload();
//        $headers = $this->reformatHeaders($messagePayload->getHeaders());
//
//        $this->payload = $messagePayload;
//        if ($this->payload) {
//            $this->parts = collect($this->payload->getParts());
//        }

// Output each message's details
//            "id": "AAMkAGVmMDEzMTM4LTZmYWUtNDdkNC1hMDZiLTU1OGY5OTZhYmY4OABGAAAAAAAiQ8W967B7TKBjgx9rVEURBwAiIsqMbYjsT5e-T7KzowPTAAAAAAEMAAAiIsqMbYjsT5e-T7KzowPTAATGXiGiAAA=",
//            "createdDateTime": "2022-09-05T15:14:45Z",
//            "lastModifiedDateTime": "2022-09-05T15:19:48Z",
//            "changeKey": "CQAAABYAAAAiIsqMbYjsT5e/T7KzowPTAATFi0K6",
//            "categories": [],
//            "receivedDateTime": "2022-09-05T15:14:46Z",
//            "sentDateTime": "2022-09-05T15:14:46Z",
//            "hasAttachments": false,
//            "internetMessageId": "<SJ0PR15MB524545A0C167DF7E56FD2B78CD7F9@SJ0PR15MB5245.namprd15.prod.outlook.com>",
//            "subject": "Your digest email",
//            "bodyPreview": "Private to youHi, Megan Bowen,Discover trends in your work habitsAn in-depth look at your work patterns in the last four weeksSomething to considerAugust 7 – September 3In a typical week, you spend about 12 hours in meetings, most of",
//            "importance": "normal",
//            "parentFolderId": "AAMkAGVmMDEzMTM4LTZmYWUtNDdkNC1hMDZiLTU1OGY5OTZhYmY4OAAuAAAAAAAiQ8W967B7TKBjgx9rVEURAQAiIsqMbYjsT5e-T7KzowPTAAAAAAEMAAA=",
//            "conversationId": "AAQkAGVmMDEzMTM4LTZmYWUtNDdkNC1hMDZiLTU1OGY5OTZhYmY4OAAQABCZt7xowNdOgTvSp1Ru0Ig=",
//            "conversationIndex": "AQHYwTo7EJm3vGjA106BO9KnVG7QiA==",
//            "isDeliveryReceiptRequested": false,
//            "isReadReceiptRequested": false,
//            "isRead": false,
//            "isDraft": false,
//            "webLink": "https://outlook.office365.com/owa/?ItemID=AAMkAGVmMDEzMTM4LTZmYWUtNDdkNC1hMDZiLTU1OGY5OTZhYmY4OABGAAAAAAAiQ8W967B7TKBjgx9rVEURBwAiIsqMbYjsT5e%2FT7KzowPTAAAAAAEMAAAiIsqMbYjsT5e%2FT7KzowPTAATGXiGiAAA%3D&exvsurl=1&viewmodel=ReadMessageItem",
//            "inferenceClassification": "focused",
//            "body": {
//            "contentType": "html",
//                "content": "<html lang=

//todo oauth WM: opschonen
//
//        Log::info('  internetMessageId: '.$message->getInternetMessageId());
//        Log::info('Message: '.$message->getSubject());
//        Log::info('  Sender: '.$message->getSender()->getEmailAddress()->getAddress());
//        Log::info('  From: '.$message->getFrom()->getEmailAddress()->getAddress());
//        Log::info('  To\'s: '.$message->getToRecipients());
//        Log::info('  To\'s: ');
//        Log::info(json_decode(json_encode($message->getToRecipients()), true));
        $tos = [];
        if($message->getToRecipients()){
            foreach ($message->getToRecipients() as $toRecipient){
                $tos[] = $toRecipient['emailAddress']['address'];
            }
        }
        $ccs = [];
        if($message->getCcRecipients()){
            foreach ($message->getCcRecipients() as $ccRecipient){
                $ccs[] = $ccRecipient['emailAddress']['address'];
            }
        }
        $bccs = [];
        if($message->getBccRecipients()){
            foreach ($message->getBccRecipients() as $bccRecipient){
                $bccs[] = $bccRecipient['emailAddress']['address'];
            }
        }
//todo oauth WM: opschonen
//
//        Log::info('  From: '.$message->getFrom()->getEmailAddress()->getName());
//        $status = $message->getIsRead() ? "Read" : "Unread";
//        Log::info('  Status: '.$status);
//        Log::info('  Received: '.$message->getReceivedDateTime()->format(\DateTimeInterface::RFC2822));
//        Log::info('  receivedDateTime formated: '. Carbon::parse( $message->getReceivedDateTime() ));
//        Log::info('  sentDateTime formated: '. Carbon::parse( $message->getSentDateTime() ));
//        Log::info('  hasAttachments: '. $message->getHasAttachments());
//        Log::info('  subject: '. $message->getSubject() );
//        Log::info('  body preview: '. $message->getBodyPreview());
//
//        Log::info('  body content: ');
//        Log::info(json_decode(json_encode($message->getBody()), true)['contentType']);
//        Log::info('  body : ');
//        Log::info($message->getBody()->getContent());

        $textHtml = '';
        try {
            $textHtml = $message->getBody()->getContent();
        } catch (\Exception $ex) {
            Log::error("Failed to retrieve HtmlBody from email (" . $message->getId() . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex->getMessage());
            return;
        }
        $textHtml = $textHtml ?: '';
        // when encoding isn't UTF-8 encode texthtml to utf8.
        $currentEncodingTextHtml = mb_detect_encoding($textHtml, 'UTF-8', true);
        if (false === $currentEncodingTextHtml) {
            $textHtml = utf8_encode($textHtml);
        }

        if (strlen($textHtml) > 250000) {
            $textHtml = substr($textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $message->getSubject() ?: '';

        if (strlen($subject) > 250) {
            $subject = substr($subject, 0, 249);
        }

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $message->getFrom()->getEmailAddress()->getAddress(),
            'to' => $tos,
            'cc' => $ccs,
            'bcc' => $bccs,
            'subject' => $subject,
            'html_body' => $textHtml,
            'date_sent' => Carbon::parse( $message->getSentDateTime() ),
            'folder' => 'inbox',
            'imap_id' => null,
            'gmail_message_id' => $message->getId(),
            'message_id' => $message->getInternetMessageId(),
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

// todo oauth WM: attachments toevoegen !
//
//        $this->storeAttachments($gmailMessageId, $email);
//
//        $this->fetchedEmails[] = $email;
    }

    /**
     * @param bool $raw
     *
     * @return string
     */
//    private function getPlainTextBody(bool $raw = false): ?string
//    {
//        $content = $this->getBody();
//
//        return $raw ? $content : $this->getDecodedBody($content);
//    }

    /**
     * Gets the HTML body
     *
     * @param bool $raw
     *
     * @return string
     */
//    private function getHtmlBody(bool $raw = false): ?string
//    {
//        $content = $this->getBody('text/html');
//
//        return $raw ? $content : $this->getDecodedBody($content);
//    }
//
//    private function getBody(string $type = 'text/plain')
//    {
//        $parts = $this->getAllParts($this->parts);
//
//        try {
//            if (!$parts->isEmpty()) {
//                foreach ($parts as $part) {
//                    if ($part->mimeType == $type) {
//                        return $part->body->data;
//                        //if there are no parts in payload, try to get data from body->data
//                    } elseif ($this->payload->body->data) {
//                        return $this->payload->body->data;
//                    }
//                }
//            } else {
//                return $this->payload->body->data;
//            }
//        } catch (\Exception $exception) {
//            throw new \Exception("Preload or load the single message before getting the body.");
//        }
//
//        return null;
//    }
}