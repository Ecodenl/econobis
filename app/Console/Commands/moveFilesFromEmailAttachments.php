<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Http\Controllers\Api\Email\EmailController;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class moveFilesFromEmailAttachments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:moveFilesFromEmailAttachments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herstel attachments.';

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
        $this->doMoveFilesFromEmailAttachments();
        dd('Einde Herstel attachments.');
    }

    /**
     *
     * @return array
     */
    public function doMoveFilesFromEmailAttachments()
    {
        $dateCreatedAt = Carbon::parse('2020-05-19')->format('Y-m-d');
        print_r("Start Herstel attachments.\n");
        $attachments = EmailAttachment::whereDate('created_at', $dateCreatedAt)->get();
        foreach ($attachments as $attachment) {
            $parts = explode( DIRECTORY_SEPARATOR, $attachment->filename );
            $prefixdir =  $parts[0].DIRECTORY_SEPARATOR.$parts[1].DIRECTORY_SEPARATOR;
            $filename  = $parts[2];
            $fileFromFile = $prefixdir."temp".DIRECTORY_SEPARATOR.$filename;
            print_r( $fileFromFile ."\n");
            print_r( $attachment->filename ."\n");
            try{
                Storage::disk('mail_attachments')->move($fileFromFile, $attachment->filename);
                print_r("Emailattachment ". $attachment->id . " verplaatst.\n");
            }catch (\Exception $e){
                print_r("Emailattachment ". $attachment->id . " komt niet meer voor in temp.\n");
                print_r("Error: ". $e->getMessage());
                print_r( "\n");
            }
        }
    }
}
