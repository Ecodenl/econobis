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
        $this->makeWithDrawalMutations();
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
            $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $participant->project->project_type_id)->first();

            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $participant->id;
            $participantMutation->type_id = $mutationType->id;
            $participantMutation->status_id = 4; // 4 is final
            $participantMutation->quantity = $participant->participations_granted;
            $participantMutation->quantity_final = $participant->participations_granted;
            $participantMutation->date_entry = $participant->date_payed;
            $participantMutation->date_payment = $participant->date_payed;

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
