<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

class controleScriptsSoftDeletedContacts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:controleScriptsSoftDeletedContacts';

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
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        Artisan::call('contact:checkSoftDeletedContactGroupsInContactGroupPivot');
        Artisan::call('contact:checkSoftDeletedContactsInContactGroupPivot');
        Artisan::call('contact:checkSoftDeletedContactsInContactEmail');
        Artisan::call('contact:checkSoftDeletedContactsInContactEmailManual');
        Artisan::call('contact:checkSoftDeletedContactsInContactNotes');
        Artisan::call('contact:checkSoftDeletedContactsInPhoneNumbers');
        Artisan::call('contact:checkSoftDeletedContactsInAdministrationContactTwinfield');
        Artisan::call('contact:checkSoftDeletedContactsInContactAvailabilities');
        Artisan::call('contact:checkSoftDeletedContactsInFinancialOverviewContacts');
        Artisan::call('contact:checkSoftDeletedContactsInFreeFieldsFieldRecords');
        Artisan::call('contact:checkSoftDeletedContactsInTwinfieldLog');

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

    }


}

