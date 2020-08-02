<?php

namespace App\Console\Commands;

use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class checkFloatingAttachmentFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkFloatingAttachmentFiles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op zwevende bijlagen.';

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
        $this->doCheckFloatingAttachmentFiles();
        dd('Einde Check op zwevende bijlagen.');
    }

    /**
     *
     * @return array
     */
    public function doCheckFloatingAttachmentFiles()
    {
        print_r("Start Check op zwevende bijlagen.\n");
        foreach (Mailbox::all() as $mailbox) {
            $this->checkForFloatingAttachmentFiles($mailbox, 'inbox');
            $this->checkForFloatingAttachmentFiles($mailbox, 'outbox');
        }
    }

    /**
     * @param string $directory
     * @param Mailbox $mailbox
     */
    private function checkForFloatingAttachmentFiles(Mailbox $mailbox, string $inOfOutbox)
    {
        $directory = 'mailbox_'.$mailbox->id.'/'.$inOfOutbox;

        foreach (Storage::files('mails/' . $directory) as $filename) {
            $filenameInMailbox = str_replace("mails/", "", $filename);
            $filenameInMailbox = str_replace("/", "\\", $filenameInMailbox);
            $checkAttachement = EmailAttachment::where('filename', $filenameInMailbox)->exists();
            if (!$checkAttachement) {
                print_r("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - ");
                print_r("Filenaam: " . $filenameInMailbox . " niet in EmailAttachment\n");

//                    Storage::delete($filename);
                // $file = Storage::get($filename);
                // do whatever with $file;

            } else {
//                print_r("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - ");
//                print_r("Filenaam: " . $filenameInMailbox . " wel in EmailAttachment\n");

            }
        }
    }
}
