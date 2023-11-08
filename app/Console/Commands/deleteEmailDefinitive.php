<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\Schedule\CommandRun;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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
     * @return void
     */
    public function handle(): void
    {
        $adminUser = User::where('email', config('app.admin_user.email'))->first();
        if($adminUser){
            Auth::setUser($adminUser);
        }

        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $this->doDeleteEmailDefinitive();

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Einde Verwijder email (soft deleted) definitief.");
    }

    /**
     *
     * @return void
     */
    protected function doDeleteEmailDefinitive(): void
    {
        $dateDeleteBefore = Carbon::parse('now')->subMonths(3)->format('Y-m-d');
        Log::info("Start Verwijder email (soft deleted) definitief en met date deleted_at voor: " . $dateDeleteBefore . ".");

        $emails = Email::withTrashed()->where('deleted_at', '<', $dateDeleteBefore)->get();
        foreach ($emails as $email){
            $attachments = $email->attachments;
            foreach ($attachments as $attachment) {
                $this->deleteEmailAttachment($attachment);
            }
            $email->contacts()->detach();
            $email->groupEmailAddresses()->detach();
            $email->forceDelete();
        }
        Log::info('Verwijder email (soft deleted) definitief heeft gedraaid.');
    }

    protected function deleteEmailAttachment(EmailAttachment $emailAttachment): void
    {
        //delete real file (only when count on filename is 1, otherwise this attachment is also in use in another email because of a reply or send through)
        $countAttachment = EmailAttachment::where('filename', $emailAttachment->filename)->count();
        if($countAttachment == 1){
            Storage::disk('mail_attachments')->delete($emailAttachment->filename);
        }

        //delete db record
        $emailAttachment->delete();
    }

}
