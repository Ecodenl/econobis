<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 17:01
 */

namespace App\Eco\Mailbox;


use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\EmailAddress\EmailAddress;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Storage;

class MailFetcher
{

    /**
     * @var Mailbox
     */
    private $mailbox;
    private $imap;
    private $fetchedEmails = [];

    public function __construct(Mailbox $mailbox)
    {
        $this->mailbox = $mailbox;

        $this->initStorageDir();
        $this->initImapConnection();
    }

    public function fetchNew()
    {
        Log::info("Check fetchNew");

        // Get all emails (messages)
        // PHP.net imap_search criteria: http://php.net/manual/en/function.imap-search.php
        if($this->mailbox->date_last_fetched)
        {
            try {
                $dateLastFetched = Carbon::parse($this->mailbox->date_last_fetched)->format('Y-m-d');
                $mailIds = $this->imap->searchMailbox('SINCE "'.$dateLastFetched.'"');
                Log::info("Search since " . $dateLastFetched . ": " . implode(',', $mailIds));
            } catch(PhpImap\Exceptions\ConnectionException $ex) {
                echo "IMAP connection failed: " . $ex;
                die();
            }
        }else{
            try {
                $dateLastFetched = Carbon::now()->format('Y-m-d');
                $mailIds = $this->imap->searchMailbox('ALL');
                Log::info("Search ALL : " . implode(',', $mailIds));
            } catch(PhpImap\Exceptions\ConnectionException $ex) {
                echo "IMAP connection failed: " . $ex;
                die();
            }
        }

        $dateTime = Carbon::now();
        Log::info("Datetime : " . $dateTime);

        $imapIdLastFetched = $this->mailbox->imap_id_last_fetched;

        if(!$imapIdLastFetched) {
            $imapIdLastFetched = 0;
        }

        if(count($mailIds) > 0){
            $firstMailId = $mailIds[0];
            Log::info("firstMailId: " . $firstMailId);

            if( $dateLastFetched != $dateTime->format('Y-m-d') && $imapIdLastFetched>=$firstMailId ){
                Log::info("RESET: imap Id < voor laatste imap id !!");
            }else{
                Log::info("Laatste imap Id voor fetch: " . $imapIdLastFetched);

                $imapIdLastFetchedArrayId = array_search($imapIdLastFetched, $mailIds );
                Log::info("imapIdLastFetchedArrayId: " . $imapIdLastFetchedArrayId);
                if(false !== $imapIdLastFetchedArrayId){
                    $mailIds = array_slice($mailIds, $imapIdLastFetchedArrayId+1);
                }
            }
            Log::info("Mailids: " . implode(',', $mailIds) );
            if(count($mailIds) > 0){
                $imapIdLastFetched = end($mailIds);
            }
            Log::info("Laatste imap Id na fetch: " . $imapIdLastFetched);

            // en dan toch maar in omgekeerde volgorde verwerken? Dan blijft hij in ieder geval niet hangen op een email die bij inlezen tegen een fout aanloopt.
            rsort($mailIds);
            Log::info("Mailids: " . implode(',', $mailIds) );
            foreach($mailIds as $mailId){
                set_time_limit(180);
                $this->fetchEmail($mailId);
            }
        }
        $this->mailbox->date_last_fetched = $dateTime;
        $this->mailbox->imap_id_last_fetched = $imapIdLastFetched;
        $this->mailbox->save();
    }

    public function getImap()
    {
        return $this->imap;
    }

