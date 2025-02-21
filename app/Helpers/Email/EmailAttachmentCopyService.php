<?php

namespace App\Helpers\Email;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EmailAttachmentCopyService
{
    public static function copy(EmailAttachment $attachmentFromOldEmail, Email $toEmail, string $toFolder = 'outbox')
    {
        $newFilename = 'mailbox_' . $toEmail->mailbox_id . '/' . $toFolder . '/' . Str::uuid() . '.' . pathinfo($attachmentFromOldEmail->filename, PATHINFO_EXTENSION);

        Storage::disk('mail_attachments')->copy($attachmentFromOldEmail->filename, $newFilename);

        $attachment = $attachmentFromOldEmail->replicate();
        $attachment->email_id = $toEmail->id;
        $attachment->filename = $newFilename;
        $attachment->save();

        return $attachment;
    }
}