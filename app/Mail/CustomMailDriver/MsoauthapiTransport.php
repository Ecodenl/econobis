<?php

namespace App\Mail\CustomMailDriver;

use App\Eco\Mailbox\Mailbox;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use Exception;
use Illuminate\Mail\Transport\Transport;
use Illuminate\Support\Facades\Log;
use Microsoft\Graph\Graph;
use Swift_Mime_SimpleMessage;

class MsoauthapiTransport extends Transport
{
    private Mailbox $mailbox;
    private string $user = 'me';
    private Graph $graph;
//    private Google_Service_Gmail $msOauthService;

    public function __construct(int $mailboxId, $user = 'me')
    {
        $this->mailbox = Mailbox::where('id', $mailboxId)->first();

        $this->user= $user;

        $this->initMsOauthConfig();
    }

    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        Log::info("komen we hier? MsOauthapiTransport - send !!");

        $msg = $this->base64url_encode($message);
        $token = $this->mailbox->gmailApiSettings->token;

        if ($token != null) {
            $graph = new Graph();
            $graph->setAccessToken($token);
        }

        //        $message = new Google_Service_Gmail_Message();
//        $message->setRaw($msg);

        try {
            $sendMailBody = array(
                'message' => array (
                    'subject' => $subject,
                    'body' => array (
                        'content' => $msg,
                        'contentType' => 'text'
                    ),
                    'toRecipients' => array (
                        array (
                            'emailAddress' => array (
                                'address' => $recipient
                            )
                        )
                    )
                )
            );

            GraphHelper::$userClient->createRequest('POST', '/me/sendMail')
                ->attachBody($sendMailBody)
                ->execute();

//            $message = $this->msOauthService->users_messages->send($this->user, $message);
//            return $message;
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
    private function initMsOauthConfig(): void
    {
        $msOauthConnectionManager = new MsOauthConnectionManager($this->mailbox);
        $client = $msOauthConnectionManager->connect();

        // Todo improve failure message
        if (!($client instanceof Graph) && isset($client['message']) && $client['message'] === 'msOauth_unauthorised') {
            throw new Exception('InitMsOauthConfig: ' . $client['message']);
        }

//        $this->msOauthService = new Google_Service_MsOauth($client);
    }
}