    private function initImapConnection()
    {
        $mb = $this->mailbox;
        $connectionString = '{' . $mb->imap_host . ':' . $mb->imap_port . '/imap';
        if ($mb->imap_encryption) {
            $connectionString .= '/' . $mb->imap_encryption;
        }
        else{
            $connectionString .= '/novalidate-cert';
        }
        $connectionString .= '}' . $mb->imap_inbox_prefix;

        $storageDir = $this->getStorageDir();

        $this->imap = new \PhpImap\Mailbox($connectionString, $mb->username, $mb->password, $storageDir);

        try {
            $this->imap->checkMailbox();
            if($mb->valid == false){
                $mb->valid = true;
                $mb->login_tries = 0;
                $mb->save();
            }
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            $mb->valid = false;
            $mb->login_tries = $mb->login_tries + 1;
            $mb->save();
        }

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
        return $this->getStorageRootDir() . DIRECTORY_SEPARATOR . 'mailbox_' . $this->mailbox->id . DIRECTORY_SEPARATOR . 'inbox' ;
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

    private function fetchEmail($mailId)
    {
        $emailData = $this->imap->getMail($mailId);
//        dd($emailData);
        try {
            $dateSent = Carbon::parse( $emailData->date ) ;
        } catch(\Exception $ex) {
            try {
                $dateSent = Carbon::parse( str_replace(" (GMT+02:00)", "", $emailData->date) );
            } catch(\Exception $ex2) {
                Log::error("Failed to retrieve date sent (" . $emailData->date . ") from email (" . $emailData->id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $ex2->getMessage());
                echo "Failed to retrieve date sent from email: " . $ex2->getMessage();
                die();
            }
        }

        if(Email::whereMailboxId($this->mailbox->id)
            ->whereImapId($mailId)
            ->whereDateSent($dateSent)
            ->exists()){
            Log::info("Deze mail bestaat al met zelfde imap id (" . $mailId . ") en date sent (" . $dateSent . ") "  );
            // Deze mail bestaat al
                return;
        }
        Log::info("Deze mail nieuw aanmaken met imap id (" . $mailId . ")" );

        if ($emailData->textHtml) {
            $textHtml = $emailData->textHtml;
        } else {
            $textHtml = nl2br($emailData->textPlain);
        }
        $textHtml = $textHtml?: '';
        // when encoding isn't UTF-8 encode texthtml to utf8.
        $currentEncodingTextHtml= mb_detect_encoding( $textHtml, 'UTF-8', true);
        if(false === $currentEncodingTextHtml){
            $textHtml = utf8_encode($textHtml);
        }

        if(strlen($textHtml) > 250000){
            $textHtml = substr($emailData->textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $emailData->subject ? $emailData->subject : '';

        if(strlen($subject) > 250){
            $subject = substr($emailData->textHtml, 0, 249);
        }

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $emailData->fromAddress,
            'to' => array_keys($emailData->to),
            'cc' => array_keys($emailData->cc),
            'bcc' => array_keys($emailData->bcc),
            'subject' => $subject,
            'html_body' => $textHtml,
            'date_sent' => $dateSent,
            'folder' => 'inbox',
            'imap_id' => $emailData->id,
            'message_id' => $emailData->messageId,
            'status' => 'unread'
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

        foreach ($emailData->getAttachments() as $attachment){
            $name = substr($attachment->filePath, strrpos($attachment->filePath, DIRECTORY_SEPARATOR) + 1);

            $filename = $this->getAttachmentDBName() . $name;

            $emailAttachment = new EmailAttachment([
                'filename' => $filename,
                'name' => $attachment->name,
                'email_id' => $email->id,
            ]);
            $emailAttachment->save();
        }

        $this->fetchedEmails[] = $email;
    }

    public function addRelationToContacts(Email $email){

        //soms niet koppelen
        $mailboxIgnores = $email->mailbox->mailboxIgnores;

        foreach ($mailboxIgnores as $ignore){
            switch ($ignore->type_id) {
                case 'e-mail':
                   if($ignore->value === $email->from){
                       return false;
                   }
                    break;
                case 'domain':
                    $domain = preg_replace( '!^.+?([^@]+)$!', '$1', $email->from);
                    if ($ignore->value === $domain) {
                        return false;
                    }
                    break;
            }
        }

        // Link contact from email to address
        if($email->mailbox->link_contact_from_email_to_address) {
            $emailAddressesIds = EmailAddress::where('email', $email->to)->pluck('contact_id')->toArray();
        // Link contact from email from address
        } else {
            $emailAddressesIds = EmailAddress::where('email', $email->from)->pluck('contact_id')->toArray();
        }

        //If contact has twice same emailaddress
        $uniqueEmailAddressesIds = array_unique($emailAddressesIds);

        $email->contacts()->attach($uniqueEmailAddressesIds);
    }

    public function getFetchedEmails()
    {
        return $this->fetchedEmails;
    }


}