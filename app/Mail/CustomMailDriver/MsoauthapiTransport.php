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
    private Graph $appClient;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();
        $this->user= $user;
        $this->initMsOauthConfig();
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

        if($message->getChildren()) {
            $attachments = array();

            foreach ($message->getChildren() as $child) {
//                Log::info('Attachment test');
//                Log::info($child->toString());
                if ($child->getHeaders() && $child->getHeaders()->get('content-disposition')) {
                    $filename = str_replace('attachment; filename=', null, $child->getHeaders()->get('content-disposition')->getFieldBody());
//                    Log::info($filename);
                    $attachment = new FileAttachment();
                    $attachment->setName($filename);
                    $contectBytesBody = $child->getBody();
                    $attachment->setContentBytes(chunk_split(base64_encode($contectBytesBody)));
                    $attachment->setContentType($child->getContentType());
                    $attachment->setODataType("#microsoft.graph.fileAttachment");
                    array_push($attachments, $attachment);
                }
            }

            $messageGraph->setAttachments($attachments);
        }
        $messageToSend = array ('message' => $messageGraph);

        try {
          $response = $this->appClient->createRequest('POST', '/users/' . $this->mailbox->gmailApiSettings->project_id. '/sendmail')
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

    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * @inheritDoc
     */
    private function initMsOauthConfig(): void
    {
        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);
        $this->appClient = $msOauthConnectionManager->setAccessTokenFromRefreshToken();

// todo oauth WM: nog iets met response doen ?
//        // Todo improve failure message
//        if (!($client instanceof Graph) && isset($client['message']) && $client['message'] === 'msOauth_unauthorised') {
//            throw new Exception('InitMsOauthConfig: ' . $client['message']);
//        }

    }
}