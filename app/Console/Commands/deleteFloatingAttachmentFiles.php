<?php

namespace App\Console\Commands;

use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
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
        dd('Einde Verwijder zwevende bijlagen.');
    }

    /**
     *
     * @return array
     */
    public function doDeleteFloatingAttachmentFiles()
    {
        print_r("Start Verwijder zwevende bijlagen.\n");
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

        foreach (Storage::files('mails/' . $directory) as $filename) {
            $filenameInMailbox = str_replace("mails/", "", $filename);
            $filenameInMailbox = str_replace("/", "\\", $filenameInMailbox);
            $checkAttachement = EmailAttachment::where('filename', $filenameInMailbox)->exists();
            if (!$checkAttachement) {
                Storage::delete($filename);
                print_r("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - ");
                print_r("Filenaam: " . $filenameInMailbox . " verwijderd\n");
            }
        }
    }
}
