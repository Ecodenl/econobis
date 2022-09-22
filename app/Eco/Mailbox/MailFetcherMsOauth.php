<?php

namespace App\Eco\Mailbox;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use App\Http\Traits\Email\EmailRelations;
use App\Http\Traits\Email\Storage;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Http\GraphCollectionRequest;
use Microsoft\Graph\Model\Message;
use Microsoft\Graph\Model\Attachment;


class MailFetcherMsOauth
{
    use Storage, EmailRelations;
    /**
     * @var Mailbox
     */
    private Mailbox $mailbox;
    private array $fetchedEmails = [];
    private Collection $parts;
    private Graph $appClient;

    /**
     * @throws Exception
     */
    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;

        $this->initStorageDir();
        $this->initMsOauthConfig();
    }

    public function fetchNew()
    {
//        Log::info("Check fetchNew mailbox " . $this->mailbox->id);

        if ($this->mailbox->date_last_fetched) {
            $dateLastFetched = Carbon::parse($this->mailbox->date_last_fetched)->subDay()->format('Y-m-d');
        } else {
            $dateLastFetched = Carbon::now()->subDay()->format('Y-m-d');
        }

        $dateTime = Carbon::now();
        $moreAvailable = true;

        while ($moreAvailable) {
            try {
                // Only request specific properties
                $select = '$select=internetMessageId,sender,from,toRecipients,ccRecipients,bccRecipients,receivedDateTime,sentDateTime,subject,bodyPreview,body,isRead,hasAttachments';
                // Sort by received time, newest first
                $orderBy = '$orderBy=receivedDateTime DESC';
                $requestUrl = '/users/' . $this->mailbox->gmailApiSettings->project_id. '/mailFolders/inbox/messages?'.$select.'&'.$orderBy;
                $messages = $this->appClient->createCollectionRequest('GET', $requestUrl)
                    ->setReturnType(Message::class)
                    ->setPageSize(25);
                $moreAvailable = $this->processMessages($messages, $dateLastFetched);
            } catch (Exception $e) {
                Log::error('Error getting user\'s inbox: '.$e->getMessage());

                return $e->getMessage();
            }

        }

        $this->mailbox->date_last_fetched = $dateTime;
        $this->mailbox->save();
    }

    private function processMessages(GraphCollectionRequest $listMessages, $dateLastFetched): bool
    {
        foreach ($listMessages->getPage() as $message) {
            $msOauthMessageId = $message->getId();
            $receivedDateTime = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::parse( $message->getReceivedDateTime())->format('Y-m-d H:i:s'), 'UTC');
            $receivedDateTime->setTimezone(date_default_timezone_get());
            if($receivedDateTime >= $dateLastFetched) {
                if (!Email::whereMailboxId($this->mailbox->id)
                    ->whereGmailMessageId($msOauthMessageId)
                    ->exists()) {
                    $this->fetchEmail($message);
                }
            }
        }

        return $listMessages->isEnd() ? false : true;

    }

    private function initMsOauthConfig(): void
    {
        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);
        $this->appClient = $msOauthConnectionManager->setAccessTokenFromRefreshToken();

// todo oauth WM: nog iets met response doen ?
//        if (isset($this->appClient['message']) && $this->appClient['message'] == 'ms_oauth_unauthorised') {
//            Log::info($this->appClient);
//            throw new Exception('InitGmailConfig: ' . $client['message']);
//        }
//
//        // Todo improve failure message
//        if (!($client instanceof Google_Client) && isset($client['message']) && $client['message'] === 'gmail_unauthorised') {
//            throw new Exception('InitGmailConfig: ' . $client['message']);
//        }
//
//        $this->service = new Google_Service_Gmail($client);
    }

    private function fetchEmail(Message $message)
    {
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

        $sentDateTime = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::parse( $message->getSentDateTime())->format('Y-m-d H:i:s'), 'UTC');
        $sentDateTime->setTimezone(date_default_timezone_get());

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $message->getFrom()->getEmailAddress()->getAddress(),
            'to' => $tos,
            'cc' => $ccs,
            'bcc' => $bccs,
            'subject' => $subject,
            'html_body' => $textHtml,
            'date_sent' => $sentDateTime,
            'folder' => 'inbox',
            'imap_id' => null,
            'gmail_message_id' => $message->getId(),
            'message_id' => $message->getInternetMessageId(),
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

        if($message->getHasAttachments()){
            $this->storeAttachments($message->getId(), $email);
        }
//
//        $this->fetchedEmails[] = $email;
    }

    private function storeAttachments(string $messageId, Email $email)
    {
        $requestUrl = '/users/' . $this->mailbox->gmailApiSettings->project_id. '/messages/'.$messageId.'/attachments';
        $requestResult = $this->appClient->createCollectionRequest('GET', $requestUrl)
            ->setReturnType(Attachment::class);
        if($requestResult){
            foreach ($requestResult->getPage() as $attachment){
                $contents = base64_decode( $attachment->getProperties()['contentBytes']);
                $name = $attachment->getName();
                $filename = $this->getAttachmentDBName() . $name;
                $emailAttachment = new EmailAttachment([
                    'filename' => $filename,
                    'name' => $attachment->getName(),
                    'email_id' => $email->id,
                ]);
                $emailAttachment->save();
                \Illuminate\Support\Facades\Storage::disk('mail_attachments')->put($filename, $contents);
            }

        }
    }

}