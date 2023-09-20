<?php

namespace App\Eco\Mailbox;


use App\Eco\Email\Email;
use App\Helpers\Gmail\GmailConnectionManager;
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


class MailFetcherGmail
{
    use FormatHeaders, HasParts, HasDecodableBody, Attachment, Storage, EmailRelations;

    /**
     * @var Mailbox
     */
    private Mailbox $mailbox;
    private Google_Service_Gmail $gmailService;
    private string $user = 'me';
    private array $fetchedEmails = [];
    private \Google_Service_Gmail_MessagePart $payload;
    private Collection $parts;

    /**
     * @throws Exception
     */
    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;

        $this->initStorageDir();
        $this->initGmailConfig();
    }

    public function fetchNew()
    {
//        Log::info("Check fetchNew mailbox " . $this->mailbox->id);

        if ($this->mailbox->start_fetch_mail != null) {
            return;
        }

        $this->mailbox->start_fetch_mail = Carbon::now();
        $this->mailbox->save();

        if ($this->mailbox->date_last_fetched) {
            $dateLastFetched = Carbon::parse($this->mailbox->date_last_fetched)->subDay()->format('Y-m-d');
        } else {
            $dateLastFetched = Carbon::now()->subDay()->format('Y-m-d');
        }

        try {
            // Get all emails (messages)
            $optParams['labelIds'] = 'INBOX';
            $optParams['q'] = 'after:' . $dateLastFetched;
            $listMessages = $this->service->users_messages->listUsersMessages($this->user, $optParams);
//            Log::info("Search since " . $dateLastFetched . ": " . implode(',', $mailIds));
            $this->processMessages($listMessages);
        } catch (\Google\Service\Exception $ex) {
            Log::error("Geen refresh token verkregen, mailbox " . $this->mailbox->id . " op invalid!");
            Log::error("Gmail connection failed. Error: " . $ex->getMessage());
            $this->mailbox->valid = false;
            $this->mailbox->start_fetch_mail = null;
            $this->mailbox->save();

            return $ex->getMessage();
        }

    }

    private function processMessages(\Google_Service_Gmail_ListMessagesResponse $listMessages): void
    {
        // Check and fetch email
        array_map([$this, 'processMessage'], $listMessages->getMessages());

        $this->mailbox->date_last_fetched = Carbon::now();
        $this->mailbox->start_fetch_mail = null;
        $this->mailbox->save();
    }

    private function processMessage(\Google_Service_Gmail_Message $message): void
    {
        $gmailMessageId = $message->getId();

        if(!Email::whereMailboxId($this->mailbox->id)
            ->whereGmailMessageId($gmailMessageId)
            ->exists()){
            // Fetch the full email
            $this->fetchEmail($gmailMessageId);
        }

    }

    private function initGmailConfig(): void
    {
        $gmailConnectionManager = new GmailConnectionManager($this->mailbox);
        $client = $gmailConnectionManager->connect();

        // Todo improve failure message
        if (!($client instanceof Google_Client) && isset($client['message']) && $client['message'] === 'gmail_unauthorised') {
            throw new Exception('InitGmailConfig: ' . $client['message']);
        }

        $this->service = new Google_Service_Gmail($client);
    }

    private function fetchEmail(string $gmailMessageId)
    {
        $optParamsGet['format'] = 'full';
        $message = $this->service->users_messages->get($this->user, $gmailMessageId, $optParamsGet);

        $messagePayload = $message->getPayload();
        $headers = $this->reformatHeaders($messagePayload->getHeaders());

        $this->payload = $messagePayload;
        if ($this->payload) {
            $this->parts = collect($this->payload->getParts());
        }

        $textHtml = '';
        try {
            $textHtml = $this->getHtmlBody();
        } catch (\Exception $ex) {
            Log::error("Failed to retrieve HtmlBody from email (" . $headers->message_id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex->getMessage());
//            echo "Failed to retrieve :HtmlBody from email (" . $headers->message_id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex->getMessage();
            $this->mailbox->start_fetch_mail = null;
            $this->mailbox->save();
            return;
        }
        $textHtml = $textHtml ?: '';
        // when encoding isn't UTF-8 encode texthtml to utf8.
        $currentEncodingTextHtml = mb_detect_encoding($textHtml, 'UTF-8', true);
        if (false === $currentEncodingTextHtml) {
//            $textHtml = utf8_encode($textHtml);
            $textHtml = mb_convert_encoding($textHtml, 'UTF-8', mb_list_encodings());
        }

        if (strlen($textHtml) > 250000) {
            $textHtml = substr($textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $headers['subject'] ?: '';

        if (strlen($subject) > 250) {
            $subject = substr($subject, 0, 249);
        }

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $headers['from'],
            'to' => $headers['to'],
            'cc' => $headers['cc'] ?? [],
            'bcc' => $headers['bcc'] ?? [],
            'subject' => $subject,
            'html_body' => $textHtml,
            'date_sent' => $headers['date'],
            'folder' => 'inbox',
            'imap_id' => null,
            'gmail_message_id' => $gmailMessageId,
            'message_id' => $headers['message_id'],
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

        $this->storeAttachments($gmailMessageId, $email);

        $this->fetchedEmails[] = $email;
    }

    /**
     * @param bool $raw
     *
     * @return string
     */
    private function getPlainTextBody(bool $raw = false): ?string
    {
        $content = $this->getBody();

        return $raw ? $content : $this->getDecodedBody($content);
    }

    /**
     * Gets the HTML body
     *
     * @param bool $raw
     *
     * @return string
     */
    private function getHtmlBody(bool $raw = false): ?string
    {
        $content = $this->getBody('text/html');

        return $raw ? $content : $this->getDecodedBody($content);
    }

    private function getBody(string $type = 'text/plain')
    {
        $parts = $this->getAllParts($this->parts);

        try {
            if (!$parts->isEmpty()) {
                foreach ($parts as $part) {
                    if ($part->mimeType == $type) {
                        return $part->body->data;
                        //if there are no parts in payload, try to get data from body->data
                    } elseif ($this->payload->body->data) {
                        return $this->payload->body->data;
                    }
                }
            } else {
                return $this->payload->body->data;
            }
        } catch (\Exception $exception) {
            throw new \Exception("Preload or load the single message before getting the body.");
        }

        return null;
    }
}