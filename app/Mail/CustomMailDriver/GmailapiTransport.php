<?php

namespace App\Mail\CustomMailDriver;

use App\Eco\Mailbox\Mailbox;
use App\Helpers\Gmail\GmailConnectionManager;
use Exception;
use Google_Client;
use Google_Service_Gmail;
use Google_Service_Gmail_Message;
use Illuminate\Mail\Transport\Transport;
use Swift_Mime_SimpleMessage;

class GmailapiTransport extends Transport
{
    private Mailbox $mailbox;
    private string $user = 'me';
    private Google_Service_Gmail $gmailService;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();

        $this->user= $user;

        $this->initGmailConfig();
    }

    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        $msg = $this->base64url_encode($message);
        $message = new Google_Service_Gmail_Message();
        $message->setRaw($msg);

        try {
            $message = $this->gmailService->users_messages->send($this->user, $message);
            return $message;
        } catch (\Exception $e) {
            print 'An error occurred: ' . $e->getMessage();
        }
    }

    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * @inheritDoc
     */
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