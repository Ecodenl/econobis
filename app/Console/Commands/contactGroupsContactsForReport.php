<?php

namespace App\Console\Commands;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Schedule\CommandRun;
use App\Eco\User\User;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class contactGroupsContactsForReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:contactGroupsContacts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'contact_groups_contacts_for_report tabel vullen.';

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
        $commandRun->save();

        Auth::setUser(User::find(1));

        $cooperation = Cooperation::first();
        if($cooperation) {

            if($cooperation->create_contacts_for_report_table && $cooperation->create_contacts_for_report_table_in_progress == false) {
                //at the start of the cronjob set create_contacts_for_report_table_in_progress to true
                $cooperation->create_contacts_for_report_table_in_progress = true;
                $cooperation->save();

                /* first truncate the 'contact_groups_contacts_for_report' table */
                DB::table('contact_groups_contacts_for_report')->truncate();

                Log::info('Start opnieuw vullen contact_groups_contacts_for_report tabel.');

                /* now repopulate the table again with the current data */
                $contactGroups = ContactGroup::whereIn('type_id', ['dynamic', 'composed', 'static'])->where('closed', 0)->get();

                foreach($contactGroups as $contactGroup) {
                    $allContacts = $contactGroup->all_contact_group_contacts_for_report;

                    foreach(array_chunk($allContacts,500) as $chunks){
                        foreach($chunks as $contact) {
                            DB::insert('insert into contact_groups_contacts_for_report (
                        contact_id,
                        contact_group_id,
                        member_to_group_since
                    ) values (?, ?, ?)',
                                [
                                    $contact['id'],
                                    $contactGroup->id,
                                    $contact['member_to_group_since'],
                                ]
                            );
                        }
                    }
                }

                //now also update the create_contacts_for_report_table_last_created column in the cooperations table
                $cooperation->create_contacts_for_report_table_last_created = Carbon::now();

                //at the start of the cronjob set create_contacts_for_report_table_in_progress to true
                $cooperation->create_contacts_for_report_table_in_progress = false;

                $cooperation->save();

                Log::info('contact_groups_contacts_for_report tabel opnieuw gevuld.');
            } else if (!$cooperation->create_contacts_for_report_table) {
                Log::info('Vullen contact_groups_contacts_for_report tabel staat niet aan.');
            } else if ($cooperation->create_contacts_for_report_table_in_progress == true) {
                Log::info('De cronjob draait al, create_contacts_for_report_table_in_progress is nog true.');

                $this->sendMail($cooperation);
            } else {
                Log::info('Er ging iets anders mis tijdens de contactGroupsContactsForReport cronjob');
            }
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

    }

    /**
     * @param $cooperation
     */
    private function sendMail($cooperation): void
    {
        if(!$cooperation->email_report_table_problems || empty($cooperation->email_report_table_problems)){
            Log::info('Mailen van probleem niet mogelijk i.v.m. ontbreken email bij problemen vullen report tabel.');
            return;
        }

        $mail = Mail::to($cooperation->email_report_table_problems);
        $subject = "Probleem bij vullen contactgroep/contact koppelingen report tabel - " . \Config::get('app.APP_COOP_NAME');
        $bodyText = "De taak voor het automatische vullen van contactgroep/contact koppelingen report tabel (tbv Power BI) is aangeroepen terwijl deze nog bezig was.";

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>' . $subject . '</title></head><body><p>' . $subject . '</p>' . $bodyText . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

}
