<?php

namespace App\Http\Traits\GmailApi;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Google_Service_Gmail;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait Attachment
{
    use HasDecodableBody;

    private string $messageId;
    private $body;
    private $id;
    private $filename;
    private $mimeType;
    private $size;
    private $headerDetails;
    private $headers;
    private $service;

    /**
     * Retuns attachment ID
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Returns attachment file name
     *
     * @return string
     */
    public function getFileName()
    {
        return $this->filename;
    }

    /**
     * Returns mime type of the attachment
     *
     * @return string
     */
    public function getMimeType()
    {
        return $this->mimeType;
    }

    /**
     * Returns approximate size of the attachment
     *
     * @return mixed
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param  string  $path
     * @param  string|null  $filename
     *
     * @param  string  $disk
     *
     * @return string
     * @throws \Exception
     */
    public function saveAttachmentTo($attachment)
    {
        $filename = $name = $attachment['filename'];

        $data = $this->getDecodedBody($this->getData($attachment['messageId']));

        if (!$data) {
            throw new \Exception('Could not get the attachment.');
        }

        $filename = $filename ?: $this->filename;

        $path = $this->getAttachmentDBName();

        $filePathAndName = "{$path}{$filename}";

        Storage::disk('mail_attachments')->put($filePathAndName, $data);

        return $filePathAndName;

    }

    /**
     * @throws \Exception
     */
    public function getData($messageId)
    {
        $attachment = $this->service->users_messages_attachments->get($this->user, $messageId, $this->id);

        return $attachment->getData();
    }

    /**
     * Returns attachment headers
     * Contains Content-ID and X-Attachment-Id for embedded images
     *
     * @return array
     */
    public function getHeaderDetails($headers)
    {
        $headerDetails = [];

        foreach ($headers as $header) {
            $headerDetails[$header->name] = $header->value;
        }

        return $headerDetails;
    }

    /**
     * True if message has at least one attachment.
     *
     * @return boolean
     */
    public function hasAttachments()
    {
        $parts = $this->getAllParts($this->parts);
        $has = false;

        /** @var Google_Service_Gmail_MessagePart $part */
        foreach ($parts as $part) {
            if (!empty($part->body->attachmentId) && $part->getFilename() != null && strlen($part->getFilename()) > 0) {
                $has = true;
                break;
            }
        }

        return $has;
    }

    /**
     * Returns a collection of attachments
     *
     * But does not load the other attachment info like filename, mimetype, etc..
     *
     * @return Collection
     */
    public function getAttachments(): Collection
    {
        $attachments = new Collection();
        $parts = $this->getAllParts($this->parts);

        foreach ($parts as $part) {
            if (!empty($part->body->attachmentId)) {
                $body = $part->getBody();

                // Not needed now but for inline images we need to save this into the database
                //$headers = $part->getHeaders();

                $attachment = [
                    'id' => $body->getAttachmentId(),
                    'size' => $body->getSize(),
                    'filename' => $part->getFilename(),
                    'mimeType' => $part->getMimeType(),
                    'messageId' => $this->messageId,
                ];

                $attachments->push($attachment);
            }
        }

        return $attachments;
    }

    private function storeAttachments(string $gmailMessageId, Email $email)
    {
        $this->messageId = $gmailMessageId;

        if($this->hasAttachments()) {
            foreach ($this->getAttachments() as $attachment){
                $this->id = $attachment['id'];

                try {
                    $this->saveAttachmentTo($attachment);
                } catch(\Exception $exAtt) {
                    Log::error("Failed to retrieve Attachment from email (" . $email->id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $exAtt->getMessage());
                    echo "Failed to retrieve Attachment from email (" . $email->id . ") in mailbox (" . $this->mailbox->id . "). Error: " . $exAtt->getMessage();
                    return;
                }

                $filename = $this->getAttachmentDBName() . $attachment['filename'];

                $emailAttachment = new EmailAttachment([
                    'filename' => $filename,
                    'name' => $attachment['filename'],
                    'email_id' => $email->id,
                ]);
                $emailAttachment->save();
            }
        }
    }
}