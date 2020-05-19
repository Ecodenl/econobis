<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Http\Controllers\Api\Email\EmailController;
use Carbon\Carbon;
use Illuminate\Console\Command;

class checkOldEmail19052020 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:checkOldEmail19052020';

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
        $this->doCheckOldEmail190520200();
        dd('Einde Check oude email ingelezen op 19-5-2020.');
    }

    /**
     *
     * @return array
     */
    public function doCheckOldEmail190520200()
    {
        $dateDeleteBefore = Carbon::parse('2020-05-01')->format('Y-m-d');
        $dateCreatedAt = Carbon::parse('2020-05-19')->format('Y-m-d');

        print_r("Start Check oude email ingelezen op 19-5-2020 met date sent voor: " . $dateDeleteBefore . ".\n");
        $emails = Email::whereDate('created_at', $dateCreatedAt)->whereDate('date_sent', '<', $dateDeleteBefore)->get();
        foreach ($emails as $email){
            $attachments = $email->attachments;
            foreach ($attachments as $attachment) {
                print_r("Emailattachment ". $attachment->id . " zal worden verwijderd.\n");
            }
            print_r("Email ". $email->id . " zal worden verwijderd.\n");
        }
    }
}
