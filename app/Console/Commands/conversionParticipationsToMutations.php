<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\User\User;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class conversionParticipationsToMutations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionParticipationsToMutations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maak mutatieregel aan voor aangekochte/verkochte participaties';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        Auth::setUser(User::find(1));
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->makeFirstDepositMutations();
//        $this->makeWithDrawalMutations();

        dd('klaar');
    }

    /**
     * Make first deposit mutation for participants which has participations granted
     *
     * @return mixed
     */
    public function makeFirstDepositMutations()
    {
        $participants = ParticipantProject::where('participations_granted', '>', 0)->where('participations_definitive', 0)->get();

        foreach ($participants as $participant) {
            $projectType = $participant->project->projectType;
            $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $projectType->id)->first();

            /* STATUSSEN CONVERSIE  ---
            | Oud = Nieuw
            | 4 = 1(Interesse)
            | 1 = 2(Optie/Inschrijving)
            | 2 = 4(Definitief)
            | null = 3(Toegekend)
            | 5 = null (Beeindigd)
            | 3 = null (Overgedragen)
            --------------------------- */
            switch($participant->status_id) {
                case 4:
                    $statusId = 1;
                    break;
                case 1:
                    $statusId = 2;
                    break;
                case 2:
                    $statusId = 4;
                    break;
                default:
                    $statusId = null;
                    break;
            }

            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $participant->id;
            $participantMutation->type_id = $mutationType->id;
            $participantMutation->status_id = $statusId;
            if($projectType->code_ref == 'loan') {
                $participantMutation->amount = $participant->participations_granted / 100; // Loan is filled in cents
                $participantMutation->amount_final = $participant->participations_granted / 100; // Loan is filled in cents
            } else {
                $participantMutation->quantity = $participant->participations_granted;
                $participantMutation->quantity_final = $participant->participations_granted;
            }
            if($statusId == 4) {
                $participantMutation->date_entry = $participant->date_payed;
                $participantMutation->date_payment = $participant->date_payed;
            }

            DB::transaction(function () use ($participantMutation) {
                // Calculate participation worth based on current book worth of project
                if($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
                    $currentBookWorthOfProject = $participantMutation->participation->project->currentBookWorth() * $participantMutation->quantity;

                    $participantMutation->participation_worth = $currentBookWorthOfProject;
                }

                $participantMutation->save();

                // Herbereken de afhankelijke gegevens op het participantProject
                $participantMutation->participation->calculator()->run()->save();

                // Herbereken de afhankelijke gegevens op het project
                $participantMutation->participation->project->calculator()->run()->save();
            });
        }
    }

    /**
     * Make first deposit mutation for participants which has participations granted
     *
     * @return mixed
     */
    public function makeWithDrawalMutations()
    {
        $participants = ParticipantProject::whereNotNull('date_end')->where('participations_definitive', '!=', 0)->get();

        foreach ($participants as $participant) {
            $mutationType = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id', $participant->project->project_type_id)->first();

            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $participant->id;
            $participantMutation->type_id = $mutationType->id;
            $participantMutation->status_id = 4; // 4 is final
            $participantMutation->quantity = '-' . $participant->participations_granted;
            $participantMutation->date_entry = $participant->date_end;

            DB::transaction(function () use ($participantMutation) {
                // Calculate participation worth based on current book worth of project
                if($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
                    $currentBookWorthOfProject = $participantMutation->participation->project->currentBookWorth() * $participantMutation->quantity;

                    $participantMutation->participation_worth = $currentBookWorthOfProject;
                }

                $participantMutation->save();

                // Herbereken de afhankelijke gegevens op het participantProject
                $participantMutation->participation->calculator()->run()->save();

                // Herbereken de afhankelijke gegevens op het project
                $participantMutation->participation->project->calculator()->run()->save();
            });
        }
    }
}
