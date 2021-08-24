<?php

namespace App\Mail\CustomMailDriver;

use App\Eco\Mailbox\Mailbox;
use App\Helpers\Gmail\GmailConnectionManager;
use Exception;
use Google_Client;
use Google_Service_Gmail;
use Google_Service_Gmail_Draft;
use Google_Service_Gmail_Message;
use Illuminate\Mail\Transport\Transport;
use Illuminate\Support\Facades\Log;
use Swift_Mime_SimpleMessage;

class GmailapiTransport extends Transport
{
    private Mailbox $mailbox;
    private string $user;
    private Google_Service_Gmail $gmailService;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();

        $this->user= $user;

        $this->initGmailConfig();
    }

    /**
     * @inheritDoc
     */
    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        $this->beforeSendPerformed($message);

        $sender = $message->getSender();
        $to = $message->getTo();
        $subject = $message->getSubject();
        $body = $message->getBody();

//        $tempMessage = $this->createMessage('testeconobis1@gmail.com', 'rob.rollenberg@xaris.nl', 'Een voorbeeld onderwerp', 'En dan hier het gehele bericht met wat inhoud.');
        $tempMessage = $this->createMessage($sender, 'rob.rollenberg@xaris.nl', $subject, $body);

        $this->sendMessage($tempMessage);

        $this->sendPerformed($message);

        return $this->numberOfRecipients($message);
    }

    /**
     * @param $message Google_Service_Gmail_Message
     * @return null|Google_Service_Gmail_Message
     */
    private function sendMessage($message) {
        try {
            $message = $this->gmailService->users_messages->send($this->user, $message);
            Log::error( 'Message with ID: ' . $message->getId() . ' sent.');
            return $message;
        } catch (Exception $e) {
            Log::error( 'An error occurred: ' . $e->getMessage());
        }
        return null;
    }

    /**
     * @param $sender string sender email address
     * @param $to string recipient email address
     * @param $subject string email subject
     * @param $messageText string email text
     * @return Google_Service_Gmail_Message
     */
    private function createMessage($sender, $to, $subject, $messageText) {
        $message = new Google_Service_Gmail_Message();

        $rawMessageString = "From: <{$sender}>\r\n";
        $rawMessageString .= "To: <{$to}>\r\n";
        $rawMessageString .= 'Subject: =?utf-8?B?' . base64_encode($subject) . "?=\r\n";
        $rawMessageString .= "MIME-Version: 1.0\r\n";
        $rawMessageString .= "Content-Type: text/html; charset=utf-8\r\n";
        $rawMessageString .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
        $rawMessageString .= "{$messageText}\r\n";

        $rawMessage = strtr(base64_encode($rawMessageString), array('+' => '-', '/' => '_'));
        $message->setRaw($rawMessage);
        return $message;
    }

    /**
     * @param $message Google_Service_Gmail_Message
     * @return Google_Service_Gmail_Draft
     */
//    private function createDraft($message) {
//        $draft = new Google_Service_Gmail_Draft();
//        $draft->setMessage($message);
//
//        try {
//            $draft = $this->gmailService->users_drafts->create($this->user, $draft);
//            print 'Draft ID: ' . $draft->getId();
//        } catch (Exception $e) {
//            print 'An error occurred: ' . $e->getMessage();
//        }
//        return $draft;
//    }

    private function initGmailConfig(): void
    {
        $gmailConnectionManager = new GmailConnectionManager($this->mailbox);
        $client = $gmailConnectionManager->connect();

        // Todo improve failure message
        if (!($client instanceof Google_Client) && isset($client['message']) && $client['message'] === 'gmail_unauthorised') {
            throw new Exception('InitGmailConfig: ' . $client['message']);
        }

        $this->gmailService = new Google_Service_Gmail($client);
    }
}