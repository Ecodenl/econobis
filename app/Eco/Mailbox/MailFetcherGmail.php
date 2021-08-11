<?php

namespace App\Eco\Mailbox;


use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\EmailAddress\EmailAddress;
use App\Helpers\Gmail\GmailConnectionManager;
use App\Http\Traits\GmailApi\FormatHeaders;
use App\Http\Traits\GmailApi\HasDecodableBody;
use App\Http\Traits\GmailApi\HasParts;
use Carbon\Carbon;
use Exception;
use Google_Client;
use Google_Service_Gmail;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Storage;

class MailFetcherGmail
{
    use FormatHeaders, HasParts, HasDecodableBody;

    /**
     * @var Mailbox
     */
    private Mailbox $mailbox;
    private Google_Service_Gmail $gmailService;
    private string $user = 'me';
    private array $fetchedEmails = [];
    private $payload;
    private $parts;

    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;

        $this->initStorageDir();
        $this->initGmailConfig();
    }

    public function fetchNew()
    {
//        Log::info("Check fetchNew mailbox " . $this->mailbox->id);

        if ($this->mailbox->date_last_fetched) {
            $dateLastFetched = Carbon::parse($this->mailbox->date_last_fetched)->format('Y-m-d');
        } else {
            $dateLastFetched = Carbon::now()->format('Y-m-d');
        }

        $dateTime = Carbon::now();

        try {
            // Get all emails (messages)
            $optParams['labelIds'] = 'INBOX';
            $optParams['q'] = 'after:' . $dateLastFetched;
            $listMessages = $this->service->users_messages->listUsersMessages($this->user, $optParams);
//            Log::info("Search since " . $dateLastFetched . ": " . implode(',', $mailIds));
        } catch (\Google\Service\Exception $ex) {
            echo "Gmail connection failed: " . $ex;
            die();
        }

        $this->processMessages($listMessages);
    }

    private function processMessages(\Google_Service_Gmail_ListMessagesResponse $listMessages): void
    {
        // Check and fetch email
        array_map([$this, 'processMessage'], $listMessages->getMessages());

        $this->mailbox->date_last_fetched = Carbon::now();
        $this->mailbox->save();
    }

    private function processMessage(\Google_Service_Gmail_Message $message): void
    {
        $messageId = $message->getId();

        // TODO Check if message_id already exists in database, then continue


        // Fetch the full email
        $this->fetchEmail($messageId);
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

    private function initStorageDir()
    {
        $storageDir = $this->getStorageDir();

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    /**
     * @return string
     */
    private function getStorageDir()
    {
        return $this->getStorageRootDir() . DIRECTORY_SEPARATOR . 'mailbox_' . $this->mailbox->id . DIRECTORY_SEPARATOR . 'inbox';
    }

    /**
     * @return string
     */
    private function getAttachmentDBName()
    {
        return 'mailbox_' . $this->mailbox->id . DIRECTORY_SEPARATOR . 'inbox' . DIRECTORY_SEPARATOR;
    }

    /**
     * @return string
     */
    private function getStorageRootDir()
    {
        return Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix();
    }

    private function fetchEmail(string $messageId)
    {
        $optParamsGet['format'] = 'full';
        $message = $this->service->users_messages->get($this->user, $messageId, $optParamsGet);

        $messagePayload = $message->getPayload();
        $headers = $this->reformatHeaders($messagePayload->getHeaders());

        $this->payload = $message->getPayload();
        if ($this->payload) {
            $this->parts = collect($this->payload->getParts());
        }

        $textHtml = '';
        try {
            // TODO check if there is a need to lookup for html or txt/plain
//            if ($emailData->textHtml) {
                $textHtml = $this->getHtmlBody();
//            } else {
//                if ($emailData->textPlain) {
//                    $textHtml = nl2br($this->getPlainTextBody());
//                }
//            }
        } catch (\Exception $ex) {
            Log::error("Failed to retrieve textHtml or textPlain from email (" . $headers->message_id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex->getMessage());
            echo "Failed to retrieve textHtml or textPlain from email (" . $headers->message_id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex->getMessage();
            return;
        }
        $textHtml = $textHtml ?: '';
        // when encoding isn't UTF-8 encode texthtml to utf8.
        $currentEncodingTextHtml = mb_detect_encoding($textHtml, 'UTF-8', true);
        if (false === $currentEncodingTextHtml) {
            $textHtml = utf8_encode($textHtml);
        }

        if (strlen($textHtml) > 250000) {
            $textHtml = substr($emailData->textHtml, 0, 250000);
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
            'message_id' => $headers['message_id'],
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

//        foreach ($emailData->getAttachments() as $attachment) {
//            $name = substr($attachment->filePath, strrpos($attachment->filePath, DIRECTORY_SEPARATOR) + 1);
//
//            $filename = $this->getAttachmentDBName() . $name;
//
//            $emailAttachment = new EmailAttachment([
//                'filename' => $filename,
//                'name' => $attachment->name,
//                'email_id' => $email->id,
//            ]);
//            $emailAttachment->save();
//        }

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

    public function addRelationToContacts(Email $email)
    {

        //soms niet koppelen
        $mailboxIgnores = $email->mailbox->mailboxIgnores;

        foreach ($mailboxIgnores as $ignore) {
            switch ($ignore->type_id) {
                case 'e-mail':
                    if ($ignore->value === $email->from) {
                        return false;
                    }
                    break;
                case 'domain':
                    $domain = preg_replace('!^.+?([^@]+)$!', '$1', $email->from);
                    if ($ignore->value === $domain) {
                        return false;
                    }
                    break;
            }
        }

        $emailAddressesIds = [];
        // Link contact from email to address
        if ($email->mailbox->link_contact_from_email_to_address) {
            if (!empty($email->to)) {
                $emailAddressesIds = EmailAddress::where('email', $email->to)->pluck('contact_id')->toArray();
            }
            // Link contact from email from address
        } else {
            if (!empty($email->from)) {
                $emailAddressesIds = EmailAddress::where('email', $email->from)->pluck('contact_id')->toArray();
            }
        }

        if (!empty($emailAddressesIds)) {
            //If contact has twice same emailaddress
            $uniqueEmailAddressesIds = array_unique($emailAddressesIds);
            $email->contacts()->attach($uniqueEmailAddressesIds);
        }
    }
}