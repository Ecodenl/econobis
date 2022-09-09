<?php

namespace App\Mail\CustomMailDriver;

use App\Eco\Mailbox\Mailbox;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use Exception;
use Illuminate\Mail\Transport\Transport;
use Illuminate\Support\Facades\Log;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model\ItemBody;
use Microsoft\Graph\Model\Message;
use Microsoft\Graph\Model\EmailAddress;
use Microsoft\Graph\Model\Recipient;
use Microsoft\Graph\Model\FileAttachment;
use Swift_Mime_SimpleMessage;

class MsoauthapiTransport extends Transport
{
    private Mailbox $mailbox;
    private string $user = 'me';
    private Graph $graph;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();

        $this->user= $user;

        $this->initMsOauthConfig();
    }

    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
// todo oauth WM: testen en opschonen
//        Log::info("MsOauthapiTransport - send !!");
//        Log::info(implode(';', array_keys($message->getTo() ?: [])));
//        Log::info(implode(';', array_keys($message->getCc() ?: [])));
//        Log::info(implode(';', array_keys($message->getBcc() ?: [])));
//        Log::info($message->getSubject());
//        Log::info($message->getBody());

        $messageGraph = new Message();
        $messageGraph->setSubject( $message->getSubject());
        $body = new ItemBody();
        $body->setContent($message->getBody());
        $body->setContentType('HTML');
        $messageGraph->setBody($body);
        $tos = array_keys($message->getTo() ?: []);
        $recipients = array();
        foreach ( $tos as $to) {
            $emailAddress = new EmailAddress();
            $emailAddress->setAddress($to);
            $recipient = new Recipient();
            $recipient->setEmailAddress($emailAddress);
            array_push($recipients, $recipient);
        }
        $messageGraph->setToRecipients($recipients);

// todo oauth WM: attachments toevoegen !

//        $attachment = new FileAttachment();
//        $attachment->setName("MyFileAttachment.txt");
//        $attachment->setContentBytes("data");
//        $attachment->setODataType("#microsoft.graph.fileAttachment");
//
//        $messageGraph->setAttachments(array($attachment));

        $messageToSend = array ('message' => $messageGraph);

// todo oauth WM: opschonen !
//        LOG::info('messageToSend');
//        LOG::info($messageToSend);
//        return;

        $token = $this->mailbox->gmailApiSettings->token;

        if ($token != null) {

            $graph = new Graph();
            $graph->setAccessToken(json_decode($token));

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
                print 'An error occurred: ' . $e->getMessage();
            }
        }
    }

    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * @inheritDoc
     */
    private function initMsOauthConfig(): void
    {
        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);
        $client = $msOauthConnectionManager->connect();

        // Todo improve failure message
        if (!($client instanceof Graph) && isset($client['message']) && $client['message'] === 'msOauth_unauthorised') {
            throw new Exception('InitMsOauthConfig: ' . $client['message']);
        }

    }
}