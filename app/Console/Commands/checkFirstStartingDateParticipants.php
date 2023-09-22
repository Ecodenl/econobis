<?php

namespace App\Console\Commands;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\Project;
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
    protected $signature = 'participants:checkFirstStartingDate {--recover=false}';
    protected $mailTo = 'wim.mosman@xaris.nl';

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
        // met of zonder herstel?
        $doRecover = $this->option('recover') == 'true';

        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnemers gestart' . ($doRecover ? ' MET HERSTEL!' : '') );

        $wrongParticipantProjects = [];

        $projects = Project::all();

        foreach($projects as $project) {
            $participantsProject = $project->participantsProject()->get();
            $arrayDepositIds = [];
            $mutationTypeFirstDesposit = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $project->projectType->id)->first();
            if($mutationTypeFirstDesposit){
                $arrayDepositIds[] = $mutationTypeFirstDesposit->id;
            }
            $mutationTypeDesposit = ParticipantMutationType::where('code_ref', 'deposit')->where('project_type_id',  $project->projectType->id)->first();
            if($mutationTypeDesposit){
                $arrayDepositIds[] = $mutationTypeDesposit->id;
            }

            foreach($participantsProject as $participantProject) {
//                Log::info('Deelnemer: ' . $participantProject->id);
//                Log::info($participantProject->mutationsDefinitive()->first());
//                Log::info($participantProject->mutationsDefinitive()->whereIn('type_id', $arrayDepositIds)->first());
                $firstMutation = $participantProject->mutationsDefinitive()->whereIn('type_id', $arrayDepositIds)->first();
                if(
                    isSet($firstMutation)
                    && ($firstMutation->date_entry != null)
                    && ($participantProject->date_register != $firstMutation->date_entry)
                ) {
                    $dateRegister = $participantProject->date_register ? $participantProject->date_register : 'NNB';
                    $wrongParticipantProjects[] = [
                        'project' => $project->id . ' - ' . $project->name,
                        'participant' => $participantProject->id . ' - ' . $participantProject->contact->full_name,
                        'dates' => $dateRegister . ' - ' . $firstMutation->date_entry
                    ];
                    if($doRecover){
                       $participantProject->date_register = $firstMutation->date_entry;
                       $participantProject->save();
                    }

                }
            }
        }

        if(!empty($wrongParticipantProjects)) {
            $this->sendMail($wrongParticipantProjects, $doRecover);
            Log::info('Ongeldige eerste ingangsdatum deelnemers gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige eerste ingangsdatum deelnemers gevonden');
        }

        Log::info('Procedure check op ongeldige eerste ingangsdatum deelnemers klaar');
    }

    private function sendMail($wrongParticipantProjects, $doRecover)
    {
        $subject = 'Ongeldige eerste ingangsdatum deelnemers! (' . count($wrongParticipantProjects) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongParticipantProjectsHtml = "";
        if($doRecover){
            $wrongParticipantProjectsHtml .= "<p>MET HERSTEL!</p>";
        }

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
