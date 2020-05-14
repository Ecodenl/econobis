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
//        Log::info("Check fetchNew");
        try {
            // Get all emails (messages)
            // PHP.net imap_search criteria: http://php.net/manual/en/function.imap-search.php
            $mailIds = $this->imap->searchMailbox('ALL');
        } catch(PhpImap\Exceptions\ConnectionException $ex) {
            echo "IMAP connection failed: " . $ex;
            die();
        }
//        Log::info("mailIds aantal: " . count($mailIds));
//        Log::info("mailIds a: " . implode(',', $mailIds));

//        if(count($mailIds)>0){
//            $mailIds = $this->imap->sortMails(SORTARRIVAL);
//        }
        rsort($mailIds);

//        Log::info("mailIds b: " . implode(',', $mailIds));

        foreach($mailIds as $mailId){
            if(Email::whereMailboxId($this->mailbox->id)
                ->whereImapId($mailId)
                ->exists()){

                // Deze mail bestaat al, er vanuit gaan dat alle opvolgende dus ook al eerder zijn opgehaald
                // Dus kunnen we helemaal stoppen met de loop
                return;
            }

            // Als we hier komen is de mail blijkbaar nog niet eerder opgehaald, bij deze gaan doen
            set_time_limit(180);
            $this->fetchEmail($mailId);
        }
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

        if ($emailData->textHtml) {
            $textHtml = $emailData->textHtml;
        } else {
            $textHtml = nl2br($emailData->textPlain);
            $textHtml = utf8_encode($textHtml);
        }

        $textHtml = $textHtml?: '';

        if(strlen($textHtml) > 250000){
            $textHtml = substr($emailData->textHtml, 0, 250000);
            $textHtml .= '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
        }

        $subject = $emailData->subject ? $emailData->subject : '';

        if(strlen($subject) > 250){
            $subject = substr($emailData->textHtml, 0, 249);
        }

        $dateSend = Carbon::parse( $emailData->date);

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $emailData->fromAddress,
            'to' => array_keys($emailData->to),
            'cc' => array_keys($emailData->cc),
            'bcc' => array_keys($emailData->bcc),
            'subject' => $subject,
            'html_body' => $textHtml,
            'date_sent' => $dateSend,
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