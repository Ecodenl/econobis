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
        if ($mb->imap_encryption) $connectionString .= '/' . $mb->imap_encryption;
        $connectionString .= '}' . $mb->imap_inbox_prefix;

        $storageDir = $this->getStorageDir();
        $this->imap = new \PhpImap\Mailbox($connectionString, $mb->username, $mb->password, $storageDir);
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
        return $this->getStorageRootDir() . DIRECTORY_SEPARATOR . 'mailbox_' . $this->mailbox->id;
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

        $email = new Email([
            'mailbox_id' => $this->mailbox->id,
            'from' => $emailData->fromAddress,
            'to' => json_encode(array_keys($emailData->to)),
            'cc' => json_encode(array_keys($emailData->cc)),
            'bcc' => json_encode(array_keys($emailData->bcc)),
            'subject' => $emailData->subject,
            'html_body' => $emailData->textHtml,
            'date' => $emailData->date,
            'folder' => 'inbox',
            'imap_id' => $emailData->id,
            'message_id' => $emailData->messageId,
        ]);
        $email->save();

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

    public function getFetchedEmails()
    {
        return $this->fetchedEmails;
    }
}