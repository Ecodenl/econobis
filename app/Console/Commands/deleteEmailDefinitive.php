<?php

namespace App\Console\Commands;

use App\Eco\Email\Email;
use App\Eco\Schedule\CommandRun;
use App\Eco\User\User;
use App\Http\Controllers\Api\Email\EmailController;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        $commandRun->save();

        $this->doDeleteEmailDefinitive();

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        Log::info("Einde Verwijder email (soft deleted) definitief.");
    }

    /**
     *
     * @return array
     */
    public function doDeleteEmailDefinitive()
    {
        $dateDeleteBefore = Carbon::parse('now')->subMonth(3)->format('Y-m-d');
        Log::info("Start Verwijder email (soft deleted) definitief en met date deleted_at voor: " . $dateDeleteBefore);

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
        Log::info('Verwijder email (soft deleted) definitief heeft gedraaid.');
    }

}
