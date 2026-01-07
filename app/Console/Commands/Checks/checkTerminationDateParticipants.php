<?php

namespace App\Console\Commands\Checks;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\Project;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
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
    protected $mailTo = 'xaris@econobis.nl';

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
            $mutationTypeResultDepositId = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id',  $project->projectType->id)->first()->id;

            foreach($participantsProject as $participantProject) {

                $lastMutation = $participantProject->mutationsDefinitiveDesc()
                    ->where('participant_mutations.type_id', $mutationTypeWithDrawalId)
                    ->orWhere(function ($query) use ($mutationTypeResultDepositId) {
                        $query->where('participant_mutations.type_id', $mutationTypeResultDepositId)
                            ->where('participant_mutations.amount', '<', 0);
                    })
                    ->first();
                if($lastMutation) {
                    $lastmutationDateEntry = Carbon::parse($lastMutation->date_entry)->format('Y-m-d');
                } else {
                    $lastmutationDateEntry = null;
                }
                $participantProjectDateTerminated = Carbon::parse($participantProject->date_terminated)->format('Y-m-d');
                $participantProjectDateTerminatedDayAfter = Carbon::parse($participantProject->date_terminated)->addDay()->format('Y-m-d');

//Log::info('Deelnemer: ' . $participantProject->id);
//Log::info('Date Terminated: ' . $participantProjectDateTerminated);
//Log::info('Date Terminated (next day): ' . $participantProjectDateTerminatedDayAfter);
//Log::info('Date Last mutation withdrawel: ' . $lastmutationDateEntry);
                if(
                    isSet($lastMutation)
                    && ($lastmutationDateEntry != null)
                    && ($participantProjectDateTerminatedDayAfter != $lastmutationDateEntry)
                ) {
                    // zijn er reeds definitieve revenues (bij project) met einddatum na beeindingsdatum?
                    $revenuesKwhConfirmedExists = RevenuesKwh::where('project_id', $participantProject->project_id)->where('date_end', '>=', $participantProjectDateTerminated)->whereIn('status', ['confirmed', 'processed'])->exists();
                    // zo ja, dan laten we hem maar even voor wat het is.
                    // zo niet, dan controleren of hij nog voorkomt in een niet verwerkte revenue.
                    if(!$revenuesKwhConfirmedExists){
                        // komt participant nog voor in een niet definitieve revenue.
                        $participantInNotConfirmedDistributionExists = RevenueDistributionKwh::where('participation_id', $participantProject->id)->whereNotIn('status', ['confirmed', 'processed'])->exists();
                        // zo niet, dan laten we hem maar even voor wat het is.
                        // zo ja, dan willen we hem herstellen, melding van maken dus.
                        // zijn er nog niet verwerkt revenues (bij project) met begindatum voor beeindigsdatum.
                        $revenuesKwhBeforeDateTerminatedExists = RevenuesKwh::where('project_id', $participantProject->project_id)->where('date_begin', '<=', $participantProjectDateTerminated)->exists();
                        // zo niet, dan laten we hem maar even voor wat het is.
                        // zo ja, dan willen we hem herstellen, melding van maken dus.
                        if($participantInNotConfirmedDistributionExists || $revenuesKwhBeforeDateTerminatedExists) {
                            $wrongParticipantProjects[] = [
                                'project' => $project->id . ' - ' . $project->name,
                                'participant' => $participantProject->id . ' - ' . $participantProject->contact->full_name,
                                'dateTerminated' => Carbon::parse($participantProjectDateTerminated)->format('d-m-Y'),
                                'dateLastMutationDateEntry' => Carbon::parse($lastmutationDateEntry)->format('d-m-Y')
                            ];
                        }
                    }
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
        $subject = 'Ongeldige beeindigingsdatum deelnemers! (' . count($wrongParticipantProjects) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongParticipantProjectsHtml = "";
        foreach($wrongParticipantProjects as $wrongParticipantProject) {
            $wrongParticipantProjectsHtml .=
                "<p>Project: " . $wrongParticipantProject['project'] . ", " .
                "Deelnemer: " . $wrongParticipantProject['participant'] . ", " .
                "Datum beeindigd: " . $wrongParticipantProject['dateTerminated'] . ", " .
                "Datum Laatste mutatie: " . $wrongParticipantProject['dateLastMutationDateEntry'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $wrongParticipantProjectsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
