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
//    private array $fetchedEmails = [];
    private Collection $parts;
    private Graph $appClient;
    private $errorAppClientInitialization = false;

    /**
     * @throws Exception
     */
    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;
    }

    /**
     * Fetches new emails and returns a structured response:
     * - On success: ['status' => 'success', 'imapIdLastFetched' => int|null]
     * - On error:   ['status' => 'error', 'errorMessage' => string]
     */
    public function fetchNew() :mixed
    {
        // todo: tijdelijk log voor testen
//        Log::info("Check fetchNew mailbox " . $this->mailbox->id);

        if ($this->mailbox->only_outgoing_mailbox) {
            return [
                'status' => 'success',
                'imapIdLastFetched' => null,
            ];
        }

        $this->ensureStorageDir();
        $this->ensureGraphClient();

        if($this->errorAppClientInitialization){
            $errorMessage = "Initialization Graph client was not successfully! Mailbox id: " . $this->mailbox->id;
//            Log::error($errorMessage);
            return [
                'status' => 'error',
                'errorMessage' => $errorMessage,
            ];
        }

        $dateLastFetched = $this->mailbox->date_last_fetched
            ? Carbon::parse($this->mailbox->date_last_fetched)->subDay()
            : Carbon::now()->subDay();

        // Graph filter gebruikt UTC, dus maak een UTC start-of-day
        $dateLastFetchedUtc = $dateLastFetched->copy()->setTimezone('UTC')->startOfDay();

        try {
            $select  = '$select=internetMessageId,sender,from,toRecipients,ccRecipients,bccRecipients,receivedDateTime,sentDateTime,subject,bodyPreview,body,isRead,hasAttachments';
            $orderBy = '$orderby=receivedDateTime DESC';
            $filter  = '$filter=receivedDateTime ge ' . $dateLastFetchedUtc->format('Y-m-d\TH:i:s\Z');
            $top     = '$top=200';

            $targetUser = trim((string) $this->mailbox->oauthApiSettings->project_id);
            $url = "/users/{$targetUser}/mailFolders/inbox/messages?"
                . $select . '&' . $filter . '&' . $orderBy . '&' . $top;

            $seenNextLinks = [];

            // todo: tijdelijk max-loop guard voor testen
//            $maxPages = 5;
//            $pageCounter = 0;

            while (true) {
                // todo: tijdelijk log voor testen
//                Log::info("Fetching page for mailbox {$this->mailbox->id}");

                // todo: tijdelijk max-loop guard voor testen
//                $pageCounter++;
//                if ($pageCounter > $maxPages) {
//                    Log::warning("Test guard hit: maxPages reached");
//                    break;
//                }

                // 1) Execute request -> GraphResponse
                $response = $this->appClient->createRequest('GET', $url)->execute();

                // 2) Body uitlezen
                $body = $response->getBody();           // array
                if (is_string($body)) {
                    // todo: WM log later opschonen.
                    Log::info('body is string, dan eerst nog een fix');
                    $body = json_decode($body, true) ?: [];
                }
                $items = $body['value'] ?? [];          // array van messages (arrays)

                // todo: tijdelijk log voor testen
//                Log::info('dateLastFetched: ' . $dateLastFetched);
//                Log::info('Aantal messages: ' . count($items) );

                // 3) Hydrate naar Message objects en verwerk
                $continue = $this->processMessagesArray($items, $dateLastFetchedUtc);
                if (!$continue) {
                    break; // cutoff bereikt
                }

                // 4) nextLink ophalen (via body of via helper)
                $nextLink = $body['@odata.nextLink'] ?? $body['@odata.nextlink'] ?? null;

                // of als jouw $response echt GraphResponse is met getNextLink():
                // $nextLink = $response->getNextLink();

                if (empty($nextLink)) {
                    break; // klaar, geen volgende pagina
                }

                // infinite-loop safety
                if (isset($seenNextLinks[$nextLink])) {
                    Log::error("Paging loop detected (same nextLink repeated) mailbox {$this->mailbox->id}");
                    break;
                }
                $seenNextLinks[$nextLink] = true;

                // nextLink is meestal volledige URL; de SDK accepteert die gewoon als request URL
                $url = $nextLink;
            }

        } catch (Exception $e) {
//            $errorMessage = "Error mailbox " . $this->mailbox->id . " getting user's inbox: " . $e->getMessage();
//                Log::error($errorMessage);
            return [
                'status' => 'error',
                'errorMessage' => "Error mailbox {$this->mailbox->id} getting user's inbox: {$e->getMessage()}",
            ];
        }
//        }

        return [
            'status' => 'success',
            'imapIdLastFetched' => null,
        ];

    }

    private function ensureStorageDir(): void
    {
        $this->initStorageDir();
    }

    private function ensureGraphClient(): void
    {
        if ($this->errorAppClientInitialization) {
            return;
        }

        if (isset($this->appClient)) {
            return;
        }

        $this->initMsOauthConfig();
    }

    private function processMessagesArray(array $items, Carbon $dateLastFetchedUtc): bool
    {
        foreach ($items as $item) {
            // Hydrate naar Message object
            $message = new Message($item);

            $messageId = $message->getInternetMessageId();
            $receivedUtc = Carbon::parse($message->getReceivedDateTime())->setTimezone('UTC');

            // DESC: zodra ouder dan cutoff => klaar met ALLES
            if ($receivedUtc->lt($dateLastFetchedUtc)) {
                return false;
            }

            if (!Email::whereMailboxId($this->mailbox->id)->whereMessageId($messageId)->exists()) {
                set_time_limit(180);
                $this->fetchEmail($message);
            }
        }

        return true;
    }

    private function initMsOauthConfig(): void
    {
        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);

        try {
            $token = $msOauthConnectionManager->setAccessTokenFromRefreshToken();
            if($token) {
                $this->appClient = $token;
            } else {
                $this->errorAppClientInitialization = true;
                Log::error('InitMsOauthConfig: no access token from refresh token ! Mailbox id: ' . $this->mailbox->id);
            }
        } catch (\Exception $ex) {
            $this->errorAppClientInitialization = true;
            Log::error('InitMsOauthConfig: no access token from refresh token ! Mailbox id: ' . $this->mailbox->id);
            Log::error($ex);
        }
    }

    private function fetchEmail(Message $message)
    {
        $from = $message->getFrom()?->getEmailAddress()?->getAddress() ?? '';
        // geen fromAddress, dan melding
        if ($from === '') {
            Log::error("Email zonder from (mailbox: {$this->mailbox->id}, message_id: {$message->getInternetMessageId()}).");
//            return;
        }
        // fromAddress te lang, dan afkappen en melding
        if (strlen($from) > 191) {
            Log::error("Deze mail heeft een from die langer is dan 191 karakters en hierdoor ingekort. Origineel:");
            Log::error($from);
            $from = substr($from, 0, 191);
        }

        $tos = [];
        if($message->getToRecipients()){
            foreach ($message->getToRecipients() as $toRecipient){
                // todo: Foutmelding onderzoeken: Error getting user's inbox: Undefined array key "address"
//                  if(!isset($toRecipient['emailAddress']['address'])){
//                      Log::info('Geen array key "address" in toRecipient "emailAddress":');
//                      Log::info($toRecipient['emailAddress']);
//                  }
//                  resultaat:
//                  [2023-10-25 15:40:22] production.INFO: array (
//                       'name' => 'Contact | Energie Samen',
//                   )
//                  [2023-10-25 15:40:26] production.INFO: array (
//                       'name' => 'mailto:govert@geldofcs.nl',
//                   )
                if(isset($toRecipient['emailAddress']['address'])){
                    $tos[] = $toRecipient['emailAddress']['address'];
                }
            }
        }
        $ccs = [];
        if($message->getCcRecipients()){
            foreach ($message->getCcRecipients() as $ccRecipient){
                if(isset($ccRecipient['emailAddress']['address'])){
                    $ccs[] = $ccRecipient['emailAddress']['address'];
                }
            }
        }
        $bccs = [];
        if($message->getBccRecipients()){
            foreach ($message->getBccRecipients() as $bccRecipient){
                if(isset($bccRecipient['emailAddress']['address'])){
                    $bccs[] = $bccRecipient['emailAddress']['address'];
                }
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
//            $textHtml = utf8_encode($textHtml);
            $textHtml = mb_convert_encoding($textHtml, 'UTF-8', mb_list_encodings());
        }

        if (strlen($textHtml) > 250000) {
            $textHtml = substr($textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $message->getSubject() ?: '';
        $currentEncodingTextSubject= mb_detect_encoding( $subject, 'UTF-8', true);
        if(false === $currentEncodingTextSubject){
            $subject = mb_convert_encoding($subject, 'UTF-8', mb_list_encodings());
        }

        if (strlen($subject) > 250) {
            $subject = substr($subject, 0, 249);
        }

        $sentDateTime = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::parse( $message->getSentDateTime())->format('Y-m-d H:i:s'), 'UTC');
        $sentDateTime->setTimezone(date_default_timezone_get());

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $from,
            'to' => $tos,
            'cc' => $ccs,
            'bcc' => $bccs,
            'subject' => $subject,
            'subject_for_filter' => trim(mb_substr($subject ?? '', 0, 150)),
            'html_body' => $textHtml,
            'date_sent' => $sentDateTime,
            'folder' => 'inbox',
            'imap_id' => null,
            'msoauth_message_id' => $message->getId() ?: '',
            'message_id' => $message->getInternetMessageId() ?: '',
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

        $this->storeAttachments($message->getId(), $email);

//        $this->fetchedEmails[] = $email;
    }

    private function storeAttachments(string $messageId, Email $email)
    {
        $targetUser = trim((string) $this->mailbox->oauthApiSettings->project_id);
        $requestUrl = "/users/{$targetUser}/messages/{$messageId}/attachments";
        $requestResult = $this->appClient->createCollectionRequest('GET', $requestUrl)
            ->setReturnType(Attachment::class);
        if($requestResult){
            foreach ($requestResult->getPage() as $attachment){
                /**
                 * De cid's zijn de verwijzingen in de html van images.
                 * Ook overige bijlages (excel bijv.) krijgen een cid, zet hem voor deze bijlages op null.
                 * Op die manier kunnen we afbeeldingen die in de html staan verbergen als bijlage.
                 */

                $contentBytes = $attachment->getProperties()['contentBytes'] ?? null;
                if($contentBytes){
                    /**
                     * contentId is niet rechtsreeks benaderbaar maar zit wel in json.
                     * Daarom maar via deze omweg uit $attachment halen.
                     */
                    $contents = base64_decode($contentBytes);
                    $cid = json_decode(json_encode($attachment))->contentId ?? null;

                    $name = $attachment->getName();
                    $filePathAndName = $this->getAttachmentDBName() . \bin2hex(\random_bytes(16)).'.bin';
                    $emailAttachment = new EmailAttachment([
                        'filename' => $filePathAndName,
                        'name' => $name,
                        'email_id' => $email->id,
                        'cid' => $cid && str_contains($email->html_body, $cid) ? $cid : null,
                    ]);
                    $emailAttachment->save();
                    \Illuminate\Support\Facades\Storage::disk('mail_attachments')->put($filePathAndName, $contents);
                } else {
                    // hier eventueel foutmelding indien geen contents voor bijlage gevonden ? Voorlopig niet.
                }

            }

        }
    }

}