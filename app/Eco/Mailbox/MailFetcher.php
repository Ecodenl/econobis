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
        $mailIds = $this->imap->sortMails(SORTARRIVAL);

        foreach($mailIds as $mailId){
            if(Email::whereMailboxId($this->mailbox->id)
                ->whereImapId($mailId)
                ->exists()){

                // Deze mail bestaat al, er vanuit gaan dat alle opvolgende dus ook al eerder zijn opgehaald
                // Dus kunnen we helemaal stoppen met de loop
                return;
            }

            // Als we hier komen is de mail blijkbaar nog niet eerder opgehaald, bij deze gaan doen
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
                $mb->save();
            }
        }
        catch(\Exception $e){
            $mb->valid = false;
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
    private function getStorageRootDir()
    {
        return Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix();
    }

    private function fetchEmail($mailId)
    {
        $emailData = $this->imap->getMail($mailId);

        $textHtml = $emailData->textHtml ?: '';
        if(strlen($textHtml) > 50000){
            $textHtml = substr($emailData->textHtml, 0, 50000);
            $textHtml .= '<p>Deze mail is langer dan 50.000 karakters en hierdoor ingekort.</p>';
        }
        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $emailData->fromAddress,
            'to' => array_keys($emailData->to),
            'cc' => array_keys($emailData->cc),
            'bcc' => array_keys($emailData->bcc),
            'subject' => $emailData->subject ?: '',
            'html_body' => $textHtml,
            'date_sent' => $emailData->date,
            'folder' => 'inbox',
            'imap_id' => $emailData->id,
            'message_id' => $emailData->messageId,
        ]);
        $email->save();

        //if from email exists in any of the email addresses make a pivot record.
        $this->addRelationToContacts($email);

        foreach ($emailData->getAttachments() as $attachment){
            $filename = str_replace($this->getStorageRootDir(), '', $attachment->filePath);
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

        //Get emailaddresses with this email
        $emailAddressesIds = EmailAddress::where('email', $email->from)->pluck('contact_id')->toArray();

        //If contact has twice same emailaddress
        $uniqueEmailAddressesIds = array_unique($emailAddressesIds);

        $email->contacts()->attach($uniqueEmailAddressesIds);
    }

    public function getFetchedEmails()
    {
        return $this->fetchedEmails;
    }


}