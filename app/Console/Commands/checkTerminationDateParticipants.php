<?php

namespace App\Console\Commands;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkTerminationDateParticipants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'participants:checkTerminationDate';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op ongeldige beeindigingsdatum deelnemers';

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
        Log::info('Procedure check op ongeldige beeindigingsdatum deelnemers gestart');

        $wrongParticipantProjects = [];

        $projects = Project::all();

        foreach($projects as $project) {
            $participantsProject = $project->participantsProject()->whereNotNull('date_terminated')->get();
            $mutationTypeWithDrawalId = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id',  $project->projectType->id)->first()->id;

            foreach($participantsProject as $participantProject) {

                $lastMutation = $participantProject->mutationsDefinitiveDesc()->where('participant_mutations.type_id', $mutationTypeWithDrawalId)->first();
                if($lastMutation) {
                    $lastmutationDateEntry = Carbon::parse($lastMutation->date_entry)->format('Y-m-d');
                } else {
                    $lastmutationDateEntry = null;
                }
                $participantProjectDateTerminated = Carbon::parse($participantProject->date_terminated)->format('Y-m-d');
                $participantProjectDateTerminatedDayAfter = Carbon::parse($participantProject->date_terminated)->addDay(1)->format('Y-m-d');
//Log::info('Deelnemer: ' . $participantProject->id);
//Log::info('Date Terminated: ' . $participantProjectDateTerminated);
//Log::info('Date Terminated (next day): ' . $participantProjectDateTerminatedDayAfter);
//Log::info('Date Last mutation withdrawel: ' . $lastmutationDateEntry);
                if(
                    isSet($lastMutation)
                    && ($lastmutationDateEntry != null)
                    && ($participantProjectDateTerminatedDayAfter != $lastmutationDateEntry)
                ) {
                    $wrongParticipantProjects[]['project'] = $project->id . ' - ' . $project->name;
                    $wrongParticipantProjects[]['participant'] = $participantProject->id . ' - ' . $participantProject->contact->full_name;
                    $wrongParticipantProjects[]['dates'] = Carbon::parse($participantProjectDateTerminated)->format('d-m-Y') . ' - ' . Carbon::parse($lastmutationDateEntry)->format('d-m-Y');
                }
            }
        }

        if(!empty($wrongParticipantProjects)) {
            $this->sendMail($wrongParticipantProjects);
            Log::info('Ongeldige beeindigingsdatum deelnemers gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige beeindigingsdatum deelnemers gevonden');
        }

        Log::info('Procedure check op ongeldige beeindigingsdatum deelnemers klaar');
    }

    private function sendMail($wrongParticipantProjects)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $subject = 'Ongeldige beeindigingsdatum deelnemers! (' . count($wrongParticipantProjects) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongParticipantProjectsHtml = "";
        foreach($wrongParticipantProjects as $wrongParticipantProject) {
            $wrongParticipantProjectsHtml .=
                "<p>Project: " . $wrongParticipantProject['project'] . ", " .
                "Deelnemer: " . $wrongParticipantProject['participant'] . ", " .
                "Datums: " . $wrongParticipantProject['dates'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $wrongParticipantProjectsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
