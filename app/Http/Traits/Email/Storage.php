<?php

namespace App\Http\Traits\Email;

trait Storage
{
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
        return $this->getStorageRootDir() . DIRECTORY_SEPARATOR . 'mailbox_' . $this->mailbox->id . DIRECTORY_SEPARATOR . 'inbox';
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
        return \Illuminate\Support\Facades\Storage::disk('mail_attachments')->path('');
    }
}