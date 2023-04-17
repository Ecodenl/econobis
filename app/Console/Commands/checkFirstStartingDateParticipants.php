<?php

namespace App\Console\Commands;

use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkFirstStartingDateParticipants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'participants:checkFirstStartingDate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op ongeldige eerste ingangsdatum deelnemers';

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
        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnemers gestart');

        $wrongParticipantProjects = [];
        $counter = 1;

        $projects = Project::all();

        foreach($projects as $project) {
            $participantsProject = $project->participantsProject()->get();

            foreach($participantsProject as $participantProject) {
                $firstMutation = $participantProject->mutationsDefinitive()->first();
                if(
                    isSet($firstMutation) &&
                    ($firstMutation->date_entry != null) &&
                    ($participantProject->date_register != $firstMutation->date_entry) &&
                    ($firstMutation->type->code_ref === 'first_deposit' || $firstMutation->type->code_ref === 'deposit')
                ) {
                    $dateRegister = $participantProject->date_register ? $participantProject->date_register : 'NNB';
                    $wrongParticipantProjects[$counter]['project'] = $project->id . ' - ' . $project->name;
                    $wrongParticipantProjects[$counter]['participant'] = $participantProject->id . ' - ' . $participantProject->contact->full_name;
                    $wrongParticipantProjects[$counter]['dates'] = $dateRegister . ' - ' . $firstMutation->date_entry;
                }
                $counter++;
            }
        }

        if(!empty($wrongParticipantProjects)) {
            $subject = 'Ongeldige eerste ingangsdatum deelnemers! - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            Log::info($wrongParticipantProjects);

            $this->sendMail($subject, $wrongParticipantProjects);
        }

        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnemers klaar');
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
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Ongeldige eerste ingangsdatum deelnemers!</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p><p>Ongeldige eerste ingangsdatum deelnemers:<br>' . $wrongParticipantProjectsHtml . '</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
