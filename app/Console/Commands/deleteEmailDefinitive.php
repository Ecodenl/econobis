<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Http\Controllers\Api\Email\EmailController;
use Carbon\Carbon;
use Illuminate\Console\Command;

class deleteEmailDefinitive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:deleteEmailDefinitive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verwijder email (soft deleted) definitief.';

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
        $this->doDeleteEmailDefinitive();
        dd('Einde Verwijder email (soft deleted) definitief.');
    }

    /**
     *
     * @return array
     */
    public function doDeleteEmailDefinitive()
    {
        $dateDeleteBefore = Carbon::parse('now')->subMonth(3)->format('Y-m-d');
        print_r("Start Verwijder email (soft deleted) definitief en met date deleted_at voor: " . $dateDeleteBefore . "\n");
        $emails = Email::withTrashed()->where('deleted_at', '<', $dateDeleteBefore)->get();
        $emailController =  new EmailController();
        foreach ($emails as $email){
            $attachments = $email->attachments;
            foreach ($attachments as $attachment) {
                $emailController->deleteEmailAttachment($attachment);
            }
            $email->contacts()->detach();
            $email->groupEmailAddresses()->detach();
            $email->forceDelete();
        }
    }

}
