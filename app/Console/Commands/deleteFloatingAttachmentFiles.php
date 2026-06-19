<?php

namespace App\Console\Commands;

use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class deleteFloatingAttachmentFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:deleteFloatingAttachmentFiles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verwijder zwevende bijlagen.';

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
        $this->doDeleteFloatingAttachmentFiles();
        Log::info('Einde Verwijder zwevende bijlagen.');
    }

    /**
     *
     * @return array
     */
    public function doDeleteFloatingAttachmentFiles()
    {
        Log::info("Start Verwijder zwevende bijlagen.");
        foreach (Mailbox::all() as $mailbox) {
            $this->deleteFloatingAttachmentFilesInMailbox($mailbox, 'inbox');
            $this->deleteFloatingAttachmentFilesInMailbox($mailbox, 'outbox');
        }
    }

    /**
     * @param string $directory
     * @param Mailbox $mailbox
     */
    private function deleteFloatingAttachmentFilesInMailbox(Mailbox $mailbox, string $inOfOutbox)
    {
        $directory = 'mailbox_'.$mailbox->id.'/'.$inOfOutbox;

//        foreach (Storage::files('mails/' . $directory) as $filename) {
        foreach (Storage::disk('mail_attachments')->files($directory) as $filename) {
            $filenameInMailbox = str_replace("mails/", "", $filename);
            if(DIRECTORY_SEPARATOR == "\\"){
                $filenameInMailbox = str_replace("/inbox/", "\\inbox\\", $filenameInMailbox);
                $filenameInMailbox = str_replace("/outbox/", "\\outbox/", $filenameInMailbox);
            }
            $checkAttachement = EmailAttachment::where('filename', $filenameInMailbox)->exists();
            if (!$checkAttachement) {
                Storage::disk('mail_attachments')->delete($filename);
                Log::info("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - Filenaam: " . $filenameInMailbox . " verwijderd.");
            }
        }
    }
}
