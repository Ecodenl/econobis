<?php

namespace App\Console\Commands;

use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
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
        $counter = 1;

        $projects = Project::all();

        foreach($projects as $project) {
            $participantsProject = $project->participantsProject()->whereNotNull('date_terminated')->get();

            foreach($participantsProject as $participantProject) {
                $lastMutation = $participantProject->mutationsDefinitiveDesc()->first();
                if($lastMutation) {
                    $lastmutationDateEntry = new \DateTime($lastMutation->date_entry);
                } else {
                    $lastmutationDateEntry = null;
                }
                $participantProjectDateTerminated = new \DateTime($participantProject->date_terminated);

                if(
                    isSet($lastMutation) &&
                    ($lastmutationDateEntry != null) &&
                    ($participantProjectDateTerminated->modify("-1 day") != $lastmutationDateEntry) &&
                    ($lastMutation->type->code_ref === 'first_deposit' || $lastMutation->type->code_ref === 'deposit')
                ) {
                    $wrongParticipantProjects[$counter]['project'] = $project->id . ' - ' . $project->name;
                    $wrongParticipantProjects[$counter]['participant'] = $participantProject->id . ' - ' . $participantProject->contact->full_name;
                    $wrongParticipantProjects[$counter]['dates'] = $participantProjectDateTerminated->format('Y-m-d') . ' - ' . $lastmutationDateEntry->format('Y-m-d');
                }
                $counter++;
            }
        }

        if(!empty($wrongParticipantProjects)) {
            $subject = 'Ongeldige beeindigingsdatum deelnemers! - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            Log::info($wrongParticipantProjects);

            $this->sendMail($subject, $wrongParticipantProjects);
        }

        Log::info('Procedure check op ongeldige beeindigingsdatum deelnemers klaar');
    }

    private function sendMail($subject, $wrongParticipantProjects)
    {

        (new EmailHelper())->setConfigToDefaultMailbox();
        $wrongParticipantProjectsHtml = "";
        foreach($wrongParticipantProjects as $wrongParticipantProject) {
            $wrongParticipantProjectsHtml .=
                "Project: " . $wrongParticipantProject['project'] . "<br>" .
                "Deelnemer: " . $wrongParticipantProject['participant'] . "<br>" .
                "Datums: " . $wrongParticipantProject['dates'] . "<br><br>"
            ;
        }

        $mail = Mail::to('patrick@xaris.nl');
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Ongeldige beeindigingsdatum deelnemers!</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p><p>Ongeldige beeindigingsdatum deelnemers:<br>' . $wrongParticipantProjectsHtml . '</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
