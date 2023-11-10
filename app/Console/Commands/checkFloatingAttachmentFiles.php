<?php

namespace App\Console\Commands;

use App\Eco\Email\EmailAttachment;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
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
        Log::info('Einde Check op zwevende bijlagen.');
    }

    /**
     *
     * @return array
     */
    public function doCheckFloatingAttachmentFiles()
    {
        Log::info("Start Check op zwevende bijlagen.");
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
        $directory = 'mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . $inOfOutbox;

        foreach (Storage::files('mails/' . $directory) as $filename) {
            // mails/mailbox_2/inbox/2313a1edada0aad3d6900067ca74c85f.bin
            //       mailbox_2\inbox\2313a1edada0aad3d6900067ca74c85f.bin
            // mails/mailbox_2/outbox/F07Q7aqYtWAM5JIzjJES9EKzVCIyCRVwZqaDMf8o.pdf
            //       mailbox_2\outbox/F07Q7aqYtWAM5JIzjJES9EKzVCIyCRVwZqaDMf8o.pdf
            //
            // mails/mailbox_2/inbox/2313a1edada0aad3d6900067ca74c85f.bin
            //       mailbox_2/inbox/2313a1edada0aad3d6900067ca74c85f.bin
            // mails/mailbox_2/outbox/F07Q7aqYtWAM5JIzjJES9EKzVCIyCRVwZqaDMf8o.pdf
            //       mailbox_2/outbox/F07Q7aqYtWAM5JIzjJES9EKzVCIyCRVwZqaDMf8o.pdf
            $filenameInMailbox = str_replace("mails/", "", $filename);
            if(DIRECTORY_SEPARATOR == "\\"){
                $filenameInMailbox = str_replace("/inbox/", "\\inbox\\", $filenameInMailbox);
                $filenameInMailbox = str_replace("/outbox/", "\\outbox/", $filenameInMailbox);
            }
            $checkAttachement = EmailAttachment::where('filename', $filenameInMailbox)->exists();
            if (!$checkAttachement) {
                Log::info("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - Filenaam: " . $filenameInMailbox . " niet in EmailAttachment.");
            } else {
//                Log::info("Mailbox: " . $mailbox->id . " - Directory: " . $directory . " - Filenaam: " . $filenameInMailbox . " wel in EmailAttachment.");

            }
        }
    }
}
