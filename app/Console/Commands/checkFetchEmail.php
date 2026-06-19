<?php

namespace App\Console\Commands;

use App\Eco\Mailbox\Mailbox;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkFetchEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkFetchEmail {mailbox} {imapId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check ophalen van een specifieke email in specifieke mailbox';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info($this->description);
        Log::info("Mailbox: " . $this->argument('mailbox'));
        Log::info("ImapId : " . $this->argument('imapId'));
        $mailbox = Mailbox::find($this->argument('mailbox'));
        $imapId = $this->argument('imapId');
        if($mailbox && $mailbox->valid && $mailbox->is_active){
            $found = $this->checkFetchEmailByMailboxAndImap($mailbox, $imapId);
            if($found){
                Log::info("Found");
            } else {
                Log::info("Not found");
            }
        }
    }

    private function checkFetchEmailByMailboxAndImap($mailbox, $imapIdToCheck)
    {
        Log::info("checkFetchEmailByMailboxAndImap for mailbox " . $mailbox->id . " and imapId " . $imapIdToCheck . ".");
        $imap = $this->initImapConnection($mailbox);

        if($imap){

//            if($mailbox->date_last_fetched) {
//                $dateLastFetched = Carbon::parse($mailbox->date_last_fetched)->subDay()->format('Y-m-d');
//            }else{
//                $dateLastFetched = Carbon::now()->subDay()->format('Y-m-d');
//            }
//            Log::info('DateLastFetched: ' . $dateLastFetched);

//            try {
//                // Get all emails (messages)
//                // PHP.net imap_search criteria: http://php.net/manual/en/function.imap-search.php
//                $mailIds = $imap->searchMailbox('SINCE "2022-08-20"');
//                Log::info("Search since 2022-08-20: " . count($mailIds));
//                Log::info("Search since 2022-08-20: " . implode(',', $mailIds));
//            } catch(\PhpImap\Exceptions\ConnectionException $ex) {
//                Log::info("IMAP connection failed: " . $ex);
//                die();
//            } catch(\Exception $ex2) {
//                Log::info("searchMailbox failed: ");
//                Log::info($ex2);
//                die();

                try {
                    $mailIds = $imap->searchMailbox('ALL');
//                Log::info("Search ALL : " . implode(',', $mailIds));
                Log::info("Search ALL : " . count($mailIds));
                } catch(\PhpImap\Exceptions\ConnectionException $ex) {
                    Log::info("IMAP connection failed: " . $ex);
                    die();
                }
//            }

            if(count($mailIds) > 0) {
                // we sort ids descending for processing, so when a fetch email failed, new emails still are being fetched.
                rsort($mailIds);
//                Log::info("Mailids: " . implode(',', $mailIds));
                foreach ($mailIds as $mailId) {
//                Log::info("Imap Id : " . $mailId);
                    if ($mailId == $imapIdToCheck) {
                        Log::info("Imap Id found !");
                        set_time_limit(180);
                        $this->fetchEmail($imap, $mailbox->id, $mailId);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private function initImapConnection($mailbox)
    {
        $mb = $mailbox;
        $connectionString = '{' . $mb->imap_host . ':' . $mb->imap_port . '/imap';
        if ($mb->imap_encryption) {
            $connectionString .= '/' . $mb->imap_encryption;
        }
        else{
            $connectionString .= '/novalidate-cert';
        }
        $connectionString .= '}' . $mb->imap_inbox_prefix;

        $imap = new \PhpImap\Mailbox($connectionString, $mb->username, $mb->password, null);

        try {
            $imap->checkMailbox();
            if($mb->valid == false){
                $mb->valid = true;
                $mb->login_tries = 0;
                $mb->save();
            }
            return $imap;
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            $mb->valid = false;
            $mb->login_tries = $mb->login_tries + 1;
            $mb->save();
        }
        return false;
    }

    private function fetchEmail($imap, $mailboxId, $mailId)
    {
        $emailData = $imap->getMail($mailId, false);
//        dd($emailData);
        try {
            $dateSent = Carbon::parse( $emailData->date ) ;
        } catch(\Exception $ex) {
            try {
                $dateSentStrip = str_replace(" (GMT+01:00)", "", $emailData->date);
                $dateSentStrip = str_replace(" (GMT+02:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+03:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+04:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+05:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+06:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+07:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (GMT+08:00)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (West-Europa (standaardtijd))", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (West-Europa (zomertijd))", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (W. Europe Daylight Time)", "", $dateSentStrip);
                $dateSentStrip = str_replace(" (W. Europe Standard Time)", "", $dateSentStrip);
                $dateSent = Carbon::parse( $dateSentStrip );
            } catch(\Exception $ex2) {
                Log::error("Failed to retrieve date sent (" . $emailData->date . ") from email (" . $emailData->id . ") in mailbox (" . $mailboxId . "). Error: " . $ex2->getMessage());
                echo "Failed to retrieve date sent from email: " . $ex2->getMessage();
                die();
            }
        }

        $textHtml = '';
        try {
            if ($emailData->textHtml) {
                $textHtml = $emailData->textHtml;
            } else {
                if ($emailData->textPlain) {
                    $textHtml = nl2br($emailData->textPlain);
                }
            }
        } catch(\Exception $ex) {
            Log::error("Failed to retrieve textHtml or textPlain from email (" . $emailData->id . ") in mailbox (" . $mailboxId . "). Error: " . $ex->getMessage());
            echo "Failed to retrieve textHtml or textPlain from email (" . $emailData->id . ") in mailbox (" . $mailboxId . "). Error: " . $ex->getMessage();
            return;
        }
        $textHtml = $textHtml?: '';
        // when encoding isn't UTF-8 encode texthtml to utf8.
        $currentEncodingTextHtml= mb_detect_encoding( $textHtml, 'UTF-8', true);
        if(false === $currentEncodingTextHtml){
//            $textHtml = utf8_encode($textHtml);
            $textHtml = mb_convert_encoding($textHtml, 'UTF-8', mb_list_encodings());
        }

        if(strlen($textHtml) > 250000){
            $textHtml = substr($emailData->textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $emailData->subject ?: '';
        $currentEncodingTextSubject= mb_detect_encoding( $subject, 'UTF-8', true);
        if(false === $currentEncodingTextSubject){
            Log::info('Testen opangen ongeldige encoding in subject');
            Log::info($subject);
            $subject = mb_convert_encoding($subject, 'UTF-8', mb_list_encodings());
        }
        Log::info($subject);


        if(strlen($subject) > 250){
            $subject = substr($subject, 0, 249);
        }

        Log::info("message_id " . $emailData->messageId );
        Log::info("from " .  $emailData->fromAddress );
        Log::info("to ");
        Log::info($emailData->to );
        Log::info("cc ");
        Log::info($emailData->cc );
        Log::info("bcc ");
        Log::info($emailData->bcc );
        Log::info("subject " . $subject );
        Log::info("date_sent " . $dateSent );
//        Log::info("html_body " . $textHtml );
    }

}
