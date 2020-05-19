<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Http\Controllers\Api\Email\EmailController;
use Carbon\Carbon;
use Illuminate\Console\Command;

class deleteOldEmail19052020 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:deleteOldEmail19052020';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verwijder oude email ingelezen op 19-5-2020.';

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
        $this->doDeleteOldEmail19052020();
        dd('Einde Verwijder oude email ingelezen op 19-5-2020.');
    }

    /**
     *
     * @return array
     */
    public function doDeleteOldEmail19052020()
    {
        $dateDeleteBefore = Carbon::parse('2020-05-01')->format('Y-m-d');
        $dateCreatedAt = Carbon::parse('2020-05-19')->format('Y-m-d');
        print_r("Start Verwijder oude email ingelezen op 19-5-2020 met date sent voor: " . $dateDeleteBefore . ".\n");
        $emails = Email::whereDate('created_at', $dateCreatedAt)->whereDate('date_sent', '<', $dateDeleteBefore)->get();
        $emailController =  new EmailController();
        foreach ($emails as $email){
            $attachments = $email->attachments;
            foreach ($attachments as $attachment) {
                print_r("Emailattachment ". $attachment->id . " verwijderd.\n");
                $emailController->deleteEmailAttachment($attachment);
                $attachment->delete();
            }
            $email->delete();
            print_r("Email ". $email->id . " verwijderd.\n");
        }
    }
}